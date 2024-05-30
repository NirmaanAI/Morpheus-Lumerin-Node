import React from 'react';
import './providerHostedModels.css';

function ProviderHostedModels({ models, onModelClick }) {
    return (
        <div className="provider-card hosted-models-card">
            <div className="provider-card-title">Hosted Models</div>
            {models.map((model, index) => (
                <div key={model.name} className="model-row" onClick={() => onModelClick(model.name)}>
                    <div className="model-details">
                        <span className="model-name">{model.name}</span>
                        <span className="model-balance">{model.balance}</span>
                    </div>
                    <span className="model-count">{model.providers}</span>
                </div>
            ))}
        </div>
    );
}

export default ProviderHostedModels;