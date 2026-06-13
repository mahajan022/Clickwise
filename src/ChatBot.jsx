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
You are the official AI assistant for Clicksnads, a creative digital agency based in Mumbai, India.
Answer user questions ONLY using the information below about Clicksnads. Be friendly, concise, and helpful.
If asked something unrelated to Clicksnads or not covered here, politely say you don't have that info and suggest contacting via email (anuragg7051@gmail.com) or WhatsApp (+91 70515 75007).

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
      parts: [{ text: "Understood! I'm ready to help visitors with questions about Clicksnads." }],
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
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey! I'm the Clicksnads assistant. Ask me about our services, pricing, portfolio, or process.",
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

      {/* Floating toggle button - bot avatar style */}
      <div
        style={{
          position: "fixed",
          bottom: 100,
          right: 30,
          width: 72,
          height: 72,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pulsing attention rings - only show when closed */}
        {!open && (
          <>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid #E8471A",
                animation: "cwPulseRing 2.2s cubic-bezier(.4,0,.6,1) infinite",
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid #E8471A",
                animation: "cwPulseRing 2.2s cubic-bezier(.4,0,.6,1) infinite 1.1s",
              }}
            />
          </>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open chat"
          style={{
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#ffffff",
            border: "1px solid #E4E3DD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 28px rgba(0,0,0,.18)",
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Custom chatbot icon image - place your image in /public folder */
            <img
              src="/chatbot-icon.png"
              alt="Chat"
              style={{ width: 44, height: 44, objectFit: "contain", borderRadius: "50%" }}
            />
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 168,
            right: 30,
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
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src="/chatbot-icon.png"
                alt="Chat"
                style={{ width: 40, height: 40, objectFit: "contain", borderRadius: "50%" }}
              />
            </div>
            <div>
              <div style={{ color: "#111111", fontWeight: 700, fontSize: 14, letterSpacing: "-.2px" }}>
                Clicksnads Assistant
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
              placeholder="Message Clicksnads..."
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