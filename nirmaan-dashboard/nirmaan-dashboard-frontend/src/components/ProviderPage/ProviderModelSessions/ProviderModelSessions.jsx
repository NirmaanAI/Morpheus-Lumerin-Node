import React, { useState, useEffect } from 'react';
import ProviderModelSessionsChart from './ProviderModelSessionsChart';
import '../ProviderHostedModels/providerHostedModels.css'
import apiEndpoints from '../../../api/info.json';

function ProviderModelSessions({ model }) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const fetchChartData = () => {
    const url = `${apiEndpoints.providerModelChartUrl}?modelName=${encodeURIComponent(model)}`
    fetch(url)
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(e => {
        setError('An error occurred while fetching data.');
    });
  };

  useEffect(() => {
    fetchChartData();
  }, [model]);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="provider-card charts-card">
      <div className="card-body">
        <h5 className="card-title">
          {model} <span></span>
        </h5>
        <ProviderModelSessionsChart data={chartData} />
      </div>
    </div>
  );
}

export default ProviderModelSessions;
