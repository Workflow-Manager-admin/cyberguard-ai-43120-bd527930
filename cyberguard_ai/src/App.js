import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// PUBLIC_INTERFACE
function Navbar() {
  /** Main navigation bar for CyberGuard AI */
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
  /** Hero section for landing page; no hardcoded logic, styled for neon effect */
  return (
    <div className="hero" style={{
      paddingTop: '120px',
      paddingBottom: '64px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }}>
      <div className="subtitle" style={{
        color: '#00ffff',
        fontWeight: 'bold',
        textShadow: '0 0 8px #00ffff, 0 0 2px #003399'
      }}>
        Next-gen AI Cybersecurity
      </div>
      <h1 className="title" style={{
        fontSize: '3.3rem',
        color: '#fff',
        fontWeight: 700,
        textShadow: '0 0 18px #00ffb3, 0 0 2px #00ffb3'
      }}>
        Welcome to <span style={{ color: '#00ff00', textShadow: '0 0 20px #00ff00' }}>CyberGuard AI</span>
      </h1>
      <div className="description" style={{
        fontSize: '1.2rem',
        color: '#e0f3ff',
        maxWidth: 580,
        margin: '0 auto',
        textShadow: '0 0 6px #00ffffcc'
      }}>
        The all-in-one platform to assess, train, and protect your digital presence using cutting-edge AI. Explore risk scoring, phishing detection, AI cybersecurity chat, and more—all in real time.
      </div>
      <div>
        <Link to="/assessment" className="btn btn-large" style={{
          background: 'linear-gradient(90deg, #00ff00 30%, #00ffff 70%)',
          color: '#19191e',
          boxShadow: '0 0 16px #00ffcc, 0 0 2px #00ffcc',
          borderRadius: '6px',
          fontSize: '1.09rem'
        }}>
          Get Started
        </Link>
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
            <Route path="/assessment" element={<PlaceholderPage title="Risk Assessment" accent="#00ff00" />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports & Analytics" accent="#00ffff" />} />
            <Route path="/phishing" element={<PlaceholderPage title="Phishing Simulations" accent="#ff00ff" />} />
            <Route path="/chatbot" element={<PlaceholderPage title="Cybersecurity Chatbot" accent="#00ffff" />} />
            <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" accent="#ff00ff" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
