import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'
import lol_APIs from './service/lol_APIs';

const APIs = new lol_APIs(process.env.REACT_APP_API_KEY);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
   <App APIs={APIs} />
);
