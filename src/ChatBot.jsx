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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
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

  // Show a one-time teaser bubble a few seconds after page load,
  // but only if the visitor hasn't already opened or dismissed it.
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("cw-chat-teaser-seen");
    if (alreadySeen) return;
    const timer = setTimeout(() => setTeaserVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const dismissTeaser = () => {
    setTeaserVisible(false);
    sessionStorage.setItem("cw-chat-teaser-seen", "1");
  };

  const openFromTeaser = () => {
    dismissTeaser();
    setOpen(true);
  };

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
        @keyframes cwChatIn {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cwPulseRing {
          0% { transform: scale(1); opacity: .55; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes cwDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: .3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .cw-chat-scroll::-webkit-scrollbar { width: 5px; }
        .cw-chat-scroll::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        .cw-chat-input::placeholder { color: #9CA3AF; }
        .cw-chat-input:focus { border-color: #E8471A !important; }
        .cw-suggest-btn:hover { border-color: #E8471A !important; color: #E8471A !important; background: rgba(232,71,26,.05) !important; }
      `}</style>

      {/* Teaser bubble - text only, no fake profile photos since this is a pure AI assistant */}
      {teaserVisible && !open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 300,
            maxWidth: "calc(100vw - 48px)",
            background: "#ffffff",
            color: "#111111",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 18px 48px rgba(0,0,0,.16)",
            border: "1px solid #EDEBE6",
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif",
            animation: "cwChatIn .3s cubic-bezier(.16,1,.3,1)",
            cursor: "pointer",
          }}
          onClick={openFromTeaser}
        >
          <button
            onClick={(e) => { e.stopPropagation(); dismissTeaser(); }}
            aria-label="Dismiss"
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#fff",
              border: "1.5px solid #E4E3DD",
              color: "#6B7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
              fontSize: 13,
              lineHeight: 1,
              boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            ✕
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <img
                src="/chatbot-icon.png"
                alt="Chat"
                style={{ width: 38, height: 38, objectFit: "contain", borderRadius: "50%" }}
              />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111111" }}>Clicks&ads Assistant</div>
          </div>
          <div style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.65 }}>
            Got a question about our services or pricing? Ask away — I reply instantly.
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Subtle pulsing ring - only show when closed and before the teaser has been dismissed */}
        {!open && teaserVisible && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid #E8471A",
              animation: "cwPulseRing 2.2s cubic-bezier(.4,0,.6,1) infinite",
            }}
          />
        )}

        <button
          onClick={() => {
            setOpen((o) => !o);
            dismissTeaser();
          }}
          aria-label={open ? "Close chat" : "Open chat"}
          style={{
            position: "relative",
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: open ? "#E8471A" : "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: open ? "0 10px 26px rgba(232,71,26,.35)" : "0 8px 22px rgba(0,0,0,.15)",
            transition: "all .25s cubic-bezier(.16,1,.3,1)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Custom chatbot icon — place your image file at: public/chatbot-icon.png */
            <img
              src="/chatbot-icon.png"
              alt="Chat"
              style={{ width: 58, height: 58, objectFit: "contain", borderRadius: "50%" }}
            />
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 360,
            maxWidth: "calc(100vw - 40px)",
            height: 520,
            maxHeight: "calc(100vh - 220px)",
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 24px 70px rgba(0,0,0,.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
            fontFamily: "'Poppins', sans-serif",
            border: "1px solid #E4E3DD",
            animation: "cwChatIn .25s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #E4E3DD",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src="/chatbot-icon.png"
                alt="Chat"
                style={{ width: 44, height: 44, objectFit: "contain", borderRadius: "50%" }}
              />
            </div>
            <div>
              <div style={{ color: "#111111", fontWeight: 700, fontSize: 14, letterSpacing: "-.2px" }}>
                Clicks&ads Assistant
              </div>
              <div style={{ color: "#6B7280", fontSize: 11.5, marginTop: 1, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Online · Replies instantly
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
                  background: m.from === "user" ? "#E8471A" : "#F5F4F1",
                  color: m.from === "user" ? "#fff" : "#111111",
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
                  background: "#F5F4F1",
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
                <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
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
                      border: "1px solid #E4E3DD",
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
              borderTop: "1px solid #E4E3DD",
              padding: 12,
              gap: 8,
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
                background: "#F5F4F1",
                border: "1px solid #E4E3DD",
                borderRadius: 12,
                padding: "11px 14px",
                fontSize: 13.5,
                outline: "none",
                fontFamily: "inherit",
                color: "#111111",
                transition: "border-color .2s",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#E8471A",
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
      )}
    </>
  );
}