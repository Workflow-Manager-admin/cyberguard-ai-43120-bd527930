import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

// Diagnostic: index.js before rendering ClerkProvider and App
// eslint-disable-next-line no-console
console.log('[index.js] About to render ClerkProvider and App');

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_aWRlYWwtZHVjay0xMS5jbGVyay5hY2NvdW50cy5kZXYk';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Diagnostic: Before ClerkProvider */}
    {console.log('[index.js] Rendering ClerkProvider')}
    <ClerkProvider publishableKey={clerkKey}>
      {/* Diagnostic: Before App */}
      {console.log('[index.js] Rendering <App /> inside <ClerkProvider>')}
      <App />
      {/* Diagnostic: After App (this merely queues in JSX, will run before render) */}
      {console.log('[index.js] After <App /> (JSX return)')}
    </ClerkProvider>
    {/* Diagnostic: After ClerkProvider */}
    {console.log('[index.js] After <ClerkProvider> (JSX return)')}
  </React.StrictMode>
);
// Diagnostic: index.js after root.render() call
console.log('[index.js] Called root.render()');
