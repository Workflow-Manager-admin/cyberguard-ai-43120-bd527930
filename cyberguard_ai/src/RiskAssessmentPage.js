import React, { useState } from "react";

/**
 * DYNAMIC RISK ASSESSMENT QUESTIONS
 * This is a real representation for initial prod. Connect to backend or API for dynamic questions/choices next.
 *
 * Each question supports:
 * - type: 'single', 'multi', 'text', 'number', 'slider'
 * - choices: for single/multi
 * - validation, optional/required
 */
const riskQuestions = [
  {
    id: "strong_passwords",
    type: "single",
    question: "How are your passwords managed?",
    choices: [
      { value: "manager", label: "Using a password manager" },
      { value: "unique", label: "Unique for each site, but stored in browser/notes" },
      { value: "reuse", label: "I reuse similar/few passwords everywhere" },
    ],
    required: true,
  },
  {
    id: "mfa_enabled",
    type: "single",
    question: "Which accounts have Multi-Factor Authentication enabled?",
    choices: [
      { value: "all", label: "All major accounts (email, banking, socials)" },
      { value: "some", label: "Some (work, or banking only)" },
      { value: "none", label: "None, or I'm not sure" },
    ],
    required: true,
  },
  {
    id: "os_patch",
    type: "single",
    question: "How do you handle operating system and app updates?",
    choices: [
      { value: "auto", label: "Enable automatic updates everywhere" },
      { value: "manual", label: "I update key apps/devices manually" },
      { value: "never", label: "Rarely or never update" },
    ],
    required: true,
  },
  {
    id: "phishing_check",
    type: "single",
    question: "When you get a suspicious email or message, what do you do?",
    choices: [
      { value: "verify", label: "I check sender/domain/call company" },
      { value: "ignore", label: "I ignore but don't verify" },
      { value: "click", label: "I sometimes click just to check" },
    ],
    required: true,
  },
  {
    id: "devices_count",
    type: "number",
    question: "How many devices do you use to access personal accounts? (estimate)",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "cloud_backup",
    type: "single",
    question: "Are your important files/documents backed up in the cloud or externally?",
    choices: [
      { value: "cloud", label: "Cloud backup (Google Drive, iCloud, OneDrive, etc.)" },
      { value: "external", label: "External drives only" },
      { value: "none", label: "No backup" },
    ],
    required: false,
  },
  {
    id: "advanced_exposure",
    type: "multi",
    question: "Have you experienced any of the following? (Select all that apply)",
    choices: [
      { value: "account_breach", label: "Account breach/hacked email" },
      { value: "ransomware", label: "Device infected with ransomware/malware" },
      { value: "scam_loss", label: "Lost money to scam/phishing" },
      { value: "leak", label: "Data leaked in known company breach" },
      { value: "none", label: "None" },
    ],
    required: false,
  },
  {
    id: "biggest_concern",
    type: "text",
    question: "What's your biggest digital security concern?",
    required: false,
    maxLength: 120,
  },
];

/**
 * Helper to render neon/hacker-styled glowing effects.
 */
function neonBox(style = {}) {
  return {
    background: "rgba(14,14,28,0.64)",
    border: "1.7px solid #00ffff99",
    borderRadius: "12px",
    boxShadow:
      "0 0 24px #00ffff66, 0 0 4.6px #00ff00bb, 0 0 2.2px #ff00ff44",
    ...style,
  };
}

/**
 * Animated pulsing underline used for hacker headings.
 */
function AnimatedAccent({ color = "#00ffff" }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 44,
        height: 6,
        background:
          "linear-gradient(90deg," +
          color +
          " 0%," +
          "#00ff00 90%)",
        borderRadius: 9,
        marginLeft: 10,
        filter: "blur(0.6px)",
        animation: "accentpulse 1.8s cubic-bezier(0.5,0.7,0.5,1) infinite alternate",
        verticalAlign: "middle",
      }}
    />
  );
}

/**
 * Neon toggle switch
 */
