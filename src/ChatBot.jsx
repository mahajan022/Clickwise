import { useState, useRef, useEffect } from "react";
import { SERVICES, WORKS, FAQS, STATS, PROCESS } from "./globals";

/* ════════════════════════════════════════════════════════
   GEMINI API CONFIG
   ════════════════════════════════════════════════════════ */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/* Drop your own circular avatar image into /public and point this at it.
   If the file isn't there yet, the circle just shows as an empty brand-tinted disc. */
const AVATAR_SRC = "/chatbot-avatar.png";

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
    { role: "user", parts: [{ text: SITE_CONTEXT }] },
    { role: "model", parts: [{ text: "Understood! I'm ready to help visitors with questions about Clicks&ads." }] },
    ...history.map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
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
        { from: "bot", text: "Sorry, something went wrong. Please try again or reach us at anuragg7051@gmail.com." },
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
        @keyframes cwChatIn {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cwPulseRing {
          0% { transform: scale(1); opacity: .55; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes cwDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: .3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .cw-chat-scroll::-webkit-scrollbar { width: 5px; }
        .cw-chat-scroll::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        .cw-chat-input::placeholder { color: #9CA3AF; }
        .cw-chat-input:focus { border-color: var(--accent) !important; }
        .cw-chip:hover { background: var(--accent) !important; color: #fff !important; }
        .cw-pill:hover { box-shadow: 0 14px 38px rgba(20,18,16,.28) !important; transform: translateY(-1px); }

        /* ══ MOBILE: collapse the stretched pill into a simple circle ══ */
        @media (max-width: 640px) {
          .cw-pill {
            width: 56px !important;
            padding: 4px !important;
            justify-content: center !important;
            gap: 0 !important;
          }
          .cw-pill-text,
          .cw-pill-send {
            display: none !important;
          }
        }
      `}</style>

      {/* ══════════ CLOSED STATE: stretched "Ask AI" pill (circle-only on mobile) ══════════ */}
      {!open && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              border: "1.5px solid var(--accent)",
              animation: "cwPulseRing 2.6s cubic-bezier(.4,0,.6,1) infinite",
            }}
          />
          <button
            className="cw-pill"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: 240,
              maxWidth: "calc(100vw - 48px)",
              background: "#fff",
              border: "2px solid var(--accent)",
              borderRadius: 999,
              padding: "6px 6px 6px 6px",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(20,18,16,.2)",
              transition: "all .25s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {/* Empty circular avatar slot — drop your own image at /public/chatbot-avatar.png */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                background: "var(--bg-alt2, #F1ECE5)",
                border: "1px solid var(--border, #E7E1D8)",
              }}
            >
              <img
                src={AVATAR_SRC}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>

            <span className="cw-pill-text" style={{ flex: 1, textAlign: "left", fontSize: 13.5, color: "#9CA3AF", fontWeight: 500 }}>
              Ask AI...
            </span>

            <span
              className="cw-pill-send"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* ══════════ OPEN STATE: full chat panel ══════════ */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 370,
            maxWidth: "calc(100vw - 40px)",
            height: 560,
            maxHeight: "calc(100vh - 100px)",
            background: "#ffffff",
            borderRadius: 22,
            boxShadow: "0 24px 70px rgba(0,0,0,.22)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
            fontFamily: "'Poppins', sans-serif",
            animation: "cwChatIn .25s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Colored header with avatar + close */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--accent-light, #DE7A4C) 0%, var(--accent) 60%, var(--accent-deep, #9A4322) 100%)",
              padding: "20px 20px 16px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(255,255,255,.18)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Empty squircle avatar slot — same image source as the closed pill, different shape */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "rgba(255,255,255,.25)",
                  border: "2px solid rgba(255,255,255,.5)",
                }}
              >
                <img
                  src={AVATAR_SRC}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "-.2px" }}>
                  Clicks&ads Assistant
                </div>
                <div style={{ color: "rgba(255,255,255,.85)", fontSize: 11.5, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
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
              padding: "18px 16px",
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
                  background: m.from === "user" ? "var(--accent)" : "#F5F4F1",
                  color: m.from === "user" ? "#fff" : "#141210",
                  padding: "10px 14px",
                  borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  maxWidth: "82%",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", background: "#F5F4F1", padding: "12px 16px", borderRadius: "14px 14px 14px 4px", display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9CA3AF", animation: `cwDot 1.2s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            )}

            {/* Suggested questions as right-aligned chips */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="cw-chip"
                    onClick={() => sendMessage(q)}
                    style={{
                      background: "var(--bg-alt2, #F1ECE5)",
                      border: "none",
                      borderRadius: 999,
                      padding: "9px 16px",
                      fontSize: 12.5,
                      color: "#141210",
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

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid var(--border, #E7E1D8)",
              padding: "10px 12px",
              gap: 8,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here"
              disabled={loading}
              className="cw-chat-input"
              style={{
                flex: 1,
                background: "#F5F4F1",
                border: "1px solid var(--border, #E7E1D8)",
                borderRadius: 12,
                padding: "11px 14px",
                fontSize: 13.5,
                outline: "none",
                fontFamily: "inherit",
                color: "#141210",
                transition: "border-color .2s",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#9CA3AF",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading ? "default" : "pointer",
                flexShrink: 0,
                opacity: loading ? 0.5 : 1,
                transition: "opacity .2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </form>

          <div style={{ textAlign: "center", fontSize: 10, color: "#B0AEA8", padding: "0 0 12px" }}>
            Powered by Clicks&ads AI
          </div>
        </div>
      )}
    </>
  );
}