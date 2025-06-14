import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

/**
 * UserDashboardPage: CyberGuard AI user dashboard (route: /dashboard)
 * - Neon/hacker themed, visually modular, Clerk-protected by parent route
 * - Summarizes user's assessment/reports, entry to key features (ready for future API/data)
 * - No demo logic, designed for live data integration
 */

// PUBLIC_INTERFACE
export default function UserDashboardPage() {
  const { user } = useUser();

  return (
    <div className="container" style={{ marginTop: 95, marginBottom: 48, minHeight: "67vh" }}>
      <DashboardTitle user={user} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "36px 3vw",
          marginBottom: "1.7rem",
          justifyContent: "center",
        }}
      >
        <AssessmentSummaryModule />
        <ReportsSummaryModule />
        <PhishingSummaryModule />
      </div>
      <FeatureEntryPoints />
      <style>{`
        /* Neon-glow pulse for dashboard modules */
        @keyframes dashboardGlow {
          0% { box-shadow: 0 0 17px #00ffff66,0 0 6px #ff00ff44,0 0 3px #00ff00; }
          55% { box-shadow: 0 0 50px #00ffffee, 0 0 23px #ff00ff66,0 0 7px #05d; }
          100% { box-shadow: 0 0 23px #00ffeecc,0 0 21px #ff00ffa6,0 0 11px #45ff7c; }
        }
        @keyframes fadeup {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .dashboard-glow {
          animation: dashboardGlow 3.6s infinite alternate;
        }
        .dashboard-fadeup {
          animation: fadeup 1.15s cubic-bezier(0.36,0.81,0.59,1.06) 1;
        }
        @media (max-width: 980px) {
          .dashboard-glow {
            min-width: 95vw !important;
            max-width: 100vw !important;
          }
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardTitle({ user }) {
  return (
    <div style={{
      textAlign: "center",
      marginBottom: 40,
      animation: "fadeup 1.17s cubic-bezier(0.38,0.81,0.59,1.03) 1",
    }}>
      <div style={{
        color: "#00ff00",
        fontWeight: 900,
        fontSize: "2.18rem",
        textShadow: "0 0 43px #00ff6faa,0 0 17px #00fff7,0 0 4px #060",
        letterSpacing: 1.37
      }}>
        Your Dashboard
        <span className="blinking-pipe" style={{
          color: "#00ffff",
          marginLeft: 6,
          fontSize: "1.09em",
          textShadow: "0 0 10px #00ffeaaa, 0 0 5px #251",
        }}>|</span>
      </div>
      <div style={{
        color: "#b2ffe3",
        fontSize: "1.09rem",
        marginTop: 7,
        fontWeight: 450,
        textShadow: "0 0 9px #00ffeaaa,0 0 3px #122"
      }}>
        {user?.firstName ? (
          <>Welcome back, <span style={{ color: "#00ffff", fontWeight: 600 }}>{user.firstName}!</span> </>) : <>Welcome to CyberGuard AI.</>
        }
        <span style={{ color: "#ff00ff" }}> (API-driven data coming soon)</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AssessmentSummaryModule() {
  // Neon-glow card: summary of last/future assessments
  return (
    <div
      className="dashboard-glow dashboard-fadeup"
      style={{
        minWidth: 270,
        maxWidth: 350,
        flex: "1 0 210px",
        minHeight: 185,
        padding: "33px 22px 29px 26px",
        background: "linear-gradient(123deg,#051b21 76%,#00ffe176 108%)",
        border: "2.5px solid #00ffea",
        borderRadius: "21px",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#00ffff" icon="🛡️">Risk Assessment</SectionHeader>
      <div style={{
        color: "#bff",
        fontSize: "1.06rem",
        marginBottom: 7,
        fontWeight: 500,
      }}>
        Check your cyber hygiene. Your last risk score and next assessment show here.
      </div>
      <div style={{
        marginTop: 12,
        minHeight: 49,
        color: "#00ffff",
        fontSize: "2.12rem",
        fontWeight: 900,
        textShadow: "0 0 14px #00fff997,0 0 8px #ff00ff88,0 0 4px #100",
        opacity: 0.23,
        filter: "blur(0.8px) contrast(1.13)"
      }}>
        {/* Await API data */}
        —
      </div>
      <div style={{
        marginTop: 8,
        fontSize: "0.99rem",
        color: "#ff00ffbb",
        opacity: 0.7,
      }}>
        (Results will display after your first assessment)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ReportsSummaryModule() {
  // Neon-glow card: summary of user's reports/analytics
  return (
    <div
      className="dashboard-glow dashboard-fadeup"
      style={{
        minWidth: 270,
        maxWidth: 350,
        flex: "1 0 210px",
        minHeight: 185,
        padding: "33px 22px 29px 25px",
        background: "linear-gradient(135deg,#12192d 92%,#00fff931 108%)",
        border: "2.5px solid #00ffff",
        borderRadius: "21px",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#00ffff" icon="📊">Reports & History</SectionHeader>
      <div style={{
        color: "#bff",
        fontSize: "1.06rem",
        marginBottom: 7,
        fontWeight: 500,
      }}>
        Explore your analytics and report history over time.
      </div>
      <div style={{
        marginTop: 12,
        minHeight: 49,
        color: "#00ffff",
        fontSize: "2.12rem",
        fontWeight: 900,
        textShadow: "0 0 14px #00fff997,0 0 8px #ff00ff88,0 0 4px #100",
        opacity: 0.23,
        filter: "blur(0.8px) contrast(1.13)"
      }}>
        {/* Placeholder for future chart-stats */}
        ...
      </div>
      <div style={{
        marginTop: 8,
        fontSize: "0.99rem",
        color: "#ff00ffcc",
        opacity: 0.67
      }}>
        (Instant summary and visuals when API is connected)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function PhishingSummaryModule() {
  // Neon-glow card: summary of phishing test or learning progress
  return (
    <div
      className="dashboard-glow dashboard-fadeup"
      style={{
        minWidth: 270,
        maxWidth: 350,
        flex: "1 0 210px",
        minHeight: 185,
        padding: "33px 22px 29px 25px",
        background: "linear-gradient(126deg,#1a1529 90%,#ff00ff28 108%)",
        border: "2.5px solid #ff00ff",
        borderRadius: "21px",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <SectionHeader accent="#ff00ff" icon="🎯">Phishing Training</SectionHeader>
      <div style={{
        color: "#e4c8ff",
        fontSize: "1.06rem",
        marginBottom: 7,
        fontWeight: 500,
      }}>
        Simulate attacks, learn spotting scams, and track phishing defenses.
      </div>
      <div style={{
        marginTop: 12,
        minHeight: 49,
        color: "#ff00ff",
        fontSize: "2.12rem",
        fontWeight: 900,
        textShadow: "0 0 13px #ff00ff97,0 0 8px #03f4,0 0 4px #fff9",
        opacity: 0.19,
        filter: "blur(1.3px) contrast(1.10)"
      }}>
        {/* Stat/score coming after first simulation */}
        ...
      </div>
      <div style={{
        marginTop: 8,
        fontSize: "0.99rem",
        color: "#00ffffcc",
        opacity: 0.65
      }}>
        (Interactive phish stats coming soon!)
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureEntryPoints() {
  // Four main pathway buttons: risk assessment, reports, phishing, chatbot.
  // Modularized ready for navigation or extra visual info
  const buttons = [
    {
      label: "Run Risk Assessment",
      to: "/assessment",
      accent: "#00ff00",
      icon: "🛡️"
    },
    {
      label: "View All Reports",
      to: "/reports",
      accent: "#00ffff",
      icon: "📊"
    },
    {
      label: "Phishing Simulation",
      to: "/phishing",
      accent: "#ff00ff",
      icon: "🎯"
    },
    {
      label: "Open Chatbot",
      to: "/chatbot",
      accent: "#ff00ff",
      icon: "🤖"
    }
  ];
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "21px",
      justifyContent: "center",
      marginTop: 22,
      marginBottom: 5,
    }}>
      {buttons.map((btn, idx) => (
        <Link key={btn.to} to={btn.to} style={{ textDecoration: "none" }}>
          <div
            style={{
              background: `linear-gradient(98deg,${btn.accent}11 60%,#00ff000a 120%)`,
              border: `2.1px solid ${btn.accent}`,
              boxShadow: `0 0 17px ${btn.accent}33,0 0 7px #011`,
              color: btn.accent,
              fontWeight: 700,
              fontSize: "1.11rem",
              textShadow: `0 0 13px ${btn.accent}a2,0 0 3px #fff,0 0 2px #101`,
              borderRadius: "13px",
              minWidth: 190,
              padding: "16px 22px 15px 20px",
              margin: "0 4px",
              alignItems: "center",
              display: "flex",
              gap: 13,
              cursor: "pointer",
              transition: "filter 0.15s,box-shadow 0.15s,background 0.18s",
              animation: `fadeup 1.1s ${0.12 * idx + 0.7}s 1 cubic-bezier(0.28,0.81,0.49,1.15)`,
            }}
            className="dashboard-glow"
            tabIndex={0}
            aria-label={btn.label}
          >
            <span
              style={{
                fontSize: "1.43em",
                marginRight: 4,
                textShadow: `0 0 15px ${btn.accent}, 0 0 2px #fff`
              }}
            >{btn.icon}</span>
            {btn.label}
          </div>
        </Link>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function SectionHeader({ children, accent, icon }) {
  // Glowing section title for dashboard cards
  return (
    <div style={{
      color: accent || "#00ffff",
      fontWeight: 900,
      fontSize: "1.13rem",
      marginBottom: 7,
      textShadow: `0 0 14px ${accent || "#00ffff"}`,
      letterSpacing: 1.09,
      display: "flex",
      alignItems: "center",
      gap: 8,
      position: "relative",
    }}>
      <span style={{
        fontSize: "1.21em",
        marginRight: 6,
        textShadow: `0 0 14px ${accent || "#00ffff"}66`
      }}>{icon}</span>
      {children}
      <span style={{
        display: "inline-block",
        width: 30,
        height: 5,
        background: `linear-gradient(90deg,${accent || "#00ffff"} 27%,#ff00ff 100%)`,
        borderRadius: 8,
        marginLeft: 12,
        filter: "blur(0.7px)",
        animation: "dashboardGlow 1.6s cubic-bezier(0.51,0.68,0.59,1) infinite alternate",
        verticalAlign: "middle"
      }}></span>
    </div>
  );
}