function NeonSwitch({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      type="button"
      style={{
        width: 44,
        height: 24,
        padding: 0,
        marginLeft: 10,
        borderRadius: 24,
        background: value
          ? "linear-gradient(90deg,#00ff00,#00ffff)"
          : "rgba(12,28,36,0.6)",
        border: value ? "2.3px solid #00ffff88" : "2.3px solid #444",
        boxShadow: value
          ? "0 0 8px #00ff00, 0 0 13px #00ffff99"
          : "0 0 3px #333",
        cursor: "pointer",
        transition: "0.20s background,border",
        outline: "none",
        position: "relative",
      }}
      aria-label="Toggle Option"
    >
      <span
        style={{
          display: "block",
          width: 20,
          height: 20,
          background: value ? "#00ffb7" : "#303857",
          borderRadius: "50%",
          margin: "2px",
          boxShadow: value
            ? "0 0 10px #00ffffbb,0 0 5px #00ff21"
            : undefined,
          transition: "0.35s all",
          transform: value ? "translateX(20px)" : "translateX(0)",
        }}
      ></span>
    </button>
  );
}

/**
 * Main Risk Assessment Page
 * Clerk-protected route; use as element in /assessment route.
 */
// PUBLIC_INTERFACE
function RiskAssessmentPage() {
  // Form state for answers.
  const [answers, setAnswers] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle dynamic input change
  function handleChange(q, value) {
    // Multi choice: store array, auto handle "none"
    if (q.type === "multi") {
      let arr = Array.isArray(answers[q.id]) ? answers[q.id].slice() : [];
      if (arr.includes(value)) {
        arr = arr.filter((v) => v !== value);
      } else {
        // If "none" chosen, unselect all others
        if (value === "none") arr = ["none"];
        else arr = arr.filter((v) => v !== "none").concat(value);
      }
      setAnswers({ ...answers, [q.id]: arr });
    } else {
      setAnswers({ ...answers, [q.id]: value });
    }
  }

  // Validate for required fields (call on submit)
  function validate() {
    for (const q of riskQuestions) {
      if (q.required) {
        const val = answers[q.id];
        if (
          val === undefined ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        ) {
          setErrorMsg(
            "Please answer all required questions: " + q.question
          );
          return false;
        }
      }
    }
    setErrorMsg("");
    return true;
  }

  // Submit (ready for API connection)
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitLoading(true);

    // Simulate async, swap with API integration later
    setTimeout(() => {
      setSubmitLoading(false);
      setSubmitDone(true);
      // Processed: Could POST answers here
    }, 1200);
  }

  // UX: Reset form (for demo)
  function handleReset() {
    setAnswers({});
    setSubmitDone(false);
    setErrorMsg("");
  }

  // Render question by type
  function renderQuestion(q, idx) {
    const value = answers[q.id];
    return (
      <div
        key={q.id}
        style={{
          ...neonBox({
            marginBottom: "30px",
            padding: "23px 26px 12px 26px",
            boxShadow:
              "0 0 20px #00ffffcc,0 0 4px #00ffb7, 0 0 3px #000,0 0 2px #00ff99",
            animation: "fadeup 1.4s cubic-bezier(0.37,0.81,0.59,1.09) 1",
          }),
          position: "relative",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.17rem",
            color: "#00ffff",
            textShadow: "0 0 12px #00ffea",
          }}
        >
          <span>
            Q{idx + 1}. {q.question}
          </span>
          {q.required && (
            <span style={{ color: "#ff00ff", marginLeft: 6 }}>*</span>
          )}
        </div>
        <div style={{ marginTop: 13, marginBottom: 5 }}>
          {q.type === "single" &&
            q.choices.map((ch) => (
              <label
                key={ch.value}
                style={{
                  marginRight: 19,
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "1.02rem",
                  color:
                    value === ch.value ? "#00ff00" : "rgba(235,255,255,0.85)",
                  textShadow:
                    value === ch.value
                      ? "0 0 6px #00ff62, 0 0 1px #212"
                      : "0 0 4px #008",
                  fontWeight: value === ch.value ? 700 : 500,
                  padding: "7px 0",
                  transition: "color 0.12s",
                }}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={ch.value}
                  checked={value === ch.value}
                  onChange={() => handleChange(q, ch.value)}
                  style={{
                    accentColor: "#00ffff",
                    marginRight: 8,
                    width: 18,
                    height: 18,
                    outline: value === ch.value ? "2px solid #00ff00" : undefined,
                    filter:
                      value === ch.value
                        ? "drop-shadow(0 0 7px #00ff00) brightness(1.23)"
                        : undefined,
                  }}
                />
                {ch.label}
              </label>
            ))}
          {q.type === "multi" &&
            q.choices.map((ch) => (
              <label
                key={ch.value}
                style={{
                  marginRight: 20,
                  fontSize: "1.02rem",
                  color:
                    value && value.includes(ch.value)
                      ? "#00ff00"
                      : "rgba(220,255,255,0.8)",
                  textShadow:
                    value && value.includes(ch.value)
                      ? "0 0 6px #00ff62,0 0 2px #000"
                      : "0 0 4px #00339999",
                  fontWeight:
                    value && value.includes(ch.value) ? 700 : 500,
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "color 0.13s",
                }}
              >
                <input
                  type="checkbox"
                  name={q.id}
                  value={ch.value}
                  checked={value?.includes(ch.value)}
                  onChange={() => handleChange(q, ch.value)}
                  style={{
                    accentColor: "#ff00ff",
                    marginRight: 8,
                    width: 18,
                    height: 18,
                  }}
                />
                {ch.label}
              </label>
            ))}
          {q.type === "number" && (
            <input
              type="number"
              name={q.id}
              value={value === undefined ? "" : value}
              min={q.min ?? 1}
              max={q.max ?? 999}
              onChange={(e) => handleChange(q, e.target.value)}
              placeholder={"Enter a number"}
              style={{
                marginTop: 3,
                padding: "8px 14px",
                fontSize: "1.08rem",
                borderRadius: "4px",
                border: "1.2px solid #00ffff77",
                color: "#fff",
                background: "#031a1c",
                minWidth: 78,
                boxShadow: "0 0 5px #00ffef77",
                outline: "none",
              }}
              required={q.required}
            />
          )}
          {q.type === "text" && (
            <textarea
              name={q.id}
              value={value ?? ""}
              onChange={(e) => handleChange(q, e.target.value)}
              maxLength={q.maxLength ?? 180}
              placeholder="Type here…"
              style={{
                width: "94%",
                minHeight: 42,
                fontSize: "1.11rem",
                color: "#adfdff",
                background: "#171b24",
                border: "1.2px solid #00ffff62",
                borderRadius: "5px",
                boxShadow: "0 0 4px #00fffb22",
                padding: "7px 10px",
                outline: "none",
                marginTop: 4,
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // Show intro animation effect using hacker/neon styles
  return (
    <div
      className="container"
      style={{
        marginTop: 88,
        marginBottom: 25,
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 39,
          animation: "fadeup 1.5s cubic-bezier(0.3,0.7,0.59,1.08) 1",
        }}
      >
        <span
          style={{
            color: "#00ff00",
            letterSpacing: 1.3,
            fontWeight: 700,
            fontSize: "1.19rem",
            textShadow: "0 0 13px #00ff8e, 0 0 16px #00ffea88",
            textTransform: "uppercase",
          }}
        >
          Cybersecurity Risk Assessment
        </span>
        <AnimatedAccent color="#00ff00" />
        <div
          style={{
            fontSize: "2.55rem",
            fontWeight: 800,
            marginTop: 6,
            color: "#00ffff",
            textShadow: "0 0 30px #00ffff, 0 0 21px #00ffb366,0 0 2px #00ffb3",
          }}
        >
          <span>
            <span
              style={{
                color: "#00ffff",
                textShadow: "0 0 30px #00ffff",
              }}
            >
              Digital Safety Checkup
            </span>
            <span
              style={{
                color: "#ff00ff",
                marginLeft: 6,
                textShadow: "0 0 26px #ff00ff,0 0 8px #122",
                fontWeight: 700,
              }}
            >
              <span
                className="blinking-pipe"
                style={{
                  color: "#00ff00",
                  marginLeft: 2,
                  fontSize: "1.08em",
                }}
              >
                |
              </span>
            </span>
          </span>
        </div>
        <div
          style={{
            fontSize: "1.08rem",
            marginTop: 15,
            marginBottom: 11,
            color: "#ccffee",
            maxWidth: 540,
            marginRight: "auto",
            marginLeft: "auto",
            fontWeight: 500,
            textShadow: "0 0 7px #00ffff66",
          }}
        >
          Answer a few real-world questions to check your cyber risk.
          Your answers remain private—used only for this risk analysis.
        </div>
      </div>
      {submitDone ? (
        <div
          style={{
            ...neonBox({
              padding: "38px 44px 36px 44px",
              textAlign: "center",
              marginTop: "66px",
              marginBottom: "32px",
              background:
                "linear-gradient(100deg,#011022 71%,#00ffcc0c 110%)",
              boxShadow:
                "0 0 60px #00ffcc44,0 0 21px #00ffcc99,0 0 12px #031",
            }),
          }}
        >
          <div
            style={{
              fontSize: "2.12rem",
              fontWeight: 800,
              color: "#00ff00",
              textShadow: "0 0 22px #00ff62,0 0 10px #124,0 0 30px #00ffea88",
              marginBottom: 8,
            }}
          >
            ✅ Assessment Complete!
          </div>
          <div
            style={{
              fontSize: "1.13rem",
              color: "#b1fff7",
              marginBottom: 18,
              textShadow: "0 0 9px #00ffff77",
            }}
          >
            Thank you for confirming your digital safety habits.<br />
            <span style={{ color: "#ff00ff" }}>
              Your risk score and actionable tips will be available soon
              in your dashboard.
            </span>
          </div>
          <button
            className="btn btn-large"
            style={{
              background:
                "linear-gradient(90deg,#00ff00 0%,#00ffff 96%)",
              color: "#021b05",
              fontWeight: 700,
              fontSize: "1.09rem",
              boxShadow: "0 0 10px #00ff8c,0 0 2px #282",
              borderRadius: "6px",
              marginTop: "7px",
              cursor: "pointer",
            }}
            onClick={handleReset}
          >
            Run Again
          </button>
        </div>
      ) : (
        <form
          autoComplete="off"
          style={{
            ...neonBox({
              padding: "36px 36px 5.5px 36px",
              background:
                "linear-gradient(99deg,#02151d 71%,#00f0cc0c 110%)",
              boxShadow:
                "0 0 42px #00ffff55,0 0 15px #131",
            }),
            marginBottom: "38px",
          }}
          onSubmit={handleSubmit}
        >
          {riskQuestions.map((q, idx) => renderQuestion(q, idx))}
          {errorMsg && (
            <div
              style={{
                color: "#ff002e",
                fontWeight: 700,
                fontSize: "1.15rem",
                margin: "20px 0 0 0",
                textShadow: "0 0 10px #ff0051,0 0 5px #451",
              }}
              role="alert"
            >
              {errorMsg}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 28, marginBottom: 15 }}>
            <button
              className="btn btn-large"
              type="submit"
              style={{
                background:
                  "linear-gradient(90deg,#00ff00 0%,#00ffff 98%)",
                color: "#021b05",
                fontWeight: 700,
                fontSize: "1.11rem",
                boxShadow: "0 0 16px #00ff8c,0 0 2px #282",
                borderRadius: "7px",
                cursor: "pointer",
                minWidth: "172px",
                outline: "none",
                opacity: submitLoading ? 0.5 : 1,
                pointerEvents: submitLoading ? "none" : undefined,
                position: "relative",
              }}
              disabled={submitLoading}
            >
              {submitLoading ? (
                <span>
                  <span
                    className="blinking-pipe"
                    style={{
                      color: "#00ffff",
                      marginRight: 8,
                      fontSize: "1.06em",
                    }}
                  >
                    ▬
                  </span>
                  Submitting...
                </span>
              ) : (
                <>Run Assessment &rarr;</>
              )}
            </button>
          </div>
        </form>
      )}
      {/* Animated accent bar for visual style */}
      <style>{`
        @keyframes accentpulse {
          0% { box-shadow: 0 0 14px #00ffdd66,0 0 2px #00ff00,0 0 2px #00ffffaa;}
          70% { box-shadow: 0 0 36px #00ffffdd,0 0 10px #00ff00,0 0 16px #ff00ff66;}
          100% { box-shadow: 0 0 14px #ff00ffcc,0 0 24px #00ffff,0 0 9px #ff00ff;}
        }
      `}</style>
    </div>
  );
}

export default RiskAssessmentPage;
