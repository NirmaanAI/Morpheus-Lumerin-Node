import React from 'react';
import { Link } from 'react-router-dom';

function MarketplaceDataTable({ items }) {
  return (
    <table className="table table-dark table-borderless datatable">
      <thead>
        <tr>
          <th scope="col">Model</th>
          <th scope="col"># of Providers</th>
          <th scope="col">Best Ask</th>
          <th scope="col"># of Active Sessions</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map(item => (
            <tr key={item._id}>
              <td>{item.model}</td>
              <td>{item.numberOfProviders}</td>
              <td>{item.bestAsk}</td>
              <td>{item.activeSessions}</td>
              <td>
              <Link to={`/model?modelName=${encodeURIComponent(item.model)}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                  <i className="bi bi-arrow-right-circle"></i>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default MarketplaceDataTable;
