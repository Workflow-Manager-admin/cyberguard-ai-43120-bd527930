import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');

if (!rootEl) {
  // eslint-disable-next-line no-console
  console.error('No #root element found in index.html');
} else {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
