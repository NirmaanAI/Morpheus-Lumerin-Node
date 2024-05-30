import React, { useState, useEffect } from 'react';
import UpdatesCardItem from './UpdateCardsItem/UpdatesCardItem';
import './updatesCard.css'; 
import apiEndpoints from '../../../api/info.json';

function UpdatesCard() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch(apiEndpoints.recentActivityUrl)
          .then(res => res.json())
          .then(data => {
             setItems(data);
          })
          .catch(e => {
            setError('An error occurred while fetching data.');
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className="card recent-activity-card">

        <div className="card-body">
          <h5 className="card-title">
            Updates <span></span>
          </h5>

          <div className="activity">
            {items && items.length > 0 && items.map(item => (
              <UpdatesCardItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default UpdatesCard;
