import React from 'react';
import '../ProviderHostedModels/providerHostedModels.css';

function MorPayoutCard({ amount }) {
    return (
        <div className="payout-card">
            <div className="payout-card-title">Upcoming MOR Payout</div>
            <div className="payout-card-body">
                <span className="payout-amount">{amount} MOR</span>
            </div>
        </div>
    );
}

export default MorPayoutCard;
