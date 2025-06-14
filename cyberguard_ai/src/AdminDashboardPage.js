import React from "react";
import { useUser } from "@clerk/clerk-react";

/**
 * CyberGuard AI Admin Dashboard – modular, neon/hacker themed, Clerk-protected.
 * Designed for future API/data integration in analytics/log actions/logs.
 * No demo or hardcoded business logic; all widgets ready for live content.
 */

/* Diagnostic: AdminDashboardPage.js loaded */
// eslint-disable-next-line no-console
console.log('[AdminDashboardPage] loaded');

// PUBLIC_INTERFACE
export default function AdminDashboardPage() {
  const { user } = useUser();

  return (
    <div className="container" style={{ marginTop: 95, marginBottom: 50, minHeight: "64vh" }}>
      <DashboardTitle />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "36px 3vw",
          marginBottom: "46px",
          justifyContent: "center"
        }}
      >
        <AnalyticsModule />
        <LogsModule />
        <ActionsModule />
      </div>
      <style>{`
        /* Hacker neon pulse/animated accent styles for admin modules */
        @keyframes admin-glow {
          0% { box-shadow: 0 0 16px #00ffff66,0 0 7px #ff00ff44,0 0 3px #00ff00; }
          49% { box-shadow: 0 0 48px #00fffbba, 0 0 16px #ff00ff66,0 0 9px #05d; }
          100% { box-shadow: 0 0 23px #00ffcc99,0 0 25px #ff00ff88, 0 0 14px #00ff00; }
        }
        @keyframes fadeup {
          from { transform: translateY(28px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .admin-glow {
          animation: admin-glow 2.8s infinite alternate;
        }
        .admin-fadeup {
          animation: fadeup 1.2s cubic-bezier(0.36,0.81,0.59,1.06) 1;
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardTitle() {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 38,
        animation: "fadeup 1s cubic-bezier(0.38,0.81,0.59,1.03) 1",
      }}
    >
      <div
        style={{
          color: "#ff00ff",
          fontWeight: 900,
          fontSize: "2.14rem",
          textShadow: "0 0 46px #ff00ffa9,0 0 19px #00fff7,0 0 4px #222",
          letterSpacing: 1.4
        }}
      >
        Admin Dashboard
        <span className="blinking-pipe" style={{
          color: "#00ffff",
          marginLeft: 5,
          fontSize: "1.19em",
          textShadow: "0 0 10px #00ffeaaa, 0 0 5px #251",
        }}>|</span>
      </div>
      <div
        style={{
          color: "#c0ffee",
          fontSize: "1.13rem",
          marginTop: 7,
          marginBottom: 4,
          fontWeight: 400,
          textShadow: "0 0 9px #00ffeaaa,0 0 3px #122",
        }}
      >
        Analytics, system logs, and management tools.<span style={{ color: "#ff00ff" }}> (API-ready)</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AnalyticsModule() {
  // Neon-glow analytic card for admin metrics (Ready for future chart integration)
  return (
    <div
      className="admin-glow admin-fadeup"
      style={{
        minWidth: 300,
        maxWidth: 375,
        flex: "1 0 270px",
        minHeight: 220,
        padding: "31px 20px 32px 23px",
        background: "linear-gradient(120deg,#0b1538 75%,#ff00ff07 110%)",
        border: "2.7px solid #00ffff",
        borderRadius: "23px",
        boxShadow: "0 0 44px #00ffff99,0 0 16px #ff00ff44,0 0 13px #0ff933",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#00ffff" icon="📈">Analytics Overview</SectionHeader>
      <div
        style={{
          color: "#bff",
          fontSize: "1.06rem",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        Track app usage, risk trends, phishing stats, and threat detection.
      </div>
      <div
        style={{
          marginTop: 19,
          minHeight: 62,
          color: "#00ffff",
          fontSize: "2.1rem",
          fontWeight: 900,
          textShadow: "0 0 19px #00fff997,0 0 9px #ff00ff88,0 0 4px #100",
          opacity: 0.23,
          filter: "blur(1.2px) contrast(1.11)"
        }}
      >
        {/* API-connected chart or key stats here */}
        ...
      </div>
      <div
        style={{
          marginTop: 13,
          fontSize: "0.97rem",
          color: "#ff00ffbb",
          opacity: 0.7,
        }}
      >
        (Real-time data will appear when API/live backend is connected)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function LogsModule() {
  // Logs/feedback log admin card, neon style, for API/back-log connect later
  return (
    <div
      className="admin-glow admin-fadeup"
      style={{
        minWidth: 300,
        maxWidth: 375,
        flex: "1 0 270px",
        minHeight: 220,
        padding: "31px 20px 32px 23px",
        background: "linear-gradient(130deg,#191228 88%,#00ffff08 110%)",
        border: "2.7px solid #ff00ff",
        borderRadius: "23px",
        boxShadow: "0 0 33px #ff00ff88,0 0 15px #00fff944,0 0 7px #000",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#ff00ff" icon="🗒️">Logs & Feedback</SectionHeader>
      <div
        style={{
          color: "#e4c8ff",
          fontSize: "1.06rem",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        User feedback, logs, API errors, and training requests.
      </div>
      <div
        style={{
          marginTop: 19,
          minHeight: 62,
          color: "#ff00ff",
          fontSize: "1.82rem",
          fontWeight: 900,
          textShadow: "0 0 13px #ff00ff97,0 0 8px #03f4,0 0 1px #fff9",
          opacity: 0.19,
          filter: "blur(1.15px) contrast(1.10)"
        }}
      >
        {/* Feedback/log list will appear here after API/data connection */}
        ...
      </div>
      <div
        style={{
          marginTop: 13,
          fontSize: "0.97rem",
          color: "#00ffffbb",
          opacity: 0.6,
        }}
      >
        (Awaiting integration. Displayed real-time when backend log feed is available)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ActionsModule() {
  // Admin actions panel: user management, API resets, toggles, etc. (ready for future controls/integration)
  return (
    <div
      className="admin-glow admin-fadeup"
      style={{
        minWidth: 300,
        maxWidth: 375,
        flex: "1 0 270px",
        minHeight: 220,
        padding: "31px 20px 32px 23px",
        background: "linear-gradient(140deg,#111933 98%,#00ff0080 110%)",
        border: "2.7px solid #00ff00",
        borderRadius: "23px",
        boxShadow: "0 0 33px #00ff6a99,0 0 13px #00ffff66,0 0 6px #100",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#00ff00" icon="🛠">Management Tools</SectionHeader>
      <div
        style={{
          color: "#c3ffd7",
          fontSize: "1.06rem",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        User/account management, content moderation, API management.
      </div>
      <div
        style={{
          marginTop: 19,
          minHeight: 62,
          color: "#00ff00",
          fontSize: "1.7rem",
          fontWeight: 900,
          textShadow: "0 0 22px #00ff9977,0 0 10px #0a0,0 0 8px #fff",
          opacity: 0.21,
          filter: "blur(1px) contrast(1.07)"
        }}
      >
        {/* Admin actions/buttons will be rendered here when feature connected */}
        ...
      </div>
      <div
        style={{
          marginTop: 13,
          fontSize: "0.97rem",
          color: "#00ff99bb",
          opacity: 0.55,
        }}
      >
        (All actions are API-driven; controls enabled when API ready)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SectionHeader({ children, accent, icon }) {
  // Glowing section title w/ animated bar.
  return (
    <div style={{
      color: accent || "#00ffff",
      fontWeight: 900,
      fontSize: "1.12rem",
      marginBottom: 6,
      textShadow: `0 0 12px ${accent || "#00ffff"}`,
      letterSpacing: 1.1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      position: "relative",
    }}>
      <span style={{
        fontSize: "1.23em",
        marginRight: 5,
        textShadow: `0 0 14px ${accent || "#00ffff"}66`
      }}>{icon}</span>
      {children}
      <span style={{
        display: "inline-block",
        width: 38,
        height: 5,
        background: `linear-gradient(90deg,${accent || "#00ffff"} 30%,#ff00ff 100%)`,
        borderRadius: 8,
        marginLeft: 12,
        filter: "blur(0.8px)",
        animation: "admin-glow 1.7s cubic-bezier(0.5,0.7,0.5,1) infinite alternate",
        verticalAlign: "middle"
      }}></span>
    </div>
  );
}
