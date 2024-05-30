import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function MorCirculationCharts() {
  const [data, setData] = useState({
    series: [
      {
        name: 'MOR in Circulation',
        data: [31, 40, 28, 51, 42, 82, 56],
      },
      {
        name: 'IPS Throughput',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: 'Customers',
        data: [15, 11, 32, 18, 9, 24, 11],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T03:00:00.000Z', 
          '2018-09-19T04:30:00.000Z', '2018-09-19T06:00:00.000Z', '2018-09-19T07:30:00.000Z', 
          '2018-09-19T09:00:00.000Z'
        ],
        labels: {
          style: {
            colors: '#888'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#888'
          }
        }
      },
      grid: {
        borderColor: '#888'
      },
      legend: {
        labels: {
          colors: '#888', 
          useSeriesColors: false 
        },
        markers: {
          fillColors: ['#4154f1', '#2eca6a', '#ff771d'], 
          strokeColor: '#888' 
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  });

  return (
    <Chart
      options={data.options}
      series={data.series}
      type={data.options.chart.type}
      height={data.options.chart.height}
    />
  );
}

export default MorCirculationCharts;
