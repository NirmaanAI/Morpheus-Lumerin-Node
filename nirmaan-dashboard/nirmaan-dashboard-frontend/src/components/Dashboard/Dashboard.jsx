import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './dashboard.css';
import MorCirculation from './MorCirculation/MorCirculation';
import MarketplaceData from './MarketplaceData/MarketplaceData';
import UpdatesCard from './UpdatesCard/UpdatesCard';
import TokenDistributionReport from './TokenDistributionReport/TokenDistributionReport';
import ComputeEmissions from './ComputeEmissions/ComputeEmissions';
import apiEndpoints from '../../api/info.json';
import { useQuery } from 'react-query';

async function fetchCardData() {
  const response = await fetch(apiEndpoints.publicCardsUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function Dashboard() {
  const { data, error, isLoading, isFetching } = useQuery('cardData', fetchCardData, {
    initialData: () => {
      const cachedData = localStorage.getItem('cardData');
      return cachedData ? JSON.parse(cachedData) : undefined;
    },
    onSuccess: (data) => {
      localStorage.setItem('cardData', JSON.stringify(data));
    },
    refetchInterval: 300000,
  });

  if (error) return <div>Error: {error.message}</div>;

  const cards = data || [];

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
        <div className="row">
            {isLoading ? (
              <div
              style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
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
              cards.length > 0 &&
              cards.map((card, index) => <Card key={card._id} card={card} showTimer={index === 2} />)
            )}
            <div className="col-12">
              <MorCirculation />
            </div>
            <div className="col-12">
              <MarketplaceData />
            </div>
          </div>
          </div>
        <div className="col-lg-4">
          <TokenDistributionReport />
          <UpdatesCard />
          <ComputeEmissions />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;