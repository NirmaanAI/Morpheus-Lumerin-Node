import React, { useEffect } from 'react';
import * as echarts from 'echarts';

function ComputeEmissionsChart() {
  useEffect(() => {
    const chartDom = document.querySelector('#emissionsChart');
    const myChart = echarts.init(chartDom);

    const setChartOption = () => {
      myChart.setOption({
        title: {
          text: 'Compute Provider Emissions',
          left: 'center',
          top: '-1%',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Compute Provider Emissions'],
          top: '7.5%',
          left: 'center',
          textStyle: {
            color: '#90EE90'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '25%',
          containLabel: true
        },        
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '1000', '2000', '3000', '4000', '5000'],
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} MOR',
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [{
          name: 'Compute Provider Emissions',
          type: 'line',
          data: [0, 2500000, 5000000, 7500000, 10000000, 12500000],
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          smooth: true
        }]
      });
    };
    

    setChartOption();
    window.addEventListener('resize', () => {
      myChart.resize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        myChart.resize();
      });
    };
  }, []);

  return <div id="emissionsChart" style={{ width: '100%', height: '400px' }}></div>;
}

export default ComputeEmissionsChart;
