import { useInView, PageBanner } from "../components";
import { SERVICES, FAQS } from "../globals";
import { useState, useRef, useEffect } from "react";

function ServiceIcon({ type }) {
  const icons = {
    design:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
    code:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    brand:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    camera:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    social:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    growth:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    app:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    ai:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    seo:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  };
  return icons[type] || null;
}

function AccordionItem({ service, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div style={{
      borderBottom: "1px solid #E4E3DD",
      overflow: "hidden",
    }}>
      {/* ── HEADER ROW ── */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "28px 0",
          cursor: "pointer",
          transition: "all .3s",
          userSelect: "none",
        }}
        onMouseEnter={(e) => { e.currentTarget.querySelector(".svc-title").style.color = "#E8471A"; }}
        onMouseLeave={(e) => { e.currentTarget.querySelector(".svc-title").style.color = isOpen ? "#E8471A" : "#111111"; }}
      >
        {/* Number */}
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: isOpen ? "#E8471A" : "#C4C4C4",
          letterSpacing: "0.12em",
          width: 28,
          flexShrink: 0,
          transition: "color .3s",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: isOpen ? "rgba(232,71,26,.1)" : "#F7F7F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isOpen ? "#E8471A" : "#6B7280",
          flexShrink: 0,
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          transform: isOpen ? "scale(1.1)" : "scale(1)",
        }}>
          <div style={{ width: 20, height: 20 }}><ServiceIcon type={service.icon} /></div>
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <h3
            className="svc-title"
            style={{
              fontSize: "clamp(16px,1.4vw,20px)",
              fontWeight: 700,
              color: isOpen ? "#E8471A" : "#111111",
              letterSpacing: "-0.3px",
              transition: "color .3s",
              margin: 0,
            }}
          >
            {service.title}
          </h3>
          {!isOpen && (
            <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2, margin: 0 }}>
              {service.desc}
            </p>
          )}
        </div>

        {/* Plus / Minus toggle */}
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${isOpen ? "#E8471A" : "#E4E3DD"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          color: isOpen ? "#E8471A" : "#9CA3AF",
          fontSize: 20,
          fontWeight: 300,
        }}>
          +
        </div>
      </div>

      {/* ── EXPANDED CONTENT ── */}
      <div
        style={{
          height: height,
          overflow: "hidden",
          transition: "height .5s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div ref={contentRef}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            paddingBottom: 48,
            paddingLeft: 28 + 40 + 24,
          }}>
            {/* Left — text */}
            <div>
              <p style={{
                fontSize: 14,
                color: "#4B5563",
                lineHeight: 1.9,
                marginBottom: 28,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(8px)",
                transition: "all .4s cubic-bezier(.16,1,.3,1) .15s",
              }}>
                {service.about}
              </p>

              {/* Features */}
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 16 }}>
                What's Included
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                      transition: `all .4s cubic-bezier(.16,1,.3,1) ${0.2 + i * 0.05}s`,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#E8471A", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#4B5563" }}>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 32,
                  background: "#111111",
                  color: "#fff",
                  padding: "13px 26px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "-0.1px",
                  transition: "all .25s",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(8px)",
                  transitionDelay: "0.35s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#E8471A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.transform = "none"; }}
              >
                Get a Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            {/* Right — image */}
            <div style={{
              borderRadius: 14,
              overflow: "hidden",
              height: 280,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
              transition: "all .5s cubic-bezier(.16,1,.3,1) .1s",
            }}>
              <img
                src={service.image}
                alt={service.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [open, setOpen] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [ref, v] = useInView();

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="page-enter">
      <PageBanner
        tag="SERVICES"
        title="Full-Service Creative & Digital Agency."
        sub="From brand identity to web apps — we do it all, and we do it well."
      />

      {/* ── SERVICES ACCORDION ── */}
      <section style={{ background: "#fff", padding: "80px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={ref}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{
                  opacity: v ? 1 : 0,
                  transform: v ? "none" : "translateY(20px)",
                  transition: `opacity .5s cubic-bezier(.16,1,.3,1) ${i * 0.04}s, transform .5s cubic-bezier(.16,1,.3,1) ${i * 0.04}s`,
                }}
              >
                <AccordionItem
                  service={s}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => toggle(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#111111", padding: "80px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
          {[
            { num: "11+", label: "Services", desc: "Everything under one roof — no agency hopping." },
            { num: "7–21", label: "Days to Deliver", desc: "Fast without ever sacrificing quality." },
            { num: "100%", label: "Satisfaction", desc: "We don't stop until you're genuinely happy." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "52px 40px", borderRight: i < 2 ? "1px solid #1F2937" : "none" }}>
              <div style={{ fontSize: "clamp(36px,3.5vw,54px)", fontWeight: 800, color: "#E8471A", letterSpacing: "-2px", lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>{s.label}</div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fafaf9", padding: "100px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: "-0.8px", marginBottom: 60, textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

            {/* Left — question list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setFaqOpen(i)}
                  style={{
                    padding: "18px 24px",
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "all .25s cubic-bezier(.16,1,.3,1)",
                    background: faqOpen === i ? "#E8471A" : "#fff",
                    border: `1px solid ${faqOpen === i ? "#E8471A" : "#E4E3DD"}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                  onMouseEnter={(e) => { if (faqOpen !== i) { e.currentTarget.style.borderColor = "rgba(232,71,26,.4)"; e.currentTarget.style.background = "#fff5f3"; } }}
                  onMouseLeave={(e) => { if (faqOpen !== i) { e.currentTarget.style.borderColor = "#E4E3DD"; e.currentTarget.style.background = "#fff"; } }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: faqOpen === i ? "#fff" : "#111111", transition: "color .25s" }}>
                    {f.q}
                  </span>
                  <span style={{
                    fontSize: 18,
                    color: faqOpen === i ? "#fff" : "#E8471A",
                    flexShrink: 0,
                    transition: "transform .3s cubic-bezier(.16,1,.3,1)",
                    transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                    fontWeight: 300,
                  }}>+</span>
                </div>
              ))}
            </div>

            {/* Right — answer panel */}
            <div style={{ position: "sticky", top: 100 }}>
              {faqOpen !== null ? (
                <div style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "36px 32px",
                  border: "1.5px solid #E8471A",
                  boxShadow: "0 12px 48px rgba(232,71,26,.08)",
                  animation: "faqSlide .3s cubic-bezier(.16,1,.3,1)",
                }}>
                  <div style={{ width: 36, height: 3, background: "#E8471A", borderRadius: 2, marginBottom: 20 }} />
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 16, lineHeight: 1.4 }}>
                    {FAQS[faqOpen].q}
                  </h3>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>
                    {FAQS[faqOpen].a}
                  </p>
                  <p style={{ fontSize: 11, color: "#C4C4C4", marginTop: 32, letterSpacing: "0.08em" }}>
                    {faqOpen + 1} / {FAQS.length}
                  </p>
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}