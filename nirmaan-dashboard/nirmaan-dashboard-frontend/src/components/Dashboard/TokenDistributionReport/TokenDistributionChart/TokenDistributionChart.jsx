import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './tokenDistributionChart.css'; 

function TokenDistributionChart() {
  useEffect(() => {
    const chart = echarts.init(document.querySelector('#tokenChart'));
    chart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#FFFFFF'
        }
      },
      series: [
        {
          name: 'Token Distribution',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 24, name: 'Capital' },
            { value: 24, name: 'Code' },
            { value: 24, name: 'Compute' },
            { value: 24, name: 'Community' },
            { value: 4, name: 'Protection Fund' }
          ]
        }
      ]
    });
  }, []);

  return (
    <div
      id="tokenChart"
      style={{ minHeight: '400px' }}
      className="echart token-chart"
    ></div>
  );
}

export default TokenDistributionChart;
