import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProviderHostedModels from './ProviderHostedModels/ProviderHostedModels';
import MorPayoutCard from './MorPayoutCard/MorPayoutCard';
import ClaimableBalanceCard from './ClaimableBalanceCard/ClaimableBalanceCard';
import ProviderModelSessions from './ProviderModelSessions/ProviderModelSessions';
import ProviderModelEarnings from './ProviderModelEarnings/ProviderModelEarnings';
import PleaseRegisterCard from './PleaseRegisterCard/PleaseRegisterCard';
import apiEndpoints from '../../api/info.json';

function ProviderPage({ walletAddress, isWalletConnected }) {
    const [searchParams] = useSearchParams();
    const address = searchParams.get('address') || walletAddress;
    const [isProvider, setIsProvider] = useState(false);
    const [selectedModel, setSelectedModel] = useState('Llama 2.0');
    const [hostedModels, setHostedModels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isWalletConnected) {
            localStorage.setItem('isWalletConnected', 'true');
        } else {
            localStorage.setItem('isWalletConnected', 'false');
        }
    }, [isWalletConnected]);

    useEffect(() => {
        if (address) {
            const providerUrl = `${apiEndpoints.providerExistsUrl}?address=${address}`;
            const modelsUrl = `${apiEndpoints.hostedModels}?address=${address}`;
            Promise.all([
                fetch(providerUrl).then(response => response.json()).then(data => setIsProvider(data.providerExists)),
                fetch(modelsUrl).then(response => response.json())
            ]).then(([_, modelsData]) => {
                const formattedModels = Object.entries(modelsData).map(([name, count]) => ({
                    name: name,
                    balance: "10 MOR", // Example balance amount
                    providers: count
                }));
                setHostedModels(formattedModels);
            }).catch(e => {
                setError('An error occurred while fetching data.');
            });
        }
    }, [isWalletConnected, address]);

    const payoutAmount = "10.54821"; // Example payout amount

    if (!isWalletConnected && !address) {
        return (
            <section>
                <PleaseRegisterCard />
            </section>
        );
    }

    if (!isProvider) {
        return (
            <section className="full-page-card">
                <PleaseRegisterCard />
            </section>
        );
    }


    const claimableBalance = "27.239102"; // Example claimable balance

    const handleClaim = () => {
        // Claim logic will come here once testnet contracts are upgraded
    };

    const handleModelClick = (modelName) => {
        setSelectedModel(modelName);
    };

    return (
        <section className="provider section">
            <div className="row">
                <div className="col-lg-4">
                    <ProviderHostedModels models={hostedModels} onModelClick={handleModelClick} />
                    <MorPayoutCard amount={payoutAmount} />
                    <ClaimableBalanceCard balance={claimableBalance} onClaim={handleClaim} />
                </div>
                <div className="col-lg-8">
                    <ProviderModelSessions model={selectedModel} />
                    <ProviderModelEarnings model={selectedModel} />
                </div>
            </div>
        </section>
    );
}

export default ProviderPage;
