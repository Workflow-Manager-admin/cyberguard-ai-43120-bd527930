import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Array of sample phishing simulation emails (template can be wired to API/fetch)
const PHISHING_EMAIL_SCENARIOS = [
  {
    id: "phish-001",
    subject: "Your Account Will Be Closed – Immediate Action Required",
    from: "security-alert@paypal-account.com",
    date: "Today, 8:24 AM",
    html: `
      <p>Dear user,</p>
      <p>Our system detected suspicious activities on your PayPal account. For your protection, your account will be <b>permanently closed</b> unless you verify your identity within the next 2 hours.</p>
      <p><a href="http://ppal-customers-securityupdate.com/verify" style="color:#ff00ff;" target="_blank"><b>Click here to verify now</b></a></p>
      <p>If you do not respond, you will lose access to your account and funds.</p>
      <p>Thanks,<br/>PayPal Support Security Team</p>
    `,
    isPhish: true,
    explanation: "This is a classic phishing email: urgent/fear tactics, suspicious sender, and a misleading link (points to a non-paypal domain).",
  },
  {
    id: "phish-002",
    subject: "Google Account Security Checkup",
    from: "no-reply@accounts.google.com",
    date: "Today, 11:03 AM",
    html: `
      <p>This is a notification that your Google account was signed in on a new device.</p>
      <p>If this was you, no action is required.</p>
      <p>If you do not recognize this activity, please visit your <a href="https://myaccount.google.com/security" style="color:#00ffff;" target="_blank">Google Account Security page</a> to secure your account.</p>
      <p>- The Google Accounts Team</p>
    `,
    isPhish: false,
    explanation: "This is a legitimate security notice. URLs and sender are genuine, language is non-threatening.",
  },
  {
    id: "phish-003",
    subject: "IT Support: Urgent Shared Drive Access Issue",
    from: "it-helpdesk@micros0ft-support.com",
    date: "Yesterday, 5:18 PM",
    html: `
      <p>Hi,</p>
      <p>Your cloud storage access will be revoked. Please <a href="https://microsoftdrive-support.com/relogin" style="color:#ff00ff;">log in here</a> to avoid disruption and validate your credentials.</p>
      <p>- IT Helpdesk</p>
    `,
    isPhish: true,
    explanation: "Suspicious sender (domain misspelling), untrusted link, and threat of access loss indicate phishing.",
  }
];

// PUBLIC_INTERFACE
function NeonPanel({ children, style }) {
  return (
    <div
      style={{
        background: "rgba(14,14,28,0.75)",
        border: "2.1px solid #00ffff99",
        borderRadius: "18px",
        boxShadow:
          "0 0 30px #00ffff77, 0 0 10px #ff00ff66, 0 0 3px #00ff00",
        padding: "32px 30px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
function PhishingEmail({ email, state, onAction }) {
  // Render the "look" of a typical webmail message
  return (
    <NeonPanel style={{
      marginBottom: 34,
      boxShadow: email.isPhish
        ? "0 0 24px #ff00ff99,0 0 8px #222222"
        : "0 0 18px #00ffcc77,0 0 5px #111",
      border: state === "judged"
        ? (email.isPhish
          ? "2.5px solid #ff00ff"
          : "2.5px solid #00ffcc")
        : undefined,
      transition: "border 0.19s"
    }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: "#00ffff", fontSize: "1.09rem" }}>
          <span style={{ color: "#ff00ff", marginRight: 7 }}>✉</span>
          <span>Subject:</span> <span style={{ fontWeight: 600 }}>{email.subject}</span>
        </div>
        <div style={{ color: "#00ff00", fontSize: "0.98rem", marginTop: 2 }}>
          From: <span style={{ color: "#baf" }}>{email.from}</span>
        </div>
        <div style={{ color: "#fff6", fontSize: "0.96rem", marginBottom: 3 }}>
          Date: {email.date}
        </div>
        <hr style={{ borderColor: "#00ffff44", marginTop: 7, marginBottom: 7 }} />
        <div
          style={{
            color: "#ddd",
            fontSize: "1.07rem",
            minHeight: 68,
            marginBottom: 10
          }}
          dangerouslySetInnerHTML={{ __html: email.html }}
        />
        {state === "judged" && (
          <div style={{
            color: email.isPhish ? "#ff00ff" : "#00ffb3",
            fontWeight: 700,
            textShadow: email.isPhish
              ? "0 0 13px #ff00ff,0 0 6px #222"
              : "0 0 7px #00ffb388,0 0 8px #013",
            fontSize: "1.08rem",
            marginTop: 9
          }}>
            <span>
              This email is <b>{email.isPhish ? "Phishing" : "Legitimate"}</b>.
            </span>
            <br />
            <span style={{ fontWeight: 600, fontSize: "0.97rem", color: "#fff" }}>
              {email.explanation}
            </span>
          </div>
        )}
      </div>
      {state === "waiting" && (
        <div style={{ display: "flex", gap: 15, marginTop: 6 }}>
          <button
            onClick={() => onAction("phishing")}
            style={{
              background: "linear-gradient(90deg,#ff00ff 50%,#db00ff 100%)",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 0 6px #ff00ff99",
              padding: "9px 22px",
              cursor: "pointer",
              fontSize: "1.06rem"
            }}
          >
            🚨 Mark as Phishing
          </button>
          <button
            onClick={() => onAction("safe")}
            style={{
              background: "linear-gradient(90deg,#00ffff 50%,#00ffcc 100%)",
              color: "#132",
              fontWeight: 700,
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 0 5px #00ffaaaa",
              padding: "9px 22px",
              cursor: "pointer",
              fontSize: "1.06rem"
            }}
          >
            ✅ Legitimate Email
          </button>
        </div>
      )}
    </NeonPanel>
  );
}

// PUBLIC_INTERFACE
function AnimatedAccent({ color = "#ff00ff" }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 44,
        height: 6,
        background: `linear-gradient(90deg,${color} 0%,#00ffff 90%)`,
        borderRadius: 8,
        marginLeft: 10,
        filter: "blur(0.6px)",
        animation: "phishingpulse 1.4s cubic-bezier(0.5,0.7,0.5,1) infinite alternate",
        verticalAlign: "middle",
      }}
    />
  );
}

