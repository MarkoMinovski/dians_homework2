import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the default App component
import './index.css'; // Optional: Add your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
