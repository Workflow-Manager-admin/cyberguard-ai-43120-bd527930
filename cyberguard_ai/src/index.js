import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

// Diagnostic: index.js before rendering ClerkProvider and App
// eslint-disable-next-line no-console
console.log('[index.js] About to render ClerkProvider and App');

// Strict: No custom editor overlays, no .ve/EditorRootWrapper, and no additional DOM roots or shadow roots are used.
// If overlays or EditorRootWrapper are ever injected, make sure to comment/remove such lines and only render <App /> inside <ClerkProvider> on #root.

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
      {/* Always ensure there are no overlays/wrappers here */}
      <ClerkProvider publishableKey={clerkKey}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
  // Diagnostic: index.js after root.render() call
  console.log('[index.js] Called root.render()');
}
