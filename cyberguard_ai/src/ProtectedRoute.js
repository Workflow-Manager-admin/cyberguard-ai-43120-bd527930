import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

/**
 * ProtectedRoute - Restricts access to authenticated users using Clerk.
 * Shows fallback UI or redirects to home if not authenticated.
 * 
 * Usage:
 * <ProtectedRoute><DashboardComponent /></ProtectedRoute>
 */
// PUBLIC_INTERFACE
function ProtectedRoute({ children, fallback = null }) {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Auth state still loading - optionally return a loading spinner
    return (
      <div style={{color:'#00ffff', minHeight: '40vh', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:600, fontSize:'1.3rem'}}>
        Loading authentication...
      </div>
    );
  }
  if (!isSignedIn) {
    // Not signed in - redirect to landing (or show fallback)
    if (fallback) return fallback;
    // Save attempted location for potential future redirect after login
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
