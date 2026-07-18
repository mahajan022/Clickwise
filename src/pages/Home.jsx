import { Link } from "react-router-dom";
import { useInView } from "../components";
import { SERVICES, WORKS, STATS, TESTIMONIALS, PROCESS } from "../globals";
import { Helmet } from "react-helmet-async";

/* ── HERO ── */
function Hero() {
  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#111" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}>
        <source src="https://res.cloudinary.com/dpejpwl80/video/upload/v1779949283/download_x2fnji.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(0,0,0,.65), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }} />
    </section>
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
    <section ref={ref} style={{ background: "#FFFFFF", padding: "clamp(56px,7vw,96px) clamp(20px,5vw,80px)" }}>
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
                <img src={card.icon} alt={card.title} style={{ width: 42, height: 42, objectFit: "contain" }} />
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
      </Helmet>
      <Hero />
      <AnimatedHeadline />
      <ServicesPreview />
      <ProcessSection />
      <WhyUs />
      <WorkPreview />
      <AnimatedTestimonials />
      <CTA />
    </div>
  );
}