import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../components";
import { SERVICES, WORKS, STATS, TESTIMONIALS, PROCESS } from "../globals";
import { Helmet } from "react-helmet-async";
import { WEBSITE_SCHEMA, jsonLdScript } from "../seo";
import { Database, MonitorCog, Calculator, LayoutDashboard, FolderKanban, Workflow } from "lucide-react";

/* ── HERO ── */
function Hero() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(Math.max(window.scrollY / 520, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#FFFFFF" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${1 - progress * 0.09})`,
          borderRadius: `${progress * 32}px`,
          overflow: "hidden",
          boxShadow: progress > 0.02 ? `0 ${20 + progress * 40}px ${60 + progress * 60}px rgba(20,18,16,${0.1 + progress * 0.18})` : "none",
          willChange: "transform, border-radius, box-shadow",
        }}
      >
        <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="https://res.cloudinary.com/dpejpwl80/video/upload/v1779949283/download_x2fnji.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

/* soft shadow strip that sits in the white area right below the hero — never touches the video itself */
function HeroSeam() {
  return (
    <div style={{ height: 48, background: "linear-gradient(to bottom, rgba(20,18,16,.10), rgba(20,18,16,0))", pointerEvents: "none" }} />
  );
}

/* ── ANIMATED HEADLINE (scroll-triggered, word by word) ── */
function AnimatedHeadline() {
  const [ref, v] = useInView(0.4);
  const words = [
    { text: "WE", accent: false },
    { text: "BUILD", accent: false },
    { text: "Brands", accent: true },
    { text: "THAT", accent: false },
    { text: "WIN", accent: false },
    { text: "ONLINE.", accent: false },
  ];
  return (
    <section ref={ref} style={{ background: "#FFFFFF", paddingTop: "clamp(20px,3vw,40px)", paddingBottom: "clamp(36px,5vw,64px)", paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(44px,7.5vw,100px)", fontWeight: 800, color: "#141210", lineHeight: 1.02, letterSpacing: "-3px", textTransform: "uppercase", display: "flex", flexWrap: "wrap", gap: "0 22px" }}>
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: w.accent ? "#C1502E" : "#141210",
                fontStyle: w.accent ? "italic" : "normal",
                textTransform: w.accent ? "none" : "uppercase",
                letterSpacing: w.accent ? "-2px" : "-3px",
                opacity: v ? 1 : 0,
                transform: v ? "none" : "translateY(28px)",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${i * 0.5}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.5}s`,
              }}
            >
              {w.text}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function ServicesPreview() {
  const [ref, v] = useInView();
  return (
    <section style={{ background: "#fff", padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#141210", letterSpacing: "-1px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            Complete Creative Solutions.
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 500, margin: "16px auto 0", lineHeight: 1.8, opacity: v ? 1 : 0, transition: "all .7s .2s" }}>
            From brand identity to full-stack web apps — we handle everything so you can focus on your business.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {SERVICES.slice(0, 3).map((s, i) => (
            <div key={i} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(30px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s`, background: "#fff", border: "1px solid #E4E3DD", borderRadius: 12, overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(17,17,17,.12)"; e.currentTarget.style.transform = "translateY(-8px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ height: 200, overflow: "hidden", background: "#F0EFEA" }}>
                <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ padding: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#141210", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <Link to="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#141210", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C1502E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#141210"; e.currentTarget.style.transform = "none"; }}
          >View All Our Services →</Link>
        </div>
      </div>
    </section>
  );
}

/* ── CUSTOM TOOLS ── */
const TOOL_ICONS = [Database, MonitorCog, Calculator, LayoutDashboard, FolderKanban, Workflow];

