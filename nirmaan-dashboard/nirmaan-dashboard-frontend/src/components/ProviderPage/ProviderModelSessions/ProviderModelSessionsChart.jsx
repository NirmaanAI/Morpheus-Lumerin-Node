import React from 'react';
import Chart from 'react-apexcharts';

function ProviderModelSessionsChart({ data }) {
  return (
    <Chart
      options={data.options}
      series={data.series}
      type={data.options.chart.type}
    />
  );
}

export default ProviderModelSessionsChart;
