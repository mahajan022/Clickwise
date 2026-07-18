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
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey! 👋 I'm the Clicks&ads assistant. Ask me about our services, pricing, portfolio, or process.",
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
        @keyframes noupeSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes noupeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes noupeDot {
          0%, 60%, 100% { opacity: 0.4; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
        
        .noupe-chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .noupe-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .noupe-chat-scroll::-webkit-scrollbar-thumb {
          background: #E0E0E0;
          border-radius: 3px;
        }
        .noupe-chat-scroll::-webkit-scrollbar-thumb:hover {
          background: #D0D0D0;
        }
      `}</style>

      {/* Floating button - Clean circular button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #E91E8C 0%, #D61A7D 100%)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(233, 30, 140, 0.35)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          color: "#fff",
          zIndex: 1000,
          animation: !open ? "noupeFloat 3s ease-in-out infinite" : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 36px rgba(233, 30, 140, 0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(233, 30, 140, 0.35)";
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window - Noupe Style */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(620px, calc(100vh - 140px))",
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 20px 70px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            animation: "noupeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Magenta Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #E91E8C 0%, #D61A7D 100%)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E91E8C, #D61A7D)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  💬
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Clicks&ads
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 12,
                    marginTop: 2,
                    fontWeight: 500,
                  }}
                >
                  Always here to help
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="noupe-chat-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "#FAFAFA",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  display: "flex",
                  flexDirection: m.from === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    background: m.from === "user" ? "#E91E8C" : "#F0F0F0",
                    color: m.from === "user" ? "#fff" : "#1F2937",
                    padding: "11px 16px",
                    borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                    fontWeight: 400,
                    boxShadow: m.from === "user" ? "0 2px 8px rgba(233, 30, 140, 0.2)" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ alignSelf: "flex-start", display: "flex", gap: 6, padding: "10px 0" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#D0D0D0",
                      animation: `noupeDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Quick questions
                </div>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: "left",
                      background: "#F0E6F6",
                      border: "1px solid #E8D4F0",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      fontSize: "13.5px",
                      color: "#4A2A5F",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.25s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#E8D4F0";
                      e.currentTarget.style.borderColor = "#D4B5E6";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F0E6F6";
                      e.currentTarget.style.borderColor = "#E8D4F0";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "16px 18px",
              background: "#FFFFFF",
              borderTop: "1px solid #EFEFEF",
              display: "flex",
              gap: 10,
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 10,
                width: "100%",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: "#F5F5F5",
                  border: "1px solid #EBEBEB",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontSize: "13.5px",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "#1F2937",
                  transition: "all 0.2s",
                  cursor: loading ? "not-allowed" : "text",
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#E91E8C";
                  e.currentTarget.style.background = "#FAFAFA";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#EBEBEB";
                  e.currentTarget.style.background = "#F5F5F5";
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#E91E8C",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: loading ? "default" : "pointer",
                  flexShrink: 0,
                  opacity: loading ? 0.6 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#D61A7D";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#E91E8C";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}