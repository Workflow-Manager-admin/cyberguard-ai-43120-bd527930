import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import RiskAssessmentPage from './RiskAssessmentPage';
const ReportsAnalyticsPage = React.lazy(() => import('./ReportsAnalyticsPage'));
const PhishingTestPage = React.lazy(() => import('./PhishingTestPage'));


// PUBLIC_INTERFACE
function Navbar() {
  /** Main navigation bar for CyberGuard AI with Clerk authentication flow */

  // Clerk's useUser provides user data if authenticated
  const { isSignedIn, user } = useUser();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo">
          <span className="logo-symbol" style={{ color: '#00ffff', textShadow: '0 0 8px #00ffff' }}>⫷</span>
          <span style={{ letterSpacing: 1.5 }}>CyberGuard<span style={{ color: '#00ff00', marginLeft: 2 }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <NavLink to="/assessment">Assessment</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/phishing">Phishing</NavLink>
          <NavLink to="/chatbot">Chatbot</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <div style={{ marginLeft: 18 }}>
            {/* Show auth controls based on Clerk state */}
            <SignedOut>
              {/* Show both sign in and sign up buttons */}
              <SignInButton mode="modal">
                <button className="btn" style={{ marginRight: 8 }}>Sign in</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-outline">Sign up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {/* Show user avatar/profile and dropdown actions */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function NavLink({ to, children }) {
  /** Hacker-themed glowing nav link */
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: '#00ffff',
        fontWeight: 600,
        textShadow: '0 0 6px #00ffff, 0 0 2px #333',
        transition: 'color 0.2s',
        padding: '4px 10px',
      }}
      className="navlink"
    >
      {children}
    </Link>
  );
}



