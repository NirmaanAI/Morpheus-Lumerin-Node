import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './nav.css';

function NavWalletConnect({ onWalletConnection }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedWalletConnected = localStorage.getItem('isWalletConnected') === 'true';
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletConnected && storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setIsWalletConnected(true);
      onWalletConnection(storedWalletAddress, true);
    }
  }, [onWalletConnection]);

  const switchToArbitrumNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x66eee' }]
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x66eee',
                chainName: 'Arbitrum Sepolia',
                rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
                nativeCurrency: {
                  name: 'Sepolia Ether',
                  symbol: 'ETH',
                  decimals: 18
                },
                blockExplorerUrls: ['https://sepolia.arbiscan.io']
              }
            ]
          });
        } catch (addError) {
          setError('Failed to add the Arbitrum Sepolia network.');
        }
      } else {
        setError('Failed to switch to the Arbitrum Sepolia network.');
      }
    }
  };

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          localStorage.setItem('isWalletConnected', 'true');
          localStorage.setItem('walletAddress', accounts[0]);
          onWalletConnection(accounts[0], true);

          await switchToArbitrumNetwork();
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('Please install MetaMask!');
    }
  };

  const disconnectWalletHandler = () => {
    setWalletAddress('');
    setIsWalletConnected(false);
    localStorage.removeItem('isWalletConnected');
    localStorage.removeItem('walletAddress');
    onWalletConnection('', false);
  };

  return (
    <div className="wallet-container">
      {isWalletConnected ? (
        <>
          <button className="wallet-button" onClick={() => setShowDropdown(!showDropdown)}>
            {walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 4)}
            <i className="bi bi-chevron-down dropdown-icon"></i>
          </button>
          {showDropdown && (
            <div className="wallet-dropdown input">
              <a className="value dashboard-link" href="/">
                <i className="bi bi-speedometer2 icon-margin"></i>
                Dashboard
              </a>
              <button className="value">
                <span className="network-indicator"></span>
                Arbitrum
              </button>
              <button className="value" onClick={disconnectWalletHandler}>
                <i className="bi bi-x-circle icon-margin"></i>
                Disconnect
              </button>
            </div>
          )}
        </>
      ) : (
        <Button className="connect-wallet-button" type="primary" onClick={connectWalletHandler}>
          Connect Wallet
        </Button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default NavWalletConnect;
