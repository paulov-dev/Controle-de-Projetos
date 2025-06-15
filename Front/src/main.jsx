import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <--- Importando o seu App.jsx
import './index.css'; // <--- Importando o CSS global

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);