// PUBLIC_INTERFACE
function Hero() {
  /** Production-ready hero landing for CyberGuard AI: hacker/modern neon theme, integrated Clerk, animated-glow, intro content */
  const { isSignedIn } = useUser();

  return (
    <div className="hero" style={{
      paddingTop: '120px',
      paddingBottom: '60px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      position: 'relative',
    }}>
      {/* Glowing animated background effect */}
      <div style={{
        position: 'absolute',
        top: -80,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 720,
        height: 340,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.18,
        filter: 'blur(32px)'
      }}>
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="glow1" cx="62%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00ffcc" stopOpacity="1" />
              <stop offset="35%" stopColor="#00ffcc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000022" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="59%" cy="50%" rx="330" ry="130" fill="url(#glow1)" />
        </svg>
      </div>

      <div className="subtitle"
        style={{
          color: '#00ffff',
          fontWeight: 'bold',
          letterSpacing: '1.3px',
          textShadow: '0 0 16px #00ffff, 0 0 22px #00ffcc88, 0 0 2px #003399'
        }}
      >
        Next-gen AI Cybersecurity for Everyone
      </div>
      <h1 className="title"
        style={{
          fontSize: '3.6rem',
          color: '#fff',
          fontWeight: 800,
          lineHeight: 1.07,
          marginBottom: 0,
          textShadow: `0 0 26px #00ffb3, 0 0 13px #00ffb355, 0 0 2px #00ffb3`,
        }}>
        <span style={{ color: '#00ffff', textShadow: '0 0 30px #00ffff' }}>CyberGuard</span>
        <span style={{ color: '#00ff00', textShadow: '0 0 26px #00ff00', marginLeft: 4 }}>AI</span>
      </h1>
      <div className="description"
        style={{
          fontSize: '1.19rem',
          color: '#c5ffe8',
          maxWidth: 640,
          margin: '0 auto',
          lineHeight: 1.55,
          textShadow: '0 0 5px #00ffff77',
          fontWeight: 500
        }}>
        Stay one step ahead of cyber threats. CyberGuard AI leverages advanced AI & real-world learning to <b
          style={{ color: '#00ff00' }}>assess risk</b>, simulate phishing <b
          style={{ color: '#ff00ff' }}>attacks</b>, and <b style={{ color: '#00ffff' }}>train your cyber instincts</b>.
        Realtime scoring, automated analysis, and a <b>24/7 Cybersecurity Assistant Chatbot</b>—all in a beautiful, modern dashboard.
      </div>
      {/* CTA bar: Show sign in/up if signed out, else "Go to Dashboard" */}
      <div style={{ zIndex: 1 }}>
        <SignedOut>
          <div style={{
            display: 'flex',
            gap: '18px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <SignInButton mode="modal">
              <button className="btn btn-large"
                style={{
                  background: 'linear-gradient(90deg,#00ffff 20%,#00ff00 90%)',
                  color: '#021b05',
                  fontWeight: 700,
                  fontSize: '1.18rem',
                  boxShadow: '0 0 16px #00ffcc'
                }}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-large btn-outline"
                style={{
                  color: '#00ff00',
                  borderColor: '#00ff00',
                  background: '#012920cc',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                }}>
                Create Account
              </button>
            </SignUpButton>
          </div>
          <div style={{ color: '#b6fff9', marginTop: 18, fontSize: '0.95rem', textShadow: '0 0 6px #00ffe6aa' }}>
            No credit card required. Free for individuals.
          </div>
        </SignedOut>
        <SignedIn>
          <Link to="/dashboard" className="btn btn-large"
            style={{
              background: 'linear-gradient(90deg,#00ff00 0%,#00ffff 90%)',
              color: '#021b05',
              fontWeight: 700,
              fontSize: '1.18rem',
              boxShadow: '0 0 16px #00ffcc, 0 0 6px #282',
              borderRadius: '6px'
            }}>
            Go to Dashboard &rarr;
          </Link>
        </SignedIn>
      </div>
      {/* Animated accent quote */}
      <div style={{
        marginTop: 40,
        fontSize: '1.03rem',
        color: '#00ffea',
        background: 'rgba(0,28,34,0.63)',
        border: '1.2px solid #044',
        borderRadius: '8px',
        padding: '12px 28px',
        display: 'inline-block',
        boxShadow: '0 2px 18px #00ffe033,0 0 7px #222',
        letterSpacing: 0.4,
        animation: 'fadeup 2.3s cubic-bezier(0.38,0.81,0.59,1.06) 1'
      }}>
        <span style={{
          fontWeight: 700,
          textShadow: '0 0 10px #fff, 0 0 8px #00ffff'
        }}>
          &ldquo;Because your first line of security is you.<span className="blinking-pipe" style={{
            fontSize: '1.05em',
            color: '#00ff00',
            textShadow: '0 0 7px #2f0, 0 0 2px #1a3'
          }}>|</span>&rdquo;
        </span>
      </div>

      {/* Animated feature highlights */}
      <div style={{
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        flexWrap: 'wrap',
        zIndex: 2,
        animation: 'fadeup 2.7s 0.5s cubic-bezier(0.38,0.81,0.59,1.06) 1'
      }}>
        <FeatureHighlight
          icon="🛡️"
          accent="#00ff00"
          title="AI Risk Assessment"
          description="Personalized, automated digital risk checkups using advanced AI."
        />
        <FeatureHighlight
          icon="🧠"
          accent="#00ffff"
          title="Phishing Sim & Training"
          description="Train your instincts with real-world phishing simulation and instant feedback."
        />
        <FeatureHighlight
          icon="💬"
          accent="#ff00ff"
          title="24/7 Cybersecurity Chatbot"
          description="Got a question? Get peace of mind—ask our AI about security, privacy, scams & more."
        />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureHighlight({ icon, title, description, accent }) {
  /** Hacker neon theme feature card, with animated glow and short feature description */
  return (
    <div
      style={{
        background: 'rgba(2,40,50,0.93)',
        border: `1.5px solid ${accent ?? "#00ffff"}`,
        borderRadius: '15px',
        minWidth: 230,
        maxWidth: 260,
        minHeight: 162,
        padding: '22px 24px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 0 24px ${accent ?? "#00ffff"}44,0 0 13px #051`, 
        margin: '0 6px',
        position: 'relative',
        animation: 'glow-pulse 2.8s infinite alternate',
      }}
    >
      <div style={{
        fontSize: '2.4rem',
        marginBottom: '7px',
        textShadow: `0 0 15px ${accent ?? "#00ffff"}, 0 0 4px #111`
      }}>
        {icon}
      </div>
      <div style={{
        color: accent ?? '#00ffff',
        fontWeight: 700,
        fontSize: '1.19rem',
        textShadow: `0 0 9px ${accent ?? "#00ffff"}`,
        marginBottom: 6,
      }}>
        {title}
      </div>
      <div style={{
        color: '#b1fff7',
        fontSize: '0.98rem',
        fontWeight: 500,
        lineHeight: 1.48,
        textAlign: 'center',
        textShadow: '0 0 6px #013'
      }}>
        {description}
      </div>
    </div>
  );
}

// Placeholder component for each main route—implement logic & API integration next steps
// PUBLIC_INTERFACE
function PlaceholderPage({ title, accent }) {
  /** Visual placeholder for future major feature sections */
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: accent ?? '#00ffff',
      textShadow: `0 0 12px ${accent ?? '#00ffff'}`,
      fontWeight: 600,
    }}>
      <div style={{
        fontSize: '2.7rem',
        marginBottom: 12
      }}>{title}</div>
      <div style={{
        fontSize: '1.2rem',
        color: '#bff',
        textShadow: `0 0 8px #00ffff`
      }}>
        (Feature coming soon — ready for data/API connection)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root React component for CyberGuard AI: sets up Router, theme, Navbar, and page routes (feature stubs, not hardcoded logic) */
  return (
    <Router>
      <div className="app" style={{ background: "#000022", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ paddingTop: 80 }}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/assessment"
              element={
                <ProtectedRoute>
                  <RiskAssessmentPage />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#00ffff" }}>Loading Dashboard...</div>}>
                    {React.createElement(
                      React.lazy(() => import("./UserDashboardPage"))
                    )}
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/admin"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#ff00ff" }}>Loading Admin Dashboard...</div>}>
                    {React.createElement(
                      React.lazy(() => import("./AdminDashboardPage"))
                    )}
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#00ffff" }}>Loading Reports...</div>}>
                    <ReportsAnalyticsPage />
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/phishing"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#ff00ff" }}>Loading Phishing Simulation...</div>}>
                    <PhishingTestPage />
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#00ffff" }}>Loading Chatbot...</div>}>
                    {React.createElement(
                      React.lazy(() => import("./ChatbotPage"))
                    )}
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<div style={{ color: "#00ffff" }}>Loading Profile...</div>}>
                    {React.createElement(
                      React.lazy(() => import("./UserProfilePage"))
                    )}
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense fallback={<div style={{ color: "#ff00ff" }}>Loading...</div>}>
                  {React.createElement(
                    React.lazy(() => import("./NotFound"))
                  )}
                </React.Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
