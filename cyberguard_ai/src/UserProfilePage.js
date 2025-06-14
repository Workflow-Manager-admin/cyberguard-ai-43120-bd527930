import React, { useState } from "react";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserProfile
} from "@clerk/clerk-react";

/**
 * Neon/Hacker themed Clerk User Profile Page at /profile.
 * - Only accessible to authenticated users (should be used inside ProtectedRoute)
 * - View and edit name, email, roles (ready for roles/preferences extension)
 * - Native Clerk fields + themed surrounding UI
 * - Ready for future profile extensions (preferences, roles)
 */

/* Diagnostic: UserProfilePage.js loaded */
// eslint-disable-next-line no-console
console.log('[UserProfilePage] loaded');

// PUBLIC_INTERFACE
export default function UserProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div style={{
        color: '#00ffff',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '1.23rem'
      }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 96, marginBottom: 48, minHeight: "64vh" }}>
      <div style={{
        textAlign: "center",
        marginBottom: 38,
        animation: "fadeup 1.2s cubic-bezier(0.43,0.81,0.59,1.03) 1"
      }}>
        <div
          style={{
            color: "#00ffff",
            fontWeight: 900,
            fontSize: "2.09rem",
            textShadow: "0 0 38px #00ffffd8,0 0 16px #ff00ff66,0 0 3px #00ff00",
            letterSpacing: 1.28
          }}
        >
          Profile &amp; Settings
          <span
            className="blinking-pipe"
            style={{
              color: "#ff00ff",
              marginLeft: 7,
              fontSize: "1.19em",
              textShadow: "0 0 10px #ff00ffaa, 0 0 5px #051",
            }}
          >|</span>
        </div>
        <div style={{
          color: "#00ff00",
          fontSize: "1.12rem",
          marginTop: 13,
          fontWeight: 420,
          textShadow: "0 0 9px #00ffdd99,0 0 3px #122"
        }}>
          Manage your information and security preferences<br />({user.primaryEmailAddress?.emailAddress || "No email"})
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: 40,
          flexWrap: "wrap"
        }}
      >
        {/* Neon wrapper/panel around Clerk's UserProfile */}
        <NeonPanel style={{
          minWidth: 340, maxWidth: 430, width: "100%",
          padding: "34px 23px 35px 28px",
          borderRadius: "22px"
        }}>
          <UserProfile
            appearance={{
              elements: {
                rootBox: {
                  background: "none",
                  boxShadow: "none",
                  border: "none",
                  color: "#fff"
                },
                card: {
                  background: "rgba(9,33,41,0.92)",
                  borderRadius: "21px",
                  border: "2.2px solid #00ffff88",
                  boxShadow: "0 0 30px #00ffff55,0 0 8px #ff00ff44,0 0 6px #00ff00AA",
                  padding: "14px 0 0 0"
                },
                formFieldLabel: {
                  color: "#00ffff",
                  fontWeight: 700,
                  textShadow: "0 0 7px #00ffff",
                  fontSize: "1.04rem"
                },
                formFieldInput: {
                  background: "#140041",
                  border: "1.3px solid #00ffff77",
                  color: "#00ffea"
                },
                formFieldInputShowPasswordButton: {
                  color: "#ff00ff",
                  fontWeight: 600
                },
                headerTitle: {
                  color: "#ff00ff",
                  textShadow: "0 0 8px #ff00ff",
                  fontWeight: 900
                },
                headerSubtitle: {
                  color: "#b2ffe3"
                },
                navButton: {
                  color: "#00ffff"
                },
                identifierPage: {
                  background: "rgba(15,12,34,0.94)",
                  borderRadius: "12px"
                },
                profileSectionTitleText: {
                  color: "#00ff00",
                  fontWeight: 780,
                  fontSize: "1.04rem"
                },
                profileSectionPrimaryButton: {
                  background: "linear-gradient(90deg,#00ff00,#00ffff)",
                  color: "#222",
                  fontWeight: 700
                },
                profileSectionDangerButton: {
                  background: "linear-gradient(90deg,#ff002e,#ff00ff)",
                  color: "#fff"
                },
                profileSectionContent: {
                  color: "#fff"
                }
              },
              variables: {
                colorPrimary: "#00ffff",
                colorText: "#fff",
                colorBackground: "#16112a",
              }
            }}
            // Only allow "profile" and "security" -- hides org, connected accounts, etc.
            routing="virtual"
            path="/profile"
          />
        </NeonPanel>

        {/* Optionally: profile quick summary (extensible, e.g., future role/plan) */}
        <div style={{
          minWidth: 280, maxWidth: 330, width: "100%",
          background: "linear-gradient(120deg,#130041 65%,#00ff0055 126%)",
          border: "2.1px solid #ff00ff",
          borderRadius: "23px",
          boxShadow: "0 0 15px #ff00ff55,0 0 8px #00ffae44",
          padding: "31px 19px 28px 25px",
          color: "#fff",
          marginBottom: 0,
          alignSelf: "flex-start"
        }}>
          <div style={{ fontWeight: 800, color: "#ff00ff", fontSize: "1.34rem", marginBottom: 7 }}>Account Info</div>
          <div style={{ marginBottom: 14 }}>
            <span style={{ color: "#00ffb7", fontWeight: 600 }}>Name:</span>
            <br />
            <span style={{ fontWeight: 500 }}>{user.fullName || "No name set"}</span>
          </div>
          <div style={{ marginBottom: 14 }}>
            <span style={{ color: "#00ffb7", fontWeight: 600 }}>Email:</span>
            <br />
            <span style={{ fontWeight: 500 }}>{user.primaryEmailAddress?.emailAddress ?? "None"}</span>
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "#00ffb7", fontWeight: 600 }}>Signed up:</span>
            <br />
            <span style={{ fontWeight: 500 }}>
              {user.createdAt ? new Date(user.createdAt).toLocaleString() : "Unknown"}
            </span>
          </div>
          {user.publicMetadata?.role && (
            <div>
              <span style={{ color: "#00ffb7", fontWeight: 600 }}>Role:</span>
              <br />
              <span style={{ fontWeight: 500 }}>{user.publicMetadata.role}</span>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeup {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .blinking-pipe {
          animation: blinkPipe 1.1s steps(1) infinite;
        }
        @keyframes blinkPipe {
          0%, 100% { opacity: 1; }
          48%, 52% { opacity: 0.08; }
        }
      `}</style>
    </div>
  );
}

function NeonPanel({ children, style }) {
  return (
    <div
      style={{
        background: "linear-gradient(110deg, #01182b 91%, #00fff808 100%)",
        border: "2.2px solid #00ffffcc",
        borderRadius: "21px",
        boxShadow: "0 0 33px #00ffff95,0 0 8px #ff00ff66,0 0 4px #01ff67",
        ...style
      }}
    >
      {children}
    </div>
  );
}
