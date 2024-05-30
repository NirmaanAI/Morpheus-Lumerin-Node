import React from 'react';

function ModelTable({ tableData }) {
  return (
    <div className="card recent-models-card">
      <div className="card-body">
        <h5 className="card-title">
          Providers
        </h5>
        <table className="table table-dark table-borderless datatable">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Total Sessions Completed</th>
              <th scope="col">Model Sessions Completed</th>
              <th scope="col">Avg Response Time</th>
              <th scope="col">IPS Ask</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 && tableData.map(item => (
              <tr key={item._id}>
                <td>{item.address}</td>
                <td>{item.totalSessionsCompleted}</td>
                <td>{item.modelSessionsCompleted}</td>
                <td>{item.avgResponseTime}</td>
                <td>{item.ipsAsk}</td>
                <td>
                  <a href={item.view} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
                     <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModelTable;
