import React, { useState, useEffect } from 'react';
import MarketplaceDataTable from './MarketplaceDataTable';
import apiEndpoints from '../../../api/info.json';
import { useQuery } from 'react-query';

async function fetchMarketplaceData() {
  const response = await fetch(apiEndpoints.modelDataUrl, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function MarketplaceData() {
  const { data, error, isLoading, isFetching } = useQuery(
    'marketplaceData',
    fetchMarketplaceData,
    {
      initialData: () => {
        const cachedData = localStorage.getItem('marketplaceData');
        return cachedData ? JSON.parse(cachedData) : undefined;
      },
      onSuccess: (data) => {
        localStorage.setItem('marketplaceData', JSON.stringify(data));
      },
      refetchInterval: 300000,
    }
  );

  if (error) return <div style={{ color: 'white' }}>Error: {error.message}</div>;

  const items = data?.recentmodeldata || [];

  return (
    <div className="card recent-models-card">
      <div className="card-body">
        <h5 className="card-title">Marketplace Data</h5>
        {isFetching ? (
          <div
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px' }}>Fetching Latest Data...</span>
            <div
              className="spinner-border text-light"
              role="status"
              style={{ width: '1.5rem', height: '1.5rem' }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <MarketplaceDataTable items={items} />
        )}
      </div>
    </div>
  );
}

export default MarketplaceData;