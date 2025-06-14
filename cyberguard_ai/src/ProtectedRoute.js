import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

/**
 * ProtectedRoute - Restricts access to authenticated users using Clerk.
 * Shows fallback UI or redirects to landing if not authenticated.
 *
 * Usage:
 * <ProtectedRoute><DashboardComponent /></ProtectedRoute>
 */
// PUBLIC_INTERFACE
function ProtectedRoute({ children, fallback = null }) {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  // Diagnostic log for mount and prop inspection
  // eslint-disable-next-line no-console
  console.log('[ProtectedRoute] Mounted. isLoaded:', isLoaded, 'isSignedIn:', isSignedIn, 'children:', typeof children);

  if (!isLoaded) {
    // Auth state still loading
    return (
      <div style={{
        color: '#00ffff',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '1.3rem'
      }}>
        Loading authentication...
      </div>
    );
  }

  if (!isSignedIn) {
    // Diagnostic log when redirecting, to track on console
    // eslint-disable-next-line no-console
    console.warn('[ProtectedRoute] Not signed in, redirecting to landing.', { location, fallback });
    if (fallback) return fallback;
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Authenticated: guard against accidental missing child component
  if (!children) {
    // eslint-disable-next-line no-console
    console.error('[ProtectedRoute] No children passed or component undefined!');
    return <div style={{ color: "#ff0053", fontWeight: 600 }}>ProtectedRoute Error: No content to display (component undefined).</div>;
  }

  return children;
}

export default ProtectedRoute;
