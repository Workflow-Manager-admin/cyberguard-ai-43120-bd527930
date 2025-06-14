import React from 'react';
import './App.css';

// Add Clerk hooks/components
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
  ClerkProvider
} from '@clerk/clerk-react';

// Navbar with Clerk authentication
// PUBLIC_INTERFACE
function Navbar() {
  // Retrieve Clerk's user/auth state (live)
  const { isSignedIn, user } = useUser();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo">
          <span className="logo-symbol" style={{ color: '#00ffff', textShadow: '0 0 8px #00ffff' }}>*</span> KAVIA AI
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Add your nav links here as needed */}
          {/* Clerk auth controls */}
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn" style={{ marginRight: 8 }}>Sign in</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-outline">Sign up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Wrap app in ClerkProvider if not done at index.js (will be ignored if already provided)
  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>

            <h1 className="title">cyberguardianfrontend</h1>

            <div className="description">
              Start building your application.
            </div>

            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;