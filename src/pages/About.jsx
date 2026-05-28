import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView, PageBanner } from "../components";
import { STATS } from "../globals";

/* ─── TILT HOOK ─── */
function useTilt() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.03)`;
  };
  const onMouseLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  };
  return { ref, onMouseMove, onMouseLeave };
}

/* ─── ANIMATED COUNTER ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!triggered) return;
    const num = parseInt(target); let start = 0;
    const step = Math.max(1, Math.ceil(num / 60));
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(t); } else setCount(start);
    }, 20);
    return () => clearInterval(t);
  }, [triggered, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── TILT IMAGE CARD ─── */
function TiltImageCard({ src = "", ratio = "4/3", label = "Your 3D image" }) {
  const tilt = useTilt();
  return (
    <div
      style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(17,17,17,0.10)", transition: "transform 0.15s ease, box-shadow 0.15s ease", transformStyle: "preserve-3d", willChange: "transform" }}
      {...tilt}
      onMouseLeave={(e) => { tilt.onMouseLeave(e); e.currentTarget.style.boxShadow = "0 24px 64px rgba(17,17,17,0.10)"; }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 40px 80px rgba(17,17,17,0.18)"; }}
    >
      <div style={{ width: "100%", aspectRatio: ratio, background: src ? "transparent" : "#F0EEE9", border: src ? "none" : "2px dashed #D4CFC6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {src
          ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ textAlign: "center", userSelect: "none" }}>
              <div style={{ fontSize: 28, opacity: 0.2, marginBottom: 8 }}>⊕</div>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#C0BAB0", letterSpacing: "0.14em", textTransform: "uppercase" }}>{label}</p>
            </div>
        }
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE CARDS DATA
═══════════════════════════════════════════ */
const SERVICE_CARDS = [
  { label: "Ad Shoots", sub: "Photography & Video", icon: "ti-camera", color: "#FFF5F2", accent: "#E8471A", span: 2, img: "/adShoot.png" },
  { label: "Social Media Management", sub: "Content & Community", icon: "ti-brand-instagram", color: "#F7F7F5", accent: "#111111", span: 1, img: "/socialMedia.png" },
  { label: "Web Development", sub: "React & Custom Code", icon: "ti-code", color: "#EEF2FF", accent: "#4F46E5", span: 1, img: "/webDev.png" },
  { label: "Meta Ads", sub: "Paid Social & Campaigns", icon: "ti-brand-meta", color: "#FFF5F2", accent: "#E8471A", span: 1, img: "/metaAds.png" },
  { label: "Content Strategy", sub: "Planning & Creation", icon: "ti-pencil", color: "#F7F7F5", accent: "#111111", span: 1, img: "/growthStrategy.png" },
  { label: "Growth Dashboards", sub: "Analytics & Reporting", icon: "ti-chart-line", color: "#F0FBF4", accent: "#16A34A", span: 2, img: "/growth.png" },
  { label: "Web Redesign", sub: "Conversion Focused", icon: "ti-layout", color: "#F7F7F5", accent: "#111111", span: 1, img: "/webRede.png" },
  { label: "Brand Identity", sub: "Logo & Visual System", icon: "ti-vector-triangle", color: "#FFF5F2", accent: "#E8471A", span: 1, img: "/brandIdentity.png" },
  { label: "Google Ads", sub: "Search & Display", icon: "ti-brand-google", color: "#FFFBF0", accent: "#D97706", span: 1, img: "/googleAds.png" },
  { label: "Reels & Video Ads", sub: "Short-form Production", icon: "ti-player-play", color: "#F7F7F5", accent: "#111111", span: 1, img: "/reels.png" },
  { label: "Email Marketing", sub: "Sequences & Campaigns", icon: "ti-mail", color: "#EEF2FF", accent: "#4F46E5", span: 1, img: "/email.png" },
  { label: "SEO", sub: "Organic & AI Search", icon: "ti-search", color: "#F0FBF4", accent: "#16A34A", span: 1, img: "/seoMar.png" },
];

/* ─── INDIVIDUAL FLOAT CARD ─── */
function FloatCard({ card, origin, delay, fired, settled, span = 1 }) {
  const tilt = useTilt();
  const [hovered, setHovered] = useState(false);
  const notYet = { transform: `translate(${origin.x}px, ${origin.y}px) rotate(${origin.rot}deg) scale(${origin.scale})`, opacity: 0 };
  const landed = { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 };
  return (
    <div
      style={{
        gridColumn: span === 2 ? "span 2" : "span 1",
        ...(fired ? landed : notYet),
        borderRadius: 18, overflow: "hidden",
        background: card.color,
        border: "1px solid rgba(17,17,17,0.07)",
        boxShadow: hovered ? "0 24px 60px rgba(17,17,17,0.13)" : "0 4px 20px rgba(17,17,17,0.06)",
        cursor: "default", willChange: "transform",
        transformStyle: settled ? "preserve-3d" : "flat",
        transition: fired
          ? `transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 0.6s ease ${delay}ms, box-shadow 0.3s ease`
          : "box-shadow 0.3s ease",
      }}
      {...(settled ? tilt : {})}
      onMouseEnter={(e) => { setHovered(true); if (settled) tilt.onMouseMove(e); }}
      onMouseMove={(e) => { if (settled) tilt.onMouseMove(e); }}
      onMouseLeave={(e) => { setHovered(false); if (settled) tilt.onMouseLeave(e); }}
    >
      <div style={{ width: "100%", height: span === 2 ? 200 : 140, overflow: "hidden", borderRadius: "18px 18px 0 0" }}>
        {card.img
          ? <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", background: `${card.accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className={`ti ${card.icon}`} style={{ fontSize: 22, color: card.accent }} />
            </div>
        }
      </div>
      <div style={{ padding: span === 2 ? "16px 28px 26px" : "14px 22px 20px" }}>
        <div style={{ display: "inline-block", fontSize: 9, fontWeight: 800, color: card.accent, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 7, background: `${card.accent}14`, padding: "3px 9px", borderRadius: 100 }}>
          {card.sub}
        </div>
        <h3 style={{ fontSize: span === 2 ? 22 : 15, fontWeight: 700, color: "#111111", lineHeight: 1.25, margin: 0 }}>{card.label}</h3>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING SERVICES SECTION
