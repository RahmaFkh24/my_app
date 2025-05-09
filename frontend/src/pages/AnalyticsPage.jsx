import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWithHandling = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'API request failed');
            }
            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [overview, engagement] = await Promise.all([
                    fetchWithHandling('http://localhost:5000/api/analytics/overview'),
                    fetchWithHandling('http://localhost:5000/api/analytics/engagement')
                ]);

                setData({ overview, engagement });
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        loadData();
    }, []);

    if (error) return <div className="error">Error: {error}</div>;
    if (!data) return <div className="loading">Loading...</div>;

    return (
        <div className="analytics-container">
            <h1>Analytics Dashboard</h1>

            <div className="metrics">
                <div className="metric-card">
                    <h3>Followers</h3>
                    <p>{data.overview.totalFollowers}</p>
                </div>
                <div className="metric-card">
                    <h3>Engagement Rate</h3>
                    <p>{data.overview.engagementRate}%</p>
                </div>
            </div>

            <div className="chart">
                <h2>Engagement Metrics</h2>
                <BarChart width={600} height={300} data={[data.engagement]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="likes" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </div>
        </div>
    );
};

export default AnalyticsPage;