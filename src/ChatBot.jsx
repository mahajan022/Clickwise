import { useState, useRef, useEffect } from "react";
import { SERVICES, WORKS, FAQS, STATS, PROCESS } from "./globals";

/* ════════════════════════════════════════════════════════
   GEMINI API CONFIG
   ════════════════════════════════════════════════════════ */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/* ════════════════════════════════════════════════════════
   BUILD WEBSITE CONTEXT FROM globals.js DATA
   ════════════════════════════════════════════════════════ */
function buildSiteContext() {
  const servicesText = SERVICES.map(
    (s) =>
      `- ${s.title}: ${s.desc} ${s.about} Features: ${s.features?.join(", ")}`
  ).join("\n");

  const worksText = WORKS.map(
    (w) => `- ${w.title} (${w.cat}, ${w.year}): ${w.desc} URL: ${w.url}`
  ).join("\n");

  const faqsText = FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  const statsText = STATS.map((s) => `${s.v} ${s.l}`).join(", ");

  const processText = PROCESS.map((p) => `${p.num}. ${p.title}: ${p.desc}`).join("\n");

  return `
You are the official AI assistant for Clicks&ads, a creative digital agency based in Mumbai, India.
Answer user questions ONLY using the information below about Clicks&ads. Be friendly, concise, and helpful.
If asked something unrelated to Clicks&ads or not covered here, politely say you don't have that info and suggest contacting via email (anuragg7051@gmail.com) or WhatsApp (+91 70515 75007).

COMPANY STATS:
${statsText}

SERVICES OFFERED:
${servicesText}

OUR PROCESS:
${processText}

PORTFOLIO / RECENT WORK:
${worksText}

FREQUENTLY ASKED QUESTIONS:
${faqsText}

CONTACT INFO:
Email: anuragg7051@gmail.com
Phone/WhatsApp: +91 70515 75007
Location: Mumbai, Maharashtra, India

Keep answers short (2-4 sentences) unless the user asks for more detail.
`.trim();
}

const SITE_CONTEXT = buildSiteContext();

/* ════════════════════════════════════════════════════════
   GEMINI API CALL
   ════════════════════════════════════════════════════════ */
async function askGemini(userMessage, history) {
  const contents = [
    {
      role: "user",
      parts: [{ text: SITE_CONTEXT }],
    },
    {
      role: "model",
      parts: [{ text: "Understood! I'm ready to help visitors with questions about Clicks&ads." }],
    },
    ...history.map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "Sorry, I couldn't generate a response. Please try again or contact us directly.";
}

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "What's your pricing?",
  "Show me your recent work",
  "How can I contact you?",
];

/* ════════════════════════════════════════════════════════
   BRAND TOKENS — unchanged from the existing site
   ════════════════════════════════════════════════════════ */
const INK = "#141210";
const ACCENT = "#C1502E";
const CREAM = "#F3EEE5";
const PANEL_BG = "#ffffff";
const SURFACE = "#F5F4F1";
const BORDER = "#E4E3DD";
const MUTED = "#6B7280";

/* Closed pill size vs. open panel size — the same box morphs between the two */
const PILL_W = 168;
const PILL_H = 58;
const PANEL_W = "min(380px, calc(100vw - 40px))";
const PANEL_H = "min(560px, calc(100vh - 140px))";

