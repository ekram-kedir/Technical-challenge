import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import { LogProvider } from './components/LogContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LogProvider>
      <App />
    </LogProvider>
  </React.StrictMode>
);
