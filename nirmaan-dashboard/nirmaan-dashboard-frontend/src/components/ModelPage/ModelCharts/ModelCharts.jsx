import React from 'react';
import Chart from 'react-apexcharts';
import "./modelCharts.css"

function ModelCharts({ graphData }) {
    const categories = graphData.dataPoints && graphData.dataPoints.length > 0
        ? graphData.dataPoints.map(point => point.date)
        : [];
    const avgDailySessionsData = graphData.dataPoints && graphData.dataPoints.length > 0
        ? graphData.dataPoints.map(point => point.valueAvgDaily)
        : [];
    const activeSessionsData = graphData.dataPoints && graphData.dataPoints.length > 0
        ? graphData.dataPoints.map(point => point.valueActive)
        : [];

    const chartOptions = {
        chart: {
            id: 'basic-line',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    customIcons: [{
                        icon: `<div class="custom-toolbar-button" style="cursor: pointer; display: inline-flex; align-items: center; margin-left: 10px; margin-right: 10px;">
                        IPFS`,
                        title: 'IPFS Link',
                        index: 0, 
                        className: 'custom-icon-ipfs',
                        click: function(chart, options, e) {
                            window.open(graphData.href, '_blank');
                        }
                    }]
                }
            }
        },
        xaxis: {
            categories: categories
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5
        },
        tooltip: {
            enabled: true
        },
        title: {
            text: graphData.name || 'Llama 2',
            align: 'left',
            style: {
                fontSize: '16px',
                color: '#666'
            }
        }
    };

    const chartSeries = [{
        name: 'Avg Daily Sessions',
        data: avgDailySessionsData
    }, {
        name: 'Active Sessions',
        data: activeSessionsData
    }];

    return (
        <div className="card graphs-card">
            <div className="card-body">
                <h5 className="card-title">
                    {graphData.name || 'Llama 2'} <span></span>
                </h5>
                {categories.length > 0 && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        width="100%"
                        height="350"
                    />
                )}
            </div>
        </div>
    );
}

export default ModelCharts;
