// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tickers, setTickers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState(null);

    // Base URL for the Flask backend
    const API_BASE_URL = 'http://127.0.0.1:5000/';

    // Fetch all tickers
    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}all`);
                setTickers(response.data);
            } catch (err) {
                setError('Failed to fetch tickers.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickers();
    }, []);

    // Fetch details for a single ticker
    const fetchTickerDetails = async (ticker) => {
        setDetails(null); // Reset previous details
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}tickers/${ticker}`);
            setDetails(response.data);
        } catch (err) {
            setError('Failed to fetch ticker details.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Ticker Data</h1>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Last Date Info</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tickers.map((ticker) => (
                    <tr key={ticker.ticker}>
                        <td>{ticker.ticker}</td>
                        <td>{ticker.last_date_info}</td>
                        <td>
                            <button onClick={() => fetchTickerDetails(ticker.ticker)}>View Details</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {details && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Details for {details[0]?.ticker || 'Selected Ticker'}</h2>
                    <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Date String</th>
                            <th>Last Trade Price</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Average</th>
                            <th>Percentage Change</th>
                            <th>Volume</th>
                            <th>Turnover</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.date_str}</td>
                                <td>{row.last_trade_price}</td>
                                <td>{row.max}</td>
                                <td>{row.min}</td>
                                <td>{row.avg}</td>
                                <td>{row.percentage_change_decimal}</td>
                                <td>{row.vol}</td>
                                <td>{row.BEST_turnover}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;
