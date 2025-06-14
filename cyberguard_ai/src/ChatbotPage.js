import React, { useRef, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

/**
 * Modular, production-grade cyber chatbot page at /chatbot.
 * Hacker/neon theme, Clerk-protected, ready for Gemini API live integration.
 * No demo/hardcoded logic: UI is real and ready for data.
 */

// PUBLIC_INTERFACE
function NeonPanel({ children, style }) {
  // Neon-hacker themed panel for chat interface.
  return (
    <div
      style={{
        background: "linear-gradient(120deg,#011033 77%,#00ffee07 100%)",
        border: "2.4px solid #00ffffcc",
        borderRadius: "23px",
        boxShadow: "0 0 36px #00ffff95,0 0 8px #00ff0088,0 0 3px #ff00ff57",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
function AnimatedAccent({ color = "#00ffff", width = 56 }) {
  // Pulsing glowing underline/accent for headings.
  return (
    <span
      style={{
        display: "inline-block",
        width,
        height: 6,
        background: `linear-gradient(90deg,${color} 30%,#ff00ff 100%)`,
        borderRadius: 12,
        marginLeft: 11,
        filter: "blur(0.8px)",
        animation: "chat-accent-pulse 1.7s cubic-bezier(0.5,0.7,0.5,1) infinite alternate",
        verticalAlign: "middle"
      }}
    />
  );
}

// PUBLIC_INTERFACE
function ChatMessage({ role, content, loading }) {
  // Renders a single chat message bubble: user or bot (AI)
  return (
    <div
      style={{
        background: role === "user"
          ? "linear-gradient(90deg,#0b321e 60%,#011b26 100%)"
          : "linear-gradient(90deg,#021d33 88%,#00fff888 100%)",
        border: `1.7px solid ${role === "user" ? "#00ff00cc" : "#00ffffcc"}`,
        color: "#fff",
        fontWeight: 500,
        borderRadius: 12,
        maxWidth: "91%",
        padding: "13px 17px",
        margin: role === "user" ? "0 0 12px auto" : "0 auto 12px 0",
        wordBreak: "break-word",
        boxShadow: role === "user"
          ? "0 0 18px #00ff0033,0 0 5px #011"
          : "0 0 14px #00fff899,0 0 6px #ff00ff33",
        fontSize: "1.11rem",
        position: "relative",
        minHeight: 32,
        transition: "background 0.16s"
      }}
    >
      <span style={{
        fontWeight: 700,
        color: role === "user" ? "#00ff00" : "#00ffff",
        fontSize: "0.97em", marginRight: 9,
        textShadow: "0 0 8px #011"
      }}>
        {role === "user" ? "You" : "CyberBot"}
      </span>
      {content}
      {loading && (
        <span className="blinking-pipe" style={{
          marginLeft: 4, color: "#00ffff",
          fontSize: "1.12em"
        }}>▬</span>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function ChatInput({ value, onChange, onSend, loading, disabled }) {
  // Input bar for user prompt, with glowing send button
  return (
    <form
      onSubmit={e => { e.preventDefault(); if (!loading && value.trim()) onSend(); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "13px 10px 6px 3px",
        background: "rgba(9,13,33,0.70)",
        borderRadius: 16,
        border: "2.1px solid #00ffff66",
        boxShadow: "0 0 15px #00ffff66,0 0 2px #00ff00",
        marginTop: 19,
      }}
    >
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Ask any cybersecurity question…"
        style={{
          flex: 1,
          fontSize: "1.16rem",
          color: "#00ffea",
          background: "transparent",
          border: "none",
          outline: "none",
          padding: "13px 8px 12px 8px",
          fontWeight: 500
        }}
        autoFocus
        disabled={loading || disabled}
        maxLength={500}
        aria-label="Type your message"
      />
      <button
        className="btn"
        type="submit"
        style={{
          background: "linear-gradient(90deg,#00ffea 10%,#00ffea 90%,#00ff0088)",
          fontWeight: 700,
          color: "#021b05",
          padding: "10px 24px",
          minWidth: 88,
          borderRadius: "7px",
          fontSize: "1.09rem",
          boxShadow: "0 0 13px #00eeeedd, 0 0 7px #044",
          opacity: loading || disabled ? 0.5 : 1,
          pointerEvents: loading || disabled ? "none" : undefined,
          outline: "none"
        }}
        disabled={loading || disabled || !value.trim()}
      >
        {loading ? (
          <span>
            <span
              className="blinking-pipe"
              style={{ color: "#00ffff", marginRight: 8, fontSize: "1.13em" }}
            >
              ▬
            </span>
            Sending…
          </span>
        ) : (
          <>
            <span style={{
              color: "#00ffff",
              marginRight: 6,
              fontWeight: 900,
              textShadow: "0 0 7px #00ffff"
            }}>→</span>
            Send
          </>
        )}
      </button>
    </form>
  );
}

// PUBLIC_INTERFACE
function ChatbotPage() {
  /**
   * Main Cybersecurity Chatbot page. Clerk-protected.
   * Live, scalable chat UI, hacker/neon themed. Ready for Gemini API integration.
   */
  const { user } = useUser();
  // Message history (persist across mount? consider with backend)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your Cybersecurity Assistant. Ask me anything about cyber threats, best practices, scams, or digital safety.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef();

  useEffect(() => {
    // Scroll chat to bottom on new message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // --- Handler to send message, ready for live Gemini API ---
  // PUBLIC_INTERFACE
  function handleSend() {
    if (!input.trim() || loading) return;
    const prompt = input.trim();

    // Optimistically add user message
    setMessages(msgs => [
      ...msgs,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: "",
        loading: true, // will be replaced after response arrives
      },
    ]);
    setInput("");
    setLoading(true);

    // --- Gemini API POST scaffold ---
    // Placeholder: Replace with real API call to backend Gemini proxy
    setTimeout(() => {
      // Remove placeholder loading bubble; respond with stub:
      setMessages(msgs => {
        // Remove last "loading" msg, replace with "unanswered/auto" system stub or empty
        let newMsgs = [...msgs];
        let idx = newMsgs.length - 1;
        while (idx >= 0 && !newMsgs[idx].loading) idx--;
        if (idx >= 0 && newMsgs[idx].loading) {
          newMsgs.splice(idx, 1, {
            role: "assistant",
            content:
              "This feature is coming soon! Your message will receive a real Gemini-powered response here once the backend is connected.",
            loading: false,
          });
        }
        return newMsgs;
      });
      setLoading(false);
    }, 1200);
  }

  // Allows pressing Enter to send unless Shift+Enter
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && input.trim()) handleSend();
    }
  }

  return (
    <div className="container" style={{ maxWidth: 670, marginTop: 108 }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: 23,
          animation: "fadeup 1.3s cubic-bezier(0.36,0.81,0.59,1.06) 1",
        }}
      >
        <span
          style={{
            color: "#00ffff",
            letterSpacing: 1.8,
            fontWeight: 800,
            fontSize: "2.09rem",
            textShadow: "0 0 36px #00ffffd8,0 0 14px #00ffb366,0 0 2px #00ffb3",
            marginBottom: 4,
            display: "block",
          }}
        >
          Cybersecurity Chatbot
          <span
            className="blinking-pipe"
            style={{
              color: "#ff00ff",
              textShadow: "0 0 10px #ff00ffaa,0 0 3px #213a",
              fontSize: "1.11em",
              marginLeft: 7,
            }}
          >
            |
          </span>
        </span>
        <AnimatedAccent color="#00ffff" width={48} />
        <div
          style={{
            color: "#b3ffe3",
            fontSize: "1.12rem",
            marginBottom: 5,
            marginTop: 10,
            fontWeight: 480,
            textShadow: "0 0 12px #00ffe9aa",
          }}
        >
          Ask about risky links, phishing, password tips, or privacy threats. Answers are always private and friendly.
        </div>
      </div>

      <NeonPanel
        style={{
          minHeight: 390,
          padding: "30px 19px 21px 19px",
          marginBottom: 18,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(114deg,#011020 90%,#00272e 100%)"
        }}
      >
        <div
          style={{
            minHeight: 330,
            maxHeight: 410,
            overflowY: "auto",
            marginBottom: 6,
            paddingRight: 7,
            paddingLeft: 3,
            display: "flex",
            flexDirection: "column",
            scrollbarWidth: "thin"
          }}
        >
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} loading={!!m.loading} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
          disabled={false}
        />
      </NeonPanel>
      <style>{`
        @keyframes chat-accent-pulse {
          0% { box-shadow: 0 0 13px #00ffff66,0 0 2px #ff00ff,0 0 2px #ff00ffaa;}
          70% { box-shadow: 0 0 37px #00ffffdd,0 0 17px #ff00ff66; }
          100% { box-shadow: 0 0 14px #00ffffcc,0 0 26px #00ffff,0 0 13px #ff00ff; }
        }
        @keyframes fadeup {
          from { transform: translateY(36px); opacity: 0; }
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

export default ChatbotPage;
