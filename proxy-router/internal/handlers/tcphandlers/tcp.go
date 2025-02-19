package tcphandlers

import (
	"bufio"
	"context"
	"encoding/json"
	"net"

	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/interfaces"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/morrpc"
	"github.com/MorpheusAIs/Morpheus-Lumerin-Node/proxy-router/internal/internal/repositories/transport"
)

func NewTCPHandler(
	log, connLog interfaces.ILogger,
	schedulerLogFactory func(contractID string) (interfaces.ILogger, error),
	morRpcHandler *MorRpcHandler,
) transport.Handler {
	return func(ctx context.Context, conn net.Conn) {
		addr := conn.RemoteAddr().String()
		sourceLog := connLog.Named("SRC").With("SrcAddr", addr)

		defer func() {
			sourceLog.Info("Closing connection")
			conn.Close()
		}()

		msg, err := getMessage(conn)
		if err != nil {
			sourceLog.Error("Error reading message", err)
			return
		}

		resp, err := morRpcHandler.Handle(*msg, sourceLog)
		if err != nil {
			sourceLog.Error("Error handling message", err)
			return
		}
		if resp != nil {
			_, err := sendMsg(conn, resp)
			if err != nil {
				sourceLog.Error("Error sending response", err)
				return
			}
		}
	}
}

func sendMsg(conn net.Conn, msg *morrpc.RpcResponse) (int, error) {
	msgJson, err := json.Marshal(msg)
	if err != nil {
		return 0, err
	}
	return conn.Write([]byte(msgJson))
}

func getMessage(conn net.Conn) (*morrpc.RpcMessage, error) {
	reader := bufio.NewReader(conn)
	d := json.NewDecoder(reader)

	var msg *morrpc.RpcMessage
	err := d.Decode(&msg)
	if err != nil {
		return nil, err
	}
	return msg, nil
}
