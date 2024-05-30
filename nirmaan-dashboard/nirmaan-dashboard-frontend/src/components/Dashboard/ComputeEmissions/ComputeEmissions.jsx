import React, { useState } from 'react';
import ComputeEmissionsChart from './ComputeEmissionsChart/ComputeEmissionsChart';
import './computeEmissions.css';

function ComputeEmissions() {

  return (
    <div className="card compute-emissions-card">
      <div className="card-body pb-0">
        <h5 className="card-title compute-emissions-title">
           <span className="filter-span"></span>
        </h5>
        <ComputeEmissionsChart className="compute-emissions-chart" />
      </div>
    </div>
  );
}

export default ComputeEmissions;