═══════════════════════════════════════════ */
function FloatingServicesSection({ ref2, v2 }) {
  const sectionRef = useRef(null);
  const [fired, setFired] = useState(false);
  const [settled, setSettled] = useState(false);
  const origins = useRef(
    SERVICE_CARDS.map(() => ({
      x: (Math.random() - 0.5) * 900,
      y: (Math.random() - 0.5) * 600,
      rot: (Math.random() - 0.5) * 40,
      scale: 0.4 + Math.random() * 0.4,
    }))
  );
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !fired) { setFired(true); setTimeout(() => setSettled(true), 900); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [fired]);
  return (
    <section ref={sectionRef} style={{ background: "#F7F7F5", padding: "120px clamp(20px,5vw,80px)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref2} style={{ marginBottom: 64, opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateY(20px)", transition: "all .8s" }}>
          <h2 style={{ fontSize: "clamp(30px,3.5vw,54px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            Everything your brand needs.<br />
            <span style={{ color: "#9CA3AF" }}>One team. One roof.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {SERVICE_CARDS.map((card, i) => (
            <FloatCard key={i} card={card} origin={origins.current[i]} delay={i * 55} fired={fired} settled={settled} span={card.span} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROCESS HERO — full bleed bg image + text only
   Replace src="" with your image path
   Recommended: wide natural-light workspace photo
═══════════════════════════════════════════ */
function ProcessHero({ ref4, v4 }) {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "70vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Fallback bg (shows when no image) */}
      <div style={{ position: "absolute", inset: 0, background: "#EDEBE6" }} />

      {/*
        YOUR BACKGROUND IMAGE — replace src below
        e.g. src="/about-process-bg.jpg"
        Best: wide landscape, natural window/outdoor light, workspace or team candid
      */}
      <img
        src=""
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "saturate(0.65) brightness(1.05)" }}
      />

      {/* Fade to white — left + right */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fff 0%, transparent 25%, transparent 75%, #fff 100%)", zIndex: 1 }} />
      {/* Fade to white — top + bottom */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, transparent 20%, transparent 80%, #fff 100%)", zIndex: 1 }} />
      {/* Centre veil — keeps text legible */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.42)", zIndex: 2 }} />

      {/* Text */}
      <div
        ref={ref4}
        style={{
          position: "relative", zIndex: 3, textAlign: "center",
          padding: "120px clamp(20px,5vw,80px)", maxWidth: 780,
          opacity: v4 ? 1 : 0, transform: v4 ? "none" : "translateY(24px)",
          transition: "all 1s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <h2 style={{ fontSize: "clamp(40px,5.5vw,80px)", fontWeight: 900, color: "#111111", letterSpacing: "-2.5px", lineHeight: 1.02, marginBottom: 28 }}>
          Fast, honest,<br />no surprises.
        </h2>
        <p style={{ fontSize: "clamp(15px,1.4vw,18px)", color: "#4B5563", lineHeight: 1.85, maxWidth: 500, margin: "0 auto" }}>
          Refined over 50+ projects. You know the timeline before we start.
          Updates without asking. The work that was promised, on time.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN ABOUT PAGE
═══════════════════════════════════════════ */
export default function About() {
  const [ref1, v1] = useInView();
  const [ref2, v2] = useInView();
  const [ref3, v3] = useInView();
  const [ref4, v4] = useInView();
  const [ref5, v5] = useInView();
  const [ref6, v6] = useInView();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const milestones = [
    { year: "2021", title: "The beginning", desc: "A laptop and a restaurant client in Andheri. 4 days. They called it the best investment they'd ever made. That reaction is still what we chase." },
    { year: "2022", title: "Saying no more than yes", desc: "15 projects. First retainer. First brand identity from scratch. Started turning down work that didn't fit. That discipline changed the quality of everything." },
    { year: "2023", title: "Getting serious", desc: "First full-time developer. First international brief — a Dubai startup. Launched production services: shoots, campaigns. Revenue tripled. Still a small, focused team." },
    { year: "2024", title: "The full picture", desc: "50+ projects. Clients across India, UAE, Australia, UK. Design, dev, content, social, ads, SEO, shoots, PR — all of it under one roof. 100% satisfaction rate." },
  ];

  const faqs = [
    { q: "How does your process work?", a: "Discovery call → Scope & pricing → Strategy → Design & build → QA & launch → Ongoing support. You're involved at every milestone with Figma previews and feedback rounds. Nothing progresses without your sign-off." },
    { q: "What's included in a website project?", a: "Site audit, competitor analysis, full Figma design, development, content migration, SEO setup, speed optimisation, and 30 days of free post-launch support. Zero downtime during switchover." },
    { q: "How long does a project take?", a: "Landing pages: 3–5 days. Full websites: 7–14 days. Brand + web packages: 3–6 weeks. You get a detailed milestone timeline before we start." },
    { q: "What does it cost?", a: "Logo design from ₹8,000. Landing pages from ₹15,000. Full websites from ₹25,000. Brand + web packages from ₹40,000. Transparent pricing — no hidden costs, no surprise invoices." },
    { q: "Do you work outside Mumbai?", a: "Entirely remote-friendly. Clients across India, Australia, UAE, UK, US. Figma, WhatsApp, email, video calls. Different timezone — we're flexible." },
    { q: "Can you take over an existing project?", a: "Yes. We regularly take over from other agencies, audit codebases, redesign sections, or build on existing systems. No lock-in." },
    { q: "Do you offer ongoing support?", a: "Monthly retainers from ₹5,000/month — updates, backups, security, performance optimisation, priority support." },
    { q: "What about SEO?", a: "SEO is built into the foundation: heading hierarchy, semantic HTML, meta tags, schema markup, Core Web Vitals. We also offer ongoing SEO and AI search optimisation." },
  ];

  return (
    <div className="page-enter">
      <PageBanner
        tag="ABOUT"
        title="A Mumbai studio that builds legendary brands."
        sub="We combine beautiful design, clean code, and smart strategy to help ambitious businesses grow, convert, and dominate online."
        bg="/bannerAbout.png"
      />

      {/* ══ WHO WE ARE ══ */}
      <section style={{ background: "#fff", padding: "120px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(60px,7vw,120px)", alignItems: "center" }}>

          <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateX(-32px)", transition: "all 1s cubic-bezier(.16,1,.3,1)" }}>
            <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 28 }}>
              We don't just build websites.<br />We build businesses.
            </h2>
            <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.9, marginBottom: 20 }}>
              Clickwise was born from a frustration with agencies that charged premium prices for mediocre, templated work. We believed Mumbai's businesses deserved better — design that actually converts, code that actually performs, and strategy that actually drives growth.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 20 }}>
              Since our founding, we've partnered with startups launching their first product, mid-sized companies scaling their digital presence, and established brands reinventing themselves for the digital age. Each project gets the same level of obsession — because we understand that your website is your most important salesperson, working 24/7.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>
              Today, Clickwise is a full-service creative digital agency offering web design, development, brand identity, photography, social media, SEO, and growth marketing — all under one roof, with one point of contact, and one standard: excellence.
            </p>
          </div>

          <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateX(32px)", transition: "all 1s cubic-bezier(.16,1,.3,1) 0.15s", position: "relative" }}>
            <TiltImageCard src="/about-main.png" ratio="4/5" label="Your main 3D image" />
            <div style={{ position: "absolute", top: -16, right: -16, background: "#E8471A", borderRadius: 14, padding: "18px 22px", boxShadow: "0 16px 40px rgba(232,71,26,0.35)", animation: "floatA 4s ease-in-out infinite" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>50+</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>Projects</div>
            </div>
            <div style={{ position: "absolute", bottom: 28, left: -20, background: "#fff", border: "1px solid #E4E3DD", borderRadius: 12, padding: "14px 18px", boxShadow: "0 12px 32px rgba(17,17,17,0.12)", animation: "floatB 5s ease-in-out infinite" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#E8471A", letterSpacing: "-0.5px", lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>Satisfaction</div>
            </div>
            <style>{`
              @keyframes floatA { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
              @keyframes floatB { 0%,100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-8px) rotate(-1deg); } }
            `}</style>
          </div>
        </div>

        <div style={{ maxWidth: 1320, margin: "72px auto 0", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, paddingTop: 56, borderTop: "1px solid #E4E3DD" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(20px)", transition: `all .8s cubic-bezier(.16,1,.3,1) ${i * 0.1 + 0.3}s` }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#E8471A", letterSpacing: "-1px", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES — FLOATING CARDS ══ */}
      <FloatingServicesSection ref2={ref2} v2={v2} />

      {/* ══ STORY ══ */}
      <section style={{ background: "#fff", padding: "120px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref3} style={{ marginBottom: 80, opacity: v3 ? 1 : 0, transform: v3 ? "none" : "translateY(20px)", transition: "all .8s" }}>
            <h2 style={{ fontSize: "clamp(30px,3.5vw,54px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", lineHeight: 1.1 }}>Four years. No shortcuts.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(60px,7vw,120px)", alignItems: "start" }}>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 1, background: "linear-gradient(to bottom, #E8471A 0%, #E4E3DD 100%)" }} />
              {milestones.map((m, i) => (
                <div key={i} style={{ position: "relative", paddingBottom: 56, opacity: v3 ? 1 : 0, transform: v3 ? "none" : "translateX(-16px)", transition: `all .8s cubic-bezier(.16,1,.3,1) ${i * 0.12}s` }}>
                  <div style={{ position: "absolute", left: -34, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#E8471A", boxShadow: "0 0 0 3px rgba(232,71,26,0.15)" }} />
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#E8471A", letterSpacing: "0.1em", marginBottom: 10 }}>{m.year}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 10 }}>{m.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.9 }}>{m.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "sticky", top: 120 }}>
              <TiltImageCard src="/studio.png" ratio="4/5" label="Your story / studio 3D image" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS — full bleed image + text only ══ */}
      <ProcessHero ref4={ref4} v4={v4} />

      {/* ══ STATS RED BAND ══ */}
      <section style={{ background: "#E8471A", padding: "90px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {[{ v: "50", s: "+", l: "Projects Delivered" }, { v: "30", s: "+", l: "Happy Clients" }, { v: "3", s: "+", l: "Years of Craft" }, { v: "100", s: "%", l: "Satisfaction" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>
                <Counter target={s.v} suffix={s.s} />
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700, marginTop: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: "#fff", padding: "120px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={ref5} style={{ textAlign: "center", marginBottom: 80, opacity: v5 ? 1 : 0, transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {faqs.map((faq, i) => (
                <div key={i} onClick={() => setActiveFAQ(i)}
                  style={{ padding: "18px 24px", borderRadius: 10, cursor: "pointer", background: activeFAQ === i ? "#E8471A" : "#F7F7F5", border: `1px solid ${activeFAQ === i ? "#E8471A" : "#E4E3DD"}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "all .3s" }}
                  onMouseEnter={(e) => { if (activeFAQ !== i) e.currentTarget.style.borderColor = "rgba(232,71,26,0.4)"; }}
                  onMouseLeave={(e) => { if (activeFAQ !== i) e.currentTarget.style.borderColor = "#E4E3DD"; }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: activeFAQ === i ? "#fff" : "#111111" }}>{faq.q}</span>
                  <span style={{ color: activeFAQ === i ? "#fff" : "#E8471A", fontSize: 18, flexShrink: 0 }}>{activeFAQ === i ? "✕" : "+"}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#F7F7F5", borderRadius: 16, padding: "40px 36px", border: "1px solid #E4E3DD", position: "sticky", top: 100 }}>
              <div style={{ width: 40, height: 3, background: "#E8471A", borderRadius: 2, marginBottom: 24 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 16, lineHeight: 1.4 }}>{faqs[activeFAQ].q}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>{faqs[activeFAQ].a}</p>
              <p style={{ fontSize: 11, color: "#C4C0B8", marginTop: 32 }}>{activeFAQ + 1} / {faqs.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOUNDER ══ */}
      <section style={{ background: "#111111", padding: "120px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(60px,7vw,120px)", alignItems: "center" }}>
          <div ref={ref6} style={{ opacity: v6 ? 1 : 0, transform: v6 ? "none" : "translateX(-32px)", transition: "all 1s cubic-bezier(.16,1,.3,1)" }}>
            <TiltImageCard src="" ratio="3/4" label="Your founder 3D portrait" />
          </div>
          <div style={{ opacity: v6 ? 1 : 0, transform: v6 ? "none" : "translateX(32px)", transition: "all 1s cubic-bezier(.16,1,.3,1) 0.15s" }}>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 24 }}>
              Built by someone who was tired of settling for average.
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.9, marginBottom: 20 }}>
              Anuragg started Clickwise from a home office in Mumbai in 2021. The first client was a restaurant that needed a proper website. It was delivered in 4 days, and they said it was the best investment they'd ever made.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 20 }}>
              That project set the standard. Since then, Clickwise has grown into a full-service studio handling everything from brand identity and ad shoots to web development and performance marketing — for clients across India, the UAE, Australia, and the UK.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>
              The studio is deliberately small. Every client gets direct access, real attention, and work that's actually thought through — not templated and shipped.
            </p>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#E8471A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", flexShrink: 0 }}>A</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Anuragg</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Founder, Clickwise Studio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: "#E8471A", padding: "120px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.05, letterSpacing: "-1.5px" }}>
            Ready to build<br />something real?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 40px" }}>
            Free 30-minute call. No pitch deck. Just an honest conversation about your brand and what it needs.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact"
              style={{ fontSize: 12, fontWeight: 700, color: "#E8471A", background: "#fff", padding: "14px 32px", borderRadius: 4, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.88)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
            >Start a Project →</Link>
            <a href="https://wa.me/917051575007" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "transparent", padding: "14px 32px", borderRadius: 4, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", border: "2px solid rgba(255,255,255,0.5)", transition: "all .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            >💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}