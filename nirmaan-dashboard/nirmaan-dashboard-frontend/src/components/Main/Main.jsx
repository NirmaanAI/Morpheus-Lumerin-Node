import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./main.css";
import PageTitle from '../Header/PageTitle/PageTitle';
import Dashboard from '../Dashboard/Dashboard';
import ModelPage from '../ModelPage/ModelPage';
import ProviderPage from '../ProviderPage/ProviderPage';

function Main({ walletAddress, isWalletConnected }) {
    return (
        <main id="main" className='main'>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <>
                            <PageTitle page="Dashboard" />
                            <Dashboard />
                        </>
                    } />
                    <Route path="/model" element={
                        <>
                            <PageTitle page="Model" />
                            <ModelPage />
                        </>
                    } />
                    <Route path="/provider" element={
                        <>
                            <PageTitle page="Provider Dashboard" />
                            <ProviderPage walletAddress={walletAddress} isWalletConnected={isWalletConnected} />
                        </>
                    } />
                </Routes>
            </Router>
        </main>
    );
}

export default Main;