export default function ChatBot() {
  const [open, setOpen] = useState(false); // controls both the box size AND which layer is visible
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey! I'm the Clicks&ads assistant. Ask me about our services, pricing, portfolio, or process.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const handleToggle = () => setOpen((o) => !o);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { from: "user", text: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGemini(trimmed, newMessages.slice(1));
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, something went wrong. Please try again or reach us at anuragg7051@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <style>{`
        @keyframes cwPillGlow {
          0% { box-shadow: 0 10px 30px rgba(20,18,16,.35), 0 0 0 0 rgba(193,80,46,.45); }
          70% { box-shadow: 0 10px 30px rgba(20,18,16,.35), 0 0 0 14px rgba(193,80,46,0); }
          100% { box-shadow: 0 10px 30px rgba(20,18,16,.35), 0 0 0 0 rgba(193,80,46,0); }
        }
        @keyframes cwFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cwDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: .3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .cw-chat-scroll::-webkit-scrollbar { width: 5px; }
        .cw-chat-scroll::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        .cw-chat-input::placeholder { color: #9CA3AF; }
        .cw-chat-input:focus { border-color: ${ACCENT} !important; }
        .cw-suggest-btn:hover { border-color: ${ACCENT} !important; color: ${ACCENT} !important; background: rgba(193,80,46,.05) !important; }
        .cw-box { transition: width .38s cubic-bezier(.16,1,.3,1), height .38s cubic-bezier(.16,1,.3,1), border-radius .38s cubic-bezier(.16,1,.3,1); }
      `}</style>

      {/* Single morphing container: pill when closed, full panel when open.
          Background is ALWAYS white — only the small pill layer below is dark,
          and it's pinned to its own fixed footprint (never stretched). */}
      <div
        className="cw-box"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: open ? PANEL_W : PILL_W,
          height: open ? PANEL_H : PILL_H,
          borderRadius: open ? 20 : 29,
          background: PANEL_BG,
          overflow: "hidden",
          zIndex: 1000,
          boxShadow: open
            ? "0 24px 70px rgba(0,0,0,.18)"
            : "0 10px 30px rgba(20,18,16,.35)",
          border: `1px solid ${open ? BORDER : INK}`,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Collapsed pill layer — fixed size, pinned bottom-right, fades out (never stretches) ── */}
        <button
          onClick={handleToggle}
          aria-label="Open chat"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: PILL_W,
            height: PILL_H,
            borderRadius: 29,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 18px 0 6px",
            background: INK,
            border: "none",
            cursor: open ? "default" : "pointer",
            opacity: open ? 0 : 1,
            visibility: open ? "hidden" : "visible",
            pointerEvents: open ? "none" : "auto",
            transition: "opacity .18s ease",
            animation: open ? "none" : "cwPillGlow 2.6s ease-out infinite",
          }}
        >
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              background: SURFACE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Drop your own square/circular avatar image at /public/chatbot-icon.png */}
            <img
              src="/chatbot-icon.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </span>
          <span style={{ color: CREAM, fontWeight: 700, fontSize: 14.5, whiteSpace: "nowrap" }}>
            Ask AI
          </span>
        </button>

        {/* ── Expanded panel layer — fills the box, fades in once it's grown ── */}
        <div
          style={{
            position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              opacity: open ? 1 : 0,
              visibility: open ? "visible" : "hidden",
              pointerEvents: open ? "auto" : "none",
              transition: open
                ? "opacity .25s ease .12s, visibility 0s linear 0s"
                : "opacity .12s ease, visibility 0s linear .12s",
            }}
          >
            {/* Header: color band with avatar overlapping into the white body */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  height: 64,
                  background: ACCENT,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  padding: "12px 14px 0 0",
                }}
              >
                <button
                  onClick={handleToggle}
                  aria-label="Close chat"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 12,
                  padding: "0 20px",
                  marginTop: -32,
                }}
              >
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: SURFACE,
                    border: `3px solid ${PANEL_BG}`,
                    boxShadow: "0 4px 14px rgba(0,0,0,.15)",
                  }}
                >
                  <img
                    src="/chatbot-icon.png"
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </span>
                <div style={{ paddingBottom: 6 }}>
                  <div style={{ color: INK, fontWeight: 700, fontSize: 14, letterSpacing: "-.2px" }}>
                    Clicks&ads Assistant
                  </div>
                  <div style={{ color: MUTED, fontSize: 11.5, marginTop: 1, display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                    Online · Replies instantly
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="cw-chat-scroll"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                    background: m.from === "user" ? ACCENT : SURFACE,
                    color: m.from === "user" ? "#fff" : INK,
                    padding: "10px 14px",
                    borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    maxWidth: "82%",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    border: "none",
                  }}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: SURFACE,
                    border: "none",
                    padding: "12px 16px",
                    borderRadius: "14px 14px 14px 4px",
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#9CA3AF",
                        animation: `cwDot 1.2s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Suggested questions - shown only at start */}
              {messages.length === 1 && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                  <div style={{ color: MUTED, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                    Quick questions
                  </div>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      className="cw-suggest-btn"
                      onClick={() => sendMessage(q)}
                      style={{
                        textAlign: "left",
                        background: "transparent",
                        border: `1px solid ${BORDER}`,
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 13.5,
                        color: "#374151",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                borderTop: `1px solid ${BORDER}`,
                padding: 12,
                gap: 8,
                flexShrink: 0,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Clicks&ads..."
                disabled={loading}
                className="cw-chat-input"
                style={{
                  flex: 1,
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 13.5,
                  outline: "none",
                  fontFamily: "inherit",
                  color: INK,
                  transition: "border-color .2s",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: ACCENT,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: loading ? "default" : "pointer",
                  flexShrink: 0,
                  opacity: loading ? 0.5 : 1,
                  transition: "opacity .2s",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </form>
          </div>
      </div>
    </>
  );
}