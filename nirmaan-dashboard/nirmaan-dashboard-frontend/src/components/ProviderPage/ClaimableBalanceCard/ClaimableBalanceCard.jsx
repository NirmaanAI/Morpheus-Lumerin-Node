import React from 'react';
import '../ProviderHostedModels/providerHostedModels.css';

function ClaimableBalanceCard({ balance, onClaim }) {
    return (
        <div className="claimable-card">
            <div className="claimable-card-title">Claimable Balance</div>
            <div className="claimable-card-body">
                <span className="claimable-amount">{balance} MOR</span>
                <button className="claim-button" onClick={onClaim}>Claim Now</button>
            </div>
        </div>
    );
}

export default ClaimableBalanceCard;
