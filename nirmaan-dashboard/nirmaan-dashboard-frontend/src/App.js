import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const storedWalletConnected = localStorage.getItem('isWalletConnected') === 'true';
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletConnected && storedWalletAddress) {
      setIsWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const handleWalletConnection = (address, isConnected) => {
    setWalletAddress(address);
    setIsWalletConnected(isConnected);
    if (isConnected) {
      localStorage.setItem('isWalletConnected', 'true');
      localStorage.setItem('walletAddress', address);
    } else {
      localStorage.removeItem('isWalletConnected');
      localStorage.removeItem('walletAddress');
    }
  };

  return (
    <>
      <Header onWalletConnection={handleWalletConnection} />
      <SideBar />
      <Main walletAddress={walletAddress} isWalletConnected={isWalletConnected} />
    </>
  );
}

export default App;
