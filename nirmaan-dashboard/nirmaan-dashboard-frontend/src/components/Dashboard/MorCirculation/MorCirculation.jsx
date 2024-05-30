import React, { useState } from 'react';
import MorCirculationCharts from './MorCirculationCharts/MorCirculationCharts';

function MorCirculation() {
  return (
    <div className="card graphs-card">
      <div className="card-body">
        <h5 className="card-title">
          Morpheus Circulation Chart <span></span>
        </h5>
        <MorCirculationCharts />
      </div>
    </div>
  );
}

export default MorCirculation;