
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import types to ensure global JSX augmentations are loaded
import './types';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
