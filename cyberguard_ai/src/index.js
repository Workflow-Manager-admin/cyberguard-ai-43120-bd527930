import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

// Diagnostic: index.js before rendering ClerkProvider and App
// eslint-disable-next-line no-console
console.log('[index.js] About to render ClerkProvider and App');

// If .ve EditorRootWrapper or overlays had been injected, remove those here
// Remove (or comment out) any custom editor overlays, .ve/EditorRootWrapper, or iframe injects:
// (None present in this file after review. If overlays were present like below, comment them out.)
// Example that might occur in other projects:
// import EditorRootWrapper from '.ve/EditorRootWrapper';
// ReactDOM.createRoot(document.getElementById('root')).render(<EditorRootWrapper><App /></EditorRootWrapper>);

// This project calls root.render only once on #root.

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_aWRlYWwtZHVjay0xMS5jbGVyay5hY2NvdW50cy5kZXYk';

// Defensive: Ensure #root exists in index.html for correct mount
if (!document.getElementById('root')) {
  // eslint-disable-next-line no-console
  console.error("FATAL: No #root element found in index.html - React will not mount!");
} else {
  // Standard mount (no overlays, no injected EditorRootWrapper)
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
}
