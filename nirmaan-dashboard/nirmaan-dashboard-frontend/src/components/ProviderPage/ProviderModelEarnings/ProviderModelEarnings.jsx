import React, {useState, useEffect} from 'react';
import ProviderModelEarningsTable from './ProviderModelEarningsTable'
import apiEndpoints from '../../../api/info.json';

function ProviderModelEarnings({ model }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchData = () => {
    const url = `${apiEndpoints.providerTableDataUrl}?modelName=${encodeURIComponent(model)}`
    fetch(url)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => {
        setError('An error occurred while fetching data.');
    });
  };
    
  useEffect(() => {
    fetchData();
  }, [model]);
    

  return (
    <div className="provider-card tables-card">
      <div className="card-body">
        <h5 className="card-title">
          {model} Earnings <span></span>
        </h5>
        <ProviderModelEarningsTable items={items} />
      </div>
    </div>
  );
}

export default ProviderModelEarnings;