function CustomToolsSection() {
  const [ref, v] = useInView();
  const tool = SERVICES.find((s) => s.icon === "tools");

  return (
    <section style={{ background: "#141210", padding: "110px clamp(20px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      {/* glow blobs */}
      <div style={{ position: "absolute", top: "-10%", left: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,80,46,.16) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "0%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,80,46,.12) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} className="cw-grid-2" style={{ gap: "clamp(48px,6vw,100px)", alignItems: "center", marginBottom: 72 }}>
          {/* LEFT: copy */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-20px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
              Got A Spreadsheet<br />Running <span style={{ color: "#C1502E" }}>Your Business?</span>
            </h2>
            <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.9, marginBottom: 8 }}>
              {tool?.about}
            </p>
          </div>

          {/* RIGHT: mini transformation visual — messy sheet → clean dashboard */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateX(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
              background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20, padding: "36px 24px",
            }}>
              {/* messy sheet */}
              <div style={{ flex: 1, maxWidth: 150 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} style={{
                      height: 22, borderRadius: 3,
                      background: [2, 5, 7].includes(i) ? "rgba(239,68,68,.25)" : "rgba(255,255,255,.07)",
                      border: [2, 5, 7].includes(i) ? "1px solid rgba(239,68,68,.5)" : "1px solid rgba(255,255,255,.06)",
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 10, color: "#6B7280", textAlign: "center", marginTop: 10, letterSpacing: "0.06em" }}>MESSY DATA</p>
              </div>

              {/* animated arrow / flow */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%", background: "#C1502E",
                    animation: `toolsFlowDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>

              {/* clean dashboard */}
              <div style={{ flex: 1, maxWidth: 150 }}>
                <div style={{ background: "rgba(34,197,94,.06)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 30, marginBottom: 8 }}>
                    {[40, 65, 50, 85, 60].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: "#C1502E", borderRadius: 2, opacity: 0.85 }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#22C55E", letterSpacing: "0.04em" }}>SYNCED</span>
                  </div>
                </div>
                <p style={{ fontSize: 10, color: "#6B7280", textAlign: "center", marginTop: 10, letterSpacing: "0.06em" }}>AUTOMATED</p>
              </div>
            </div>
          </div>
        </div>

        {/* feature cards — even grid, icon-led */}
        <div className="cw-grid-3" style={{ gap: 16 }}>
          {(tool?.features || []).map((f, i) => {
            const Icon = TOOL_ICONS[i % TOOL_ICONS.length];
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 14,
                  padding: "26px 22px",
                  opacity: v ? 1 : 0,
                  transform: v ? "none" : "translateY(24px)",
                  transition: `all .6s cubic-bezier(.16,1,.3,1) ${0.15 + i * 0.06}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(193,80,46,.5)";
                  e.currentTarget.style.background = "rgba(193,80,46,.05)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(193,80,46,.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,.03)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(193,80,46,.12)", border: "1px solid rgba(193,80,46,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                }}>
                  <Icon size={19} color="#C1502E" strokeWidth={2} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{f}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes toolsFlowDot {
          0%, 100% { opacity: .25; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(3px); }
        }
      `}</style>
    </section>
  );
}

/* ── TOOLS SCREENSHOTS SLIDER ── */
const TOOL_SCREENSHOTS = [
  { image: "/tool-data-automation.png" },
  { image: "/tool-desktop-automation.png" },
  { image: "/tool-calculator.png" },
  { image: "/tool-bi-dashboard.png" },
];

function ToolsScreenshotsSlider() {
  const [ref, v] = useInView();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);
  const hoveredRef = useRef(false);
  const total = TOOL_SCREENSHOTS.length;

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!hoveredRef.current) setIndex((i) => (i + 1) % total);
    }, 4200);
    return () => clearInterval(t);
  }, [total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  // Shortest signed distance from `index` in circular space, so wraparound also animates smoothly.
  const getDiff = (i) => {
    let d = i - index;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const CARD_W = 560;
  const CARD_H = 380;
  const SPACING = 330;

  return (
    <section style={{ background: "#F7F7F5", padding: "0 0 110px" }}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)", opacity: v ? 1 : 0, transition: "opacity .7s ease" }}
      >
        {/* Soft ambient glow behind the active slide — faint, centered, blended */}
        <div style={{
          position: "absolute",
          inset: "8% 20%",
          zIndex: 0,
          borderRadius: 24,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(193,80,46,.09) 0%, rgba(193,80,46,0) 72%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        {/* Coverflow stage */}
        <div style={{ position: "relative", zIndex: 1, height: CARD_H, overflow: "hidden" }}>
          {TOOL_SCREENSHOTS.map((s, i) => {
            const diff = getDiff(i);
            const absDiff = Math.abs(diff);
            if (absDiff > 2) return null;
            if (isMobile && absDiff !== 0) return null;

            const isCenter = diff === 0;
            const scale = isCenter ? 1 : absDiff === 1 ? 0.78 : 0.62;
            const opacity = isCenter ? 1 : absDiff === 1 ? 0.55 : 0;
            const blur = isCenter ? 0 : absDiff === 1 ? 2 : 5;
            const translateX = isMobile ? 0 : diff * SPACING;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #E4E3DD",
                  background: "#fff",
                  boxShadow: isCenter ? "0 20px 60px rgba(20,18,16,.18)" : "none",
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: isCenter ? 3 : absDiff === 1 ? 2 : 1,
                  pointerEvents: isCenter ? "auto" : "none",
                  transition: "transform .45s cubic-bezier(.4,0,.2,1), opacity .45s ease, filter .45s ease",
                }}
              >
                {s.image ? (
                  <img src={s.image} alt="Custom tool screenshot" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "repeating-linear-gradient(135deg, #F0EFEA, #F0EFEA 10px, #E9E8E2 10px, #E9E8E2 20px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>Screenshot Coming Soon</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 5, width: 44, height: 44, borderRadius: "50%", border: "none", background: "#141210", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .25s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#C1502E"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#141210"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next screenshot"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 5, width: 44, height: 44, borderRadius: "50%", border: "none", background: "#141210", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .25s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#C1502E"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#141210"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24, position: "relative", zIndex: 5 }}>
          {TOOL_SCREENSHOTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 4, border: "none", background: i === index ? "#C1502E" : "#DEDEDE", cursor: "pointer", transition: "all .3s ease", padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
function ProcessSection() {
  const [ref, v] = useInView();
  return (
    <section style={{ background: "#141210", padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref} className="cw-grid-2" style={{ gap: "clamp(48px,6vw,100px)", alignItems: "center", marginBottom: 80 }}>
          <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-20px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>
              How We Work.<br /><span style={{ color: "#C1502E" }}>Every Single Time.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.9, marginBottom: 32 }}>
              Our 6-phase process has been refined across 50+ projects. No guesswork, no surprises — just reliable delivery, every time.
            </p>
            <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C1502E", color: "#fff", padding: "13px 28px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#9B3D22"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C1502E"; e.currentTarget.style.transform = "none"; }}
            >Our Process →</Link>
          </div>
          <div className="cw-grid-2" style={{ gap: 16, opacity: v ? 1 : 0, transform: v ? "none" : "translateX(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .1s" }}>
            {PROCESS.slice(0, 4).map((p, i) => (
              <div key={i} style={{ background: "#1A1A1A", borderRadius: 12, padding: "24px 20px", border: "1px solid #1F2937", transition: "all .3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(193,80,46,.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1F2937"; e.currentTarget.style.transform = "none"; }}
              >
                <h4 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10, letterSpacing: "-0.5px" }}>{p.title}</h4>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WHY US ── */
function WhyUs() {
  const [ref, v] = useInView();
  const cards = [
    { icon: "/icons/paint palette.png", bg: "#FFF0EB", color: "#C1502E", title: "Premium Design", desc: "Hand-crafted, pixel-perfect designs that convert visitors into paying customers every time." },
    { icon: "/icons/rocket speed.png", bg: "#FFFBEB", color: "#F59E0B", title: "Fast Delivery", desc: "Most projects delivered in 7–21 days. Fast without ever compromising on quality." },
    { icon: "/icons/code brackets.png", bg: "#EFF6FF", color: "#3B82F6", title: "Clean Code", desc: "No page builders. Pure hand-coded React — fast, scalable, and SEO-ready from day one." },
    { icon: "/icons/layers stack.png", bg: "#F0FDF4", color: "#22C55E", title: "Full Service", desc: "Design, dev, branding, SEO, social — everything under one roof, one vision, zero chaos." },
    { icon: "/icons/target goal.png", bg: "#FDF4FF", color: "#A855F7", title: "Results Driven", desc: "Every decision tied to business growth. We measure success in leads, sales, and revenue." },
    { icon: "/icons/handshake.png", bg: "#FFF1F2", color: "#F43F5E", title: "True Partner", desc: "Available on WhatsApp, proactive, invested in your success long after launch day." },
    { icon: "", bg: "#FFF7ED", color: "#C1502E", title: "Custom Tools & Automation", desc: "Beyond web and marketing — we build custom software and automation tools that simplify how your business runs." },
  ]
  return (
    <section style={{ background: "#fff", padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 72, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1)" }}>
          <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#141210", letterSpacing: "-1px", marginBottom: 16 }}>
            One Agency. Everything You Need.
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            Stop juggling multiple vendors. We handle design, development, branding, and marketing — under one roof.
          </p>
        </div>
        <div className="cw-grid-3" style={{ gap: 24 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ padding: "36px 32px", borderRadius: 16, border: "1px solid #E4E3DD", background: "#fff", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * 0.07}s` }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(17,17,17,.1)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "transparent"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#E4E3DD"; }}
            >
              <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {card.icon ? (
                  <img src={card.icon} alt={card.title} style={{ width: 42, height: 42, objectFit: "contain" }} />
                ) : (
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: card.bg, border: `1.5px solid ${card.color}33` }} />
                )}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#141210", marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.8 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#141210", color: "#fff", padding: "14px 28px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C1502E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#141210"; e.currentTarget.style.transform = "none"; }}
          >Learn About Us →</Link>
        </div>
      </div>
    </section>
  );
}

/* ── WORK PREVIEW ── */
function WorkPreview() {
  const [ref, v] = useInView();
  return (
    <section style={{ background: "#F7F7F5", padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#141210", letterSpacing: "-1px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            Projects That Made Impact.
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 480, margin: "16px auto 0", lineHeight: 1.8, opacity: v ? 1 : 0, transition: "all .7s .2s" }}>
            Real clients, real results. Here's a glimpse of what we've built.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {WORKS.slice(0, 3).map((w, i) => (
            <div key={i} style={{ borderRadius: 14, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(30px)", transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s, transform .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s, box-shadow .3s` }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 24px 60px rgba(20,18,16,.16)"; e.currentTarget.querySelector("img").style.transform = "scale(1.06)"; e.currentTarget.querySelector(".overlay").style.opacity = "1"; e.currentTarget.querySelector(".overlay").style.transform = "translateY(0)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "0"; e.currentTarget.querySelector(".overlay").style.transform = "translateY(20px)"; }}
            >
              <div style={{ position: "relative", height: 380, borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#141210", border: "1px solid #E4E3DD" }}>
                <img src={w.image} alt={w.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, transition: "transform .5s cubic-bezier(.16,1,.3,1)" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.82)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 36, textAlign: "center", opacity: 0, transform: "translateY(20px)", transition: "all .4s cubic-bezier(.16,1,.3,1)" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.3px" }}>{w.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.75, marginBottom: 24 }}>{w.desc}</p>
                  <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "#C1502E", padding: "10px 24px", borderRadius: 6, textDecoration: "none" }}>View Project ↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <Link to="/work" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#141210", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C1502E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#141210"; e.currentTarget.style.transform = "none"; }}
          >View All Our Work →</Link>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function AnimatedTestimonials() {
  const [ref, v] = useInView();
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section style={{ background: "#141210", padding: "90px 0", overflow: "hidden" }}>
      <div ref={ref} style={{ textAlign: "center", marginBottom: 60, padding: "0 clamp(20px,5vw,80px)" }}>
        <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-1px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>What Our Clients Say.</h2>
        <p style={{ fontSize: 16, color: "#6B7280", marginTop: 12, opacity: v ? 1 : 0, transition: "all .7s .2s" }}>Don't take our word for it — hear from the businesses we've helped grow.</p>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #141210, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #141210, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 24, width: "max-content", animation: "testimonialScroll 40s linear infinite" }}>
          {doubled.map((t, i) => (
            <div key={i} style={{ width: 360, flexShrink: 0, background: "#1A1A1A", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "32px 28px", transition: "border-color .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(193,80,46,.5)"; e.currentTarget.parentElement.style.animationPlayState = "paused"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.parentElement.style.animationPlayState = "running"; }}
            >
              <div style={{ color: "#C1502E", fontSize: 14, letterSpacing: 3, marginBottom: 18 }}>★★★★★</div>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,.75)", marginBottom: 28, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  {t.photo ? <img src={t.photo} alt={t.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #C1502E, #D98A5E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.initials}</div>}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>{t.author}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes testimonialScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const [ref, v] = useInView();
  return (
    <section style={{ background: "#C1502E", padding: "110px clamp(20px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
      <div ref={ref} className="cw-grid-1auto" style={{ maxWidth: 1320, margin: "0 auto", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
          <h2 style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-1.5px", marginBottom: 18 }}>Ready to build something extraordinary?</h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,.8)", lineHeight: 1.85 }}>Free consultation. No commitment. Let's talk about your project.</p>
        </div>
        <div style={{ opacity: v ? 1 : 0, transition: "opacity .7s .25s" }}>
          <Link to="/contact" className="btn-white" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>Get a Free Quote →</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page-enter">
      <Helmet>
        <title>Clicks&Ads — Digital Marketing Agency & Website Development Company in Mumbai</title>
        <meta name="description" content="Clicks&Ads is a Mumbai-based digital marketing agency and website development company offering web design, SEO, PPC, and branding services." />
        <link rel="canonical" href="https://clicksnads.com/" />
        <script type="application/ld+json">{jsonLdScript(WEBSITE_SCHEMA)}</script>
      </Helmet>
      <Hero />
      <HeroSeam />
      <AnimatedHeadline />
      <ServicesPreview />
      <CustomToolsSection />
      <ToolsScreenshotsSlider />
      <ProcessSection />
      <WhyUs />
      <WorkPreview />
      <AnimatedTestimonials />
      <CTA />
    </div>
  );
}