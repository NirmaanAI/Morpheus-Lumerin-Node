import React from 'react';

function ProviderModelEarningsTable({ items }) {
  return (
    <table className="table table-dark table-borderless datatable">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Total Sessions</th>
          <th scope="col">Avg. Response Time</th>
          <th scope="col"># of Active Sessions</th>
          <th scope="col">MOR Earned</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 && items.map(item => (
          <tr key={item._id}>
            <td>{item.date}</td>
            <td>{item.totalSessions}</td>
            <td>{item.avgResponseTime}</td>
            <td>{item.numberOfActiveSessions}</td>
            <td>{item.morEarned}</td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProviderModelEarningsTable;
