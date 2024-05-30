import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import ModelCharts from './ModelCharts/ModelCharts';
import ModelTable from './ModelTable/ModelTable';
import apiEndpoints from '../../api/info.json';

function ModelPage() {
    const [searchParams] = useSearchParams();
    const modelName = decodeURIComponent(searchParams.get('modelName') || 'Llama 2.0');
    const [modelData, setModelData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const url = `${apiEndpoints.modelQueryUrl}?modelName=${encodeURIComponent(modelName)}`
        fetch(url)
            .then(response => response.json())
            .then(data => setModelData(data))
            .catch(e => {
                setError('An error occurred while fetching data.');
            });
    };

    useEffect(() => {
        fetchData();
    }, [modelName]);

    if (!modelData) {
        return <p>Loading...</p>;
    }

    return (
        <section className="dashboard section">
            <div className="row">
                <div className="col-12">
                    <ModelCharts graphData={modelData.graphData} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ModelTable tableData={modelData.tableData} />
                </div>
            </div>
        </section>
    );
}

export default ModelPage;
