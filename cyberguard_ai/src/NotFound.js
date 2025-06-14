import React from "react";

/**
 * NotFound (404) Page – Hacker/Neon Theme
 * Displays when users navigate to an undefined route.
 */

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        marginTop: 120,
        marginBottom: 48,
        minHeight: "68vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
          animation: "fadeup 1.1s cubic-bezier(0.38,0.81,0.59,1.03) 1"
        }}
      >
        <h1
          style={{
            fontSize: "4.2rem",
            fontWeight: 900,
            color: "#00ffff",
            textShadow: "0 0 50px #00ffff,0 0 33px #ff00ff88,0 0 13px #111",
            letterSpacing: "1.6px",
            margin: 0
          }}
        >
          404
          <span
            className="blinking-pipe"
            style={{
              color: "#ff00ff",
              marginLeft: 8,
              fontSize: "1.12em",
              textShadow: "0 0 10px #ff00ffaa,0 0 5px #241"
            }}
          >|</span>
        </h1>
        <div
          style={{
            color: "#ff00ff",
            fontWeight: 800,
            fontSize: "1.52rem",
            textShadow: "0 0 22px #ff00ff, 0 0 6px #fff4",
            letterSpacing: "1.2px",
            marginTop: 8
          }}
        >
          Page Not Found
        </div>
        <div
          style={{
            color: "#23ffff",
            fontSize: "1.15rem",
            marginTop: 16,
            marginBottom: 12,
            textShadow: "0 0 10px #00ffe9",
            fontWeight: 500,
            maxWidth: 400,
            lineHeight: 1.45,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Sorry, this path does not exist.<br />
          Are you lost in cyberspace?
        </div>
        <div
          style={{
            marginTop: 21,
            animation: "glowpulse404 2.3s cubic-bezier(0.5,0.7,0.5,1.1) infinite alternate"
          }}
        >
          <svg width="111" height="33">
            <defs>
              <radialGradient id="glow404" cx="53%" cy="49%" r="85%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
                <stop offset="70%" stopColor="#00ffff" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse
              cx="55"
              cy="16"
              rx="52"
              ry="13"
              fill="url(#glow404)"
              style={{ filter: "blur(0.6px)" }}
            />
          </svg>
        </div>
      </div>
      <a
        href="/"
        className="btn btn-large"
        style={{
          background: "linear-gradient(93deg,#00ff00 20%,#00ffff 100%)",
          color: "#061113",
          fontWeight: 750,
          fontSize: "1.13rem",
          borderRadius: 7,
          boxShadow: "0 0 16px #00ffff88,0 0 5px #ff00ff44",
          marginTop: 15,
          textDecoration: "none",
          letterSpacing: "0.03em"
        }}
        tabIndex={0}
      >
        Return Home
      </a>
      {/* Hacker neon accent */}
      <style>{`
        @keyframes glowpulse404 {
          0% { filter: brightness(0.96); }
          60% { filter: brightness(1.35) drop-shadow(0 0 16px #00ffffcc); }
          100% { filter: brightness(1.13) drop-shadow(0 0 9px #ff00ffcc); }
        }
        @keyframes fadeup {
          from { transform: translateY(36px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .blinking-pipe {
          animation: blinkPipe 1.13s steps(1) infinite;
        }
        @keyframes blinkPipe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.09; }
        }
      `}</style>
    </div>
  );
}
