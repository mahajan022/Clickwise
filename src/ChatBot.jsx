import { useState, useRef, useEffect } from "react";

/* ════════════════════════════════════════════════════════
   EDIT THIS SECTION — Add/remove your own Q&A pairs here.
   - "keywords": words that trigger this answer (lowercase)
   - "answer": the response shown to the user
   ════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  {
    keywords: ["price", "pricing", "cost", "charge", "fees", "rate"],
    answer:
      "Our pricing depends on the project. A logo starts from ₹8,000, websites start from ₹15,000, and full brand + web packages start from ₹40,000. Contact us for an accurate quote based on your needs!",
  },
  {
    keywords: ["service", "services", "what do you do", "offer"],
    answer:
      "We offer: Website Design & Development, Logo & Brand Identity, Website Redesign, Photography & Content, Social Media Management, Growth & Marketing, MERN Stack Development, AI Solutions & Automation, SEO & AI Search, and Support & Maintenance.",
  },
  {
    keywords: ["time", "long", "duration", "deliver", "timeline"],
    answer:
      "Most websites are delivered in 7–21 days depending on scope. Simple landing pages take 3–5 days, while complex web apps or full brand + web packages take 3–6 weeks.",
  },
  {
    keywords: ["location", "where", "based", "office", "mumbai", "city"],
    answer:
      "We're based in Mumbai, Maharashtra, India — but we work with clients across India and internationally. Everything is managed remotely with clear communication.",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "call", "whatsapp", "number"],
    answer:
      "You can reach us at anuragg7051@gmail.com or call/WhatsApp us at +91 70515 75007. We'd love to hear about your project!",
  },
  {
    keywords: ["support", "maintenance", "after launch", "post launch"],
    answer:
      "Yes! Every project includes a 30-day support window post-launch. We also offer monthly maintenance retainers for ongoing updates, security monitoring, and performance optimization.",
  },
  {
    keywords: ["portfolio", "work", "projects", "examples", "clients"],
    answer:
      "We've delivered 50+ projects for 30+ happy clients — including Enrachna Design Labs, Riya Cargo Pune, Adswirl, and Nityan Exports. Check out our Work page to see them live!",
  },
  {
    keywords: ["website", "web design", "web development", "build a site"],
    answer:
      "We build custom, hand-coded websites using React, Next.js, and modern tech stacks — fast, responsive, SEO-optimized, and built to convert. No bloated templates!",
  },
  {
    keywords: ["logo", "brand", "branding", "identity"],
    answer:
      "We create complete brand identity systems — logo design (multiple concepts), brand guidelines, color palettes, typography, and social media templates that make your business unforgettable.",
  },
  {
    keywords: ["seo", "google", "rank", "search engine"],
    answer:
      "We offer Technical SEO audits, content strategy, keyword research, and AI search optimization — helping you rank on Google and get discovered on AI assistants like ChatGPT.",
  },
  {
    keywords: ["ai", "automation", "chatbot", "artificial intelligence"],
    answer:
      "We build AI-powered chatbots, workflow automation (Make/Zapier), and custom AI integrations to save your business hours of manual work every week.",
  },
  {
    keywords: ["social media", "instagram", "facebook", "marketing"],
    answer:
      "We manage your entire social media presence — content calendars, graphic design, copywriting, community management, and paid ads (Meta/LinkedIn) with monthly reporting.",
  },
  {
    keywords: ["hi", "hello", "hey", "namaste"],
    answer:
      "Hey there! 👋 I'm Clicksnads' assistant. Ask me about our services, pricing, timelines, or how to get in touch!",
  },
  {
    keywords: ["thanks", "thank you", "thx"],
    answer: "You're welcome! Feel free to ask anything else, or reach out at anuragg7051@gmail.com 😊",
  },
];

const DEFAULT_ANSWER =
  "I'm not sure about that one! For detailed info, please reach out directly at anuragg7051@gmail.com or +91 70515 75007, and our team will help you.";

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "What's your pricing?",
  "How long does a project take?",
  "How can I contact you?",
];

function getBotResponse(input) {
  const text = input.toLowerCase();
  for (const item of FAQ_DATA) {
    if (item.keywords.some((kw) => text.includes(kw))) {
      return item.answer;
    }
  }
  return DEFAULT_ANSWER;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm Clicksnads' assistant. Ask me anything about our services, pricing, or process!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed };
    const botMsg = { from: "bot", text: getBotResponse(trimmed) };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating toggle button */}
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
          fontSize: 26,
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(232,71,26,.4)",
          zIndex: 1000,
          transition: "all .3s cubic-bezier(.16,1,.3,1)",
          color: "#fff",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 170,
            right: 30,
            width: 340,
            maxWidth: "calc(100vw - 40px)",
            height: 460,
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
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #F2551F 0%, #E8471A 55%, #C93C12 100%)",
              color: "#fff",
              padding: "16px 20px",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Clicksnads Assistant
            <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>
              Ask about services, pricing & more
            </div>
          </div>

          {/* Messages */}
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
                  boxShadow: m.from === "bot" ? "0 1px 4px rgba(0,0,0,.06)" : "none",
                  border: m.from === "bot" ? "1px solid #E4E3DD" : "none",
                }}
              >
                {m.text}
              </div>
            ))}

            {/* Suggested questions - shown only at start */}
            {messages.length === 1 && (
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

          {/* Input */}
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
              style={{
                background: "#E8471A",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: 16,
                cursor: "pointer",
                flexShrink: 0,
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