import React, { useState, useEffect } from 'react';
import TokenDistributionChart from './TokenDistributionChart/TokenDistributionChart';
import './tokenDistributionReport.css';

function TokenDistributionReport() {

  return (
    <div className="card token-report-card">
      <div className="card-body pb-0">
        <h5 className="card-title token-report-title">
          Morpheus Token Distribution <span className="filter-span"></span>
        </h5>
        <TokenDistributionChart />
      </div>
    </div>
  );
}

export default TokenDistributionReport;