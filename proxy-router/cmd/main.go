package main

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/aiengine"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/apibus"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/config"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/handlers/httphandlers"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/handlers/tcphandlers"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/interfaces"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/lib"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/morrpc"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/proxyapi"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/repositories/transport"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/rpcproxy"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/system"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"golang.org/x/sync/errgroup"
)

const (
	IDLE_READ_CLOSE_TIMEOUT  = 10 * time.Minute
	IDLE_WRITE_CLOSE_TIMEOUT = 10 * time.Minute
)

var (
	ErrConnectToEthNode = fmt.Errorf("cannot connect to ethereum node")
)

func main() {
	err := start()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	os.Exit(0)
}

func start() error {
	var cfg config.Config
	err := config.LoadConfig(&cfg, &os.Args)
	if err != nil {
		return err
	}

	fmt.Printf("Loaded config: %+v\n", cfg.GetSanitized())

	mainLogFilePath := ""
	logFolderPath := ""

	if cfg.Log.FolderPath != "" {
		folderName := lib.SanitizeFilename(time.Now().Format("2006-01-02T15-04-05Z07:00"))
		logFolderPath = filepath.Join(cfg.Log.FolderPath, folderName)
		err = os.MkdirAll(logFolderPath, os.ModePerm)
		if err != nil {
			return err
		}

		mainLogFilePath = filepath.Join(logFolderPath, "main.log")
	}

	log, err := lib.NewLogger(cfg.Log.LevelApp, cfg.Log.Color, cfg.Log.IsProd, cfg.Log.JSON, mainLogFilePath)
	if err != nil {
		return err
	}

	appLog := log.Named("APP")

	proxyLog, err := lib.NewLogger(cfg.Log.LevelProxy, cfg.Log.Color, cfg.Log.IsProd, cfg.Log.JSON, mainLogFilePath)
	if err != nil {
		return err
	}

	connLog, err := lib.NewLogger(cfg.Log.LevelConnection, cfg.Log.Color, cfg.Log.IsProd, cfg.Log.JSON, mainLogFilePath)
	if err != nil {
		return err
	}

	schedulerLogFactory := func(remoteAddr string) (interfaces.ILogger, error) {
		fp := ""
		if logFolderPath != "" {
			fp = filepath.Join(logFolderPath, fmt.Sprintf("scheduler-%s.log", lib.SanitizeFilename(remoteAddr)))
		}
		return lib.NewLogger(cfg.Log.LevelScheduler, cfg.Log.Color, cfg.Log.IsProd, cfg.Log.JSON, fp)
	}

	contractLogStorage := lib.NewCollection[*interfaces.LogStorage]()

	// contractLogFactory := func(contractID string) (interfaces.ILogger, error) {
	// 	logStorage := interfaces.NewLogStorage(contractID)
	// 	contractLogStorage.Store(logStorage)
	// 	fp := ""
	// 	if logFolderPath != "" {
	// 		fp = filepath.Join(logFolderPath, fmt.Sprintf("contract-%s.log", lib.SanitizeFilename(lib.StrShort(contractID))))
	// 	}
	// 	return lib.NewLoggerMemory(cfg.Log.LevelContract, cfg.Log.Color, cfg.Log.IsProd, cfg.Log.JSON, fp, logStorage.Buffer)
	// }

	defer func() {
		_ = connLog.Close()
		_ = proxyLog.Close()
		_ = log.Close()
	}()

	appLog.Infof("proxy-router %s", config.BuildVersion)

	sysConfig := system.CreateConfigurator(log)

	if cfg.System.Enable {
		if err != nil {
			return err
		}

		err = sysConfig.ApplyConfig(&system.Config{
			LocalPortRange:   cfg.System.LocalPortRange,
			TcpMaxSynBacklog: cfg.System.TcpMaxSynBacklog,
			Somaxconn:        cfg.System.Somaxconn,
			NetdevMaxBacklog: cfg.System.NetdevMaxBacklog,
			RlimitSoft:       cfg.System.RlimitSoft,
			RlimitHard:       cfg.System.RlimitHard,
		})
		if err != nil {
			appLog.Warnf("failed to apply system config, try using sudo or set SYS_ENABLE to false to disable\n%s", err)
			return err
		}

		defer func() {
			err = sysConfig.RestoreConfig()
			if err != nil {
				appLog.Warnf("failed to restore system config\n%s", err)
				return
			}
		}()
	}

	// graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		s := <-shutdownChan
		appLog.Warnf("Received signal: %s", s)
		cancel()

		s = <-shutdownChan

		appLog.Warnf("Received signal: %s. \n", s)

		appLog.Warnf("Forcing exit...")
		os.Exit(1)
	}()

	ethClient, err := ethclient.DialContext(ctx, cfg.Blockchain.EthNodeAddress)
	if err != nil {
		return lib.WrapError(ErrConnectToEthNode, err)
	}
	block, err := ethClient.BlockNumber(ctx)
	if err != nil {
		return lib.WrapError(ErrConnectToEthNode, err)
	}
	appLog.Infof("connected to ethereum node: %s, block: %d", cfg.Blockchain.EthNodeAddress, block)

	publicUrl, err := url.Parse(cfg.Web.PublicUrl)
	if err != nil {
		return err
	}

	walletAddr, err := lib.PrivKeyStringToAddr(cfg.Marketplace.WalletPrivateKey)
	if err != nil {
		return err
	}

	appLog.Infof("wallet address: %s", walletAddr.String())

	derived := new(config.DerivedConfig)
	derived.WalletAddress = walletAddr.String()

	publicKey, err := lib.PubKeyStringFromPrivate(cfg.Marketplace.WalletPrivateKey)
	if err != nil {
		appLog.Errorf("failed to get public key: %s", err)
		return err
	}

	tcpServer := transport.NewTCPServer(cfg.Proxy.Address, connLog.Named("TCP"))
	morTcpHandler := tcphandlers.NewMorRpcHandler(cfg.Marketplace.WalletPrivateKey, publicKey, derived.WalletAddress, morrpc.NewMorRpc())
	tcpHandler := tcphandlers.NewTCPHandler(
		log, connLog, schedulerLogFactory, morTcpHandler,
	)
	tcpServer.SetConnectionHandler(tcpHandler)

	providerRegistryAddr := common.HexToAddress(cfg.Marketplace.ProviderRegistryAddress)
	modelRegistryAddr := common.HexToAddress(cfg.Marketplace.ModelRegistryAddress)
	marketplaceAddr := common.HexToAddress(cfg.Marketplace.MarketplaceAddress)

	proxyRouterApi := proxyapi.NewProxyRouterApi(sysConfig, publicUrl, publicKey, cfg.Marketplace.WalletPrivateKey, &cfg, derived, time.Now(), contractLogStorage, log)
	rpcProxy := rpcproxy.NewRpcProxy(ethClient, providerRegistryAddr, modelRegistryAddr, marketplaceAddr, proxyLog)
	aiEngine := aiengine.NewAiEngine()
	apiBus := apibus.NewApiBus(rpcProxy, aiEngine, proxyRouterApi)

	handl := httphandlers.NewHTTPHandler(apiBus)
	httpServer := transport.NewServer(cfg.Web.Address, handl, log.Named("HTTP"))

	ctx, cancel = context.WithCancel(ctx)
	g, errCtx := errgroup.WithContext(ctx)
	g.Go(func() error {
		return tcpServer.Run(errCtx)
	})

	g.Go(func() error {
		for {
			select {
			case <-errCtx.Done():
				return nil
			case <-time.After(5 * time.Minute):
				fd, err := sysConfig.GetFileDescriptors(errCtx, os.Getpid())
				if err != nil {
					appLog.Errorf("failed to get open files: %s", err)
				} else {
					appLog.Infof("open files: %d", len(fd))
				}
			}
		}
	})

	// http server should shut down latest to keep pprof running

	serverErrCh := make(chan error, 1)
	serverCtx, cancelServer := context.WithCancel(context.Background())
	go func() {
		serverErrCh <- httpServer.Run(serverCtx)
		cancel()
	}()

	err = g.Wait()

	cancelServer()
	<-serverErrCh

	appLog.Warnf("App exited due to %s", err)
	return err
}
