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
      text: "Hi! 👋 I'm Clicksnads' AI assistant. Ask me anything about our services, pricing, portfolio, or process!",
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
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 100,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #F2551F 0%, #E8471A 55%, #C93C12 100%)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(232,71,26,.4)",
          zIndex: 1000,
          transition: "all .3s cubic-bezier(.16,1,.3,1)",
          color: "#fff",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 170,
            right: 30,
            width: 360,
            maxWidth: "calc(100vw - 40px)",
            height: 500,
            maxHeight: "calc(100vh - 220px)",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 20px 60px rgba(0,0,0,.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
            fontFamily: "'Poppins', sans-serif",
            border: "1px solid #E4E3DD",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #F2551F 0%, #E8471A 55%, #C93C12 100%)",
              color: "#fff",
              padding: "16px 20px",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Clicksnads AI Assistant
            <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>
              Powered by AI · Ask me anything
            </div>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: "#FAFAF8",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background: m.from === "user" ? "#E8471A" : "#fff",
                  color: m.from === "user" ? "#fff" : "#111",
                  padding: "10px 14px",
                  borderRadius: 14,
                  maxWidth: "85%",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  boxShadow: m.from === "bot" ? "0 1px 4px rgba(0,0,0,.06)" : "none",
                  border: m.from === "bot" ? "1px solid #E4E3DD" : "none",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "#fff",
                  border: "1px solid #E4E3DD",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 13.5,
                  color: "#999",
                }}
              >
                Typing...
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: "left",
                      background: "#fff",
                      border: "1px solid #E4E3DD",
                      borderRadius: 12,
                      padding: "8px 12px",
                      fontSize: 12.5,
                      color: "#E8471A",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF3EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              borderTop: "1px solid #E4E3DD",
              padding: 10,
              gap: 8,
              background: "#fff",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={loading}
              style={{
                flex: 1,
                border: "1px solid #E4E3DD",
                borderRadius: 999,
                padding: "10px 14px",
                fontSize: 13.5,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#E8471A",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: 16,
                cursor: loading ? "default" : "pointer",
                flexShrink: 0,
                opacity: loading ? 0.6 : 1,
              }}
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}