// PUBLIC_INTERFACE
function PhishingTestPage() {
  // "answers": array of { emailId, userAnswer: "phishing"|"safe", correct: bool }
  const [step, setStep] = useState(0);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const { user } = useUser();

  const emails = PHISHING_EMAIL_SCENARIOS;
  const curr = emails[step];

  function handleAnswer(ans) {
    const isCorrect =
      (ans === "phishing" && curr.isPhish) ||
      (ans === "safe" && !curr.isPhish);
    setResults([
      ...results,
      {
        emailId: curr.id,
        userAnswer: ans,
        correct: isCorrect,
        isPhish: curr.isPhish
      },
    ]);
    // Brief animation then move (UX)
    setTimeout(() => {
      if (step < emails.length - 1) {
        setStep(step + 1);
      } else {
        setDone(true);
      }
    }, 500);
  }

  function handleRestart() {
    setStep(0);
    setResults([]);
    setDone(false);
  }

  // Stylized neon badge for result
  function ScoreBadge({ correct }) {
    return (
      <span
        style={{
          padding: "2px 10px",
          background: correct ? "#002b17" : "#200024",
          border: `2.1px solid ${correct ? "#00ff00" : "#ff00ff"}`,
          borderRadius: "9px",
          color: correct ? "#56ff56" : "#ff00d0",
          fontWeight: 700,
          fontSize: "0.98rem",
          boxShadow: correct
            ? "0 0 8px #00ff96"
            : "0 0 10px #ff00ff99",
          marginLeft: 8,
        }}
      >
        {correct ? "Correct" : "Incorrect"}
      </span>
    );
  }

  return (
    <div className="container" style={{ marginTop: 98, marginBottom: 32, minHeight: 500 }}>
      <div style={{
        textAlign: "center",
        marginBottom: 36,
        animation: "fadeup 1s cubic-bezier(0.3,0.7,0.59,1.08) 1",
      }}>
        <span style={{
          color: "#ff00ff",
          letterSpacing: 1.14,
          fontWeight: 700,
          fontSize: "1.17rem",
          textShadow: "0 0 13px #ff00ff,0 0 19px #00ffff44",
          textTransform: "uppercase"
        }}>
          Phishing Awareness Test
        </span>
        <AnimatedAccent />
        <div style={{
          fontSize: "2.47rem",
          fontWeight: 800,
          marginTop: 9,
          color: "#00ffff",
          textShadow: "0 0 32px #00ffff, 0 0 19px #ff00ff88,0 0 2px #ff00ff",
        }}>
          <span>
            <span
              style={{
                color: "#00ffff",
                textShadow: "0 0 30px #00ffff"
              }}
            >
              Spot the Phish
            </span>
            <span style={{
              color: "#ff00ff",
              marginLeft: 6,
              textShadow: "0 0 26px #ff00ff,0 0 8px #122",
              fontWeight: 700,
            }}>
              <span
                className="blinking-pipe"
                style={{
                  color: "#ff00ff",
                  marginLeft: 2,
                  fontSize: "1.08em"
                }}
              >
                |
              </span>
            </span>
          </span>
        </div>
        <div style={{
          fontSize: "1.1rem",
          marginTop: 13,
          marginBottom: 4,
          color: "#ccffee",
          maxWidth: 540,
          marginRight: "auto",
          marginLeft: "auto",
          fontWeight: 500,
          textShadow: "0 0 7px #00ffff44",
        }}>
          Read each email carefully. Decide: Is it a phishing attempt or a real message?
        </div>
      </div>

      {done ? (
        <NeonPanel style={{
          padding: "40px 40px 28px 40px",
          textAlign: "center",
          marginTop: "36px",
          marginBottom: "14px",
          background:
            "linear-gradient(101deg,#011022 71%,#ff00cc0c 110%)",
        }}>
          <div style={{
            fontSize: "2.01rem",
            fontWeight: 800,
            color: "#00ffb3",
            textShadow: "0 0 21px #00ffff,0 0 8px #044,0 0 30px #00ffea88",
            marginBottom: 12,
          }}>
            🎉 Test Complete!
          </div>
          <div style={{
            fontSize: "1.18rem",
            color: "#ffc6fa",
            marginBottom: 11,
            textShadow: "0 0 9px #ff00ff77",
          }}>
            You scored <b style={{ color: "#00ffb3" }}>{results.filter(r => r.correct).length}</b> out of <b style={{ color: "#ff00ff" }}>{emails.length}</b> correct!
          </div>
          <div style={{
            textAlign: "left",
            margin: "0 auto",
            maxWidth: 480,
          }}>
            {results.map((r, idx) => {
              const em = emails.find(e => e.id === r.emailId);
              return (
                <div key={r.emailId} style={{
                  marginBottom: 17,
                  padding: "14px 12px",
                  background: "#1b002c44",
                  borderRadius: 7,
                  border: "1.4px solid #ff00ff77",
                  color: "#fff",
                  fontSize: "1.06rem",
                  boxShadow: r.correct
                    ? "0 0 10px #00ffb366"
                    : "0 0 13px #ff00ff44"
                }}>
                  <b style={{ color: "#ff00ff" }}>Q{idx + 1}</b>: <span style={{ color: "#00ffff" }}>{em.subject}</span>
                  <ScoreBadge correct={r.correct} />
                  <div style={{ marginTop: 4, fontSize: "0.97rem", color: "#ace" }}>
                    Your answer: <b>{r.userAnswer === 'phishing' ? "Phishing" : "Legitimate"}</b>
                  </div>
                  <div style={{ color: "#fff", marginTop: 3, fontSize: "0.96rem" }}>
                    {em.explanation}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="btn btn-large"
              style={{
                background: "linear-gradient(90deg,#ff00ff 0%,#00ffff 98%)",
                color: "#002b19",
                fontWeight: 700,
                marginTop: 22,
                fontSize: "1.05rem",
                borderRadius: "6px"
              }}
              onClick={handleRestart}
            >
              Try Again
            </button>
          </div>
        </NeonPanel>
      ) : (
        <div>
          <PhishingEmail
            email={curr}
            state={results.length === step ? "waiting" : "judged"}
            onAction={handleAnswer}
          />
          {results.length > 0 && results.length === step && (
            <div style={{
              color: results[results.length - 1].correct ? "#00ffb3" : "#ff00ff",
              fontSize: "1.12rem",
              textAlign: "center",
              fontWeight: 700,
              marginBottom: 16,
            }}>
              {results[results.length - 1].correct ? "✅ You got it right!" : "❌ Not quite—study the clues above."}
            </div>
          )}
          <div style={{
            textAlign: "center",
            marginTop: 21,
            color: "#baf",
            fontWeight: 500,
            fontSize: "0.99rem"
          }}>
            Email {step + 1} of {emails.length}
          </div>
        </div>
      )}

      {/* Animated accent bar */}
      <style>{`
        @keyframes phishingpulse {
          0% { box-shadow: 0 0 14px #ff00ff77,0 0 2px #00ffff,0 0 2px #ff00ffaa;}
          67% { box-shadow: 0 0 36px #ff00ffaa,0 0 10px #00ffff,0 0 18px #00ffff;}
          100% { box-shadow: 0 0 14px #00ffcc99,0 0 21px #00ffff,0 0 9px #ff00ff;}
        }
        @keyframes fadeup {
          from { transform: translateY(34px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PhishingTestPage;
