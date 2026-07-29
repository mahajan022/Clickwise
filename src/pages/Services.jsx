import { useInView, PageBanner } from "../components";
import { SERVICES, FAQS } from "../globals";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { faqSchema, servicesSchema, jsonLdScript } from "../seo";

function ServiceIcon({ type }) {
  const icons = {
    design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>,
    code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
    brand: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    social: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    growth: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    app: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>,
    seo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  };
  return icons[type] || null;
}

function AccordionItem({ service, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: "1px solid #EBEBEB" }}>

      {/* Header Row */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "24px 0",
          cursor: "pointer",
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector(".svc-title").style.color = "#C1502E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector(".svc-title").style.color = isOpen ? "#C1502E" : "#141210";
        }}
      >
        {/* Icon */}
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: isOpen ? "rgba(193,80,46,.08)" : "#F5F5F5",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isOpen ? "#C1502E" : "#888",
          transition: "all .3s ease",
        }}>
          <div style={{ width: 18, height: 18 }}><ServiceIcon type={service.icon} /></div>
        </div>

        {/* Title + subtitle */}
        <div style={{ flex: 1 }}>
          <h3
            className="svc-title"
            style={{
              fontSize: "clamp(15px,1.3vw,18px)",
              fontWeight: 600,
              color: isOpen ? "#C1502E" : "#141210",
              letterSpacing: "-0.2px",
              transition: "color .25s",
              margin: 0,
            }}
          >
            {service.title}
          </h3>
          {!isOpen && (
            <p style={{ fontSize: 15, color: "#7A7A7A", marginTop: 4 }}>
              {service.desc}
            </p>
          )}
        </div>

        {/* Toggle button */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          border: `1.5px solid ${isOpen ? "#C1502E" : "#DEDEDE"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isOpen ? "#C1502E" : "#AAAAAA",
          fontSize: 20, fontWeight: 300,
          transition: "all .3s ease",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</div>
      </div>

      {/* Expanded Content */}
      <div style={{ height, overflow: "hidden", transition: "height .45s cubic-bezier(.16,1,.3,1)" }}>
        <div ref={contentRef}>
          <div style={{
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 28,
            position: "relative",
            border: "1px solid #EBEBEB",
          }}>

            {/* Background image — full color, visible */}
            {service.image && (
              <img
                src={service.image}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={(e) => { e.currentTarget.style.opacity = 0.85; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: 0,
                  transition: "opacity .5s ease",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Light white overlay — just enough to keep text readable */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 42%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.25) 100%)",
              pointerEvents: "none",
            }} />

            {/* Content grid */}
            <div className="cw-grid-2" style={{
              position: "relative",
              zIndex: 1,
              gap: 48,
              padding: "clamp(28px,5vw,44px) clamp(24px,5vw,48px) clamp(28px,5vw,48px)",
            }}>

              {/* Left — description, features, CTA */}
              <div>
                <p style={{
                  fontSize: 16,
                  color: "#1A1A1A",
                  lineHeight: 1.85,
                  marginBottom: 28,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "none" : "translateY(8px)",
                  transition: "all .4s ease .05s",
                  fontWeight: 500,
                }}>
                  {service.about}
                </p>

                <p style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#555555",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}>
                  What's Included
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                  {service.features.map((f, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "none" : "translateX(-8px)",
                      transition: `all .35s ease ${0.1 + i * 0.04}s`,
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C1502E" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 15, color: "#141210", fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    background: "linear-gradient(135deg, #D97A52 0%, #C1502E 55%, #8F3D22 100%)", color: "#fff",
                    padding: "14px 30px", borderRadius: 10,
                    textDecoration: "none", fontSize: 13, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    boxShadow: "0 8px 24px rgba(193,80,46,.3), inset 0 1px 0 rgba(255,255,255,.18)",
                    transition: "all .25s cubic-bezier(.16,1,.3,1)",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "none" : "translateY(6px)",
                    transitionDelay: "0.35s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 14px 36px rgba(193,80,46,.45), inset 0 1px 0 rgba(255,255,255,.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(193,80,46,.3), inset 0 1px 0 rgba(255,255,255,.18)";
                  }}
                >
                  Get a Quote
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Right — tags */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 8,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "none" : "translateY(10px)",
                transition: "all .45s ease .15s",
              }}>
                {(service.tags || []).map((tag, i) => (
                  <span key={i} style={{
                    display: "inline-block",
                    width: "fit-content",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#141210",
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(0,0,0,0.12)",
                    padding: "5px 14px",
                    borderRadius: 100,
                    letterSpacing: "0.03em",
                  }}>{tag}</span>
                ))}
              </div>

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
            <Helmet>
        <title>Web Development, SEO & PPC Services — Clicks&Ads Digital Marketing Agency</title>
        <meta name="description" content="Explore our web design, website development, SEO, PPC management, and social media services. Trusted digital marketing agency near you in Mumbai." />
        <link rel="canonical" href="https://clicksnads.com/services" />
        <script type="application/ld+json">{jsonLdScript(servicesSchema(SERVICES))}</script>
        <script type="application/ld+json">{jsonLdScript(faqSchema(FAQS))}</script>
      </Helmet>

      <PageBanner
        tag="SERVICES"
        title="Digital Marketing & Website Development Services in Mumbai"
        sub="From website development and SEO to performance marketing, branding, and social media management — Clicks&Ads is your full-service digital marketing agency in Mumbai."
        bg="https://res.cloudinary.com/dpejpwl80/image/upload/q_auto/f_auto/v1780139668/servicesBanner_sbj5f4.png"
      />

      {/* ── SERVICES ACCORDION ── */}
      <section style={{ background: "#ffffff", padding: "72px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={ref}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{
                  opacity: v ? 1 : 0,
                  transform: v ? "none" : "translateY(16px)",
                  transition: `opacity .45s ease ${i * 0.035}s, transform .45s ease ${i * 0.035}s`,
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
      <section style={{ background: "#141210", padding: "72px clamp(20px,5vw,80px)" }}>
        <div className="cw-grid-3" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            { num: "11+", label: "Services", desc: "Everything under one roof — no agency hopping." },
            { num: "7–21", label: "Days to Deliver", desc: "Fast without ever sacrificing quality." },
            { num: "100%", label: "Satisfaction", desc: "We don't stop until you're genuinely happy." },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "48px 36px",
              borderRight: i < 2 ? "1px solid #222222" : "none",
            }}>
              <div style={{
                fontSize: "clamp(34px,3.2vw,50px)",
                fontWeight: 800,
                color: "#C1502E",
                letterSpacing: "-2px",
                lineHeight: 1,
                marginBottom: 10,
              }}>{s.num}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#ffffff",
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
              }}>{s.label}</div>
              <p style={{ fontSize: 15, color: "#888888", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F9F9F9", padding: "96px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <h2 style={{
            fontSize: "clamp(26px,2.8vw,40px)",
            fontWeight: 800, color: "#141210",
            letterSpacing: "-0.6px", marginBottom: 56,
            textAlign: "center",
          }}>
            Frequently Asked Questions
          </h2>

          <div className="cw-grid-2" style={{ gap: 28, alignItems: "start" }}>

            {/* Question list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setFaqOpen(i)}
                  style={{
                    padding: "16px 20px", borderRadius: 10, cursor: "pointer",
                    transition: "all .2s ease",
                    background: faqOpen === i ? "#C1502E" : "#ffffff",
                    border: `1px solid ${faqOpen === i ? "#C1502E" : "#E8E8E8"}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14,
                  }}
                  onMouseEnter={(e) => {
                    if (faqOpen !== i) {
                      e.currentTarget.style.borderColor = "rgba(193,80,46,.35)";
                      e.currentTarget.style.background = "#FFF6F4";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (faqOpen !== i) {
                      e.currentTarget.style.borderColor = "#E8E8E8";
                      e.currentTarget.style.background = "#ffffff";
                    }
                  }}
                >
                  <span style={{
                    fontSize: 15, fontWeight: 600,
                    color: faqOpen === i ? "#fff" : "#141210",
                    transition: "color .2s",
                  }}>{f.q}</span>
                  <span style={{
                    fontSize: 18, color: faqOpen === i ? "#fff" : "#C1502E",
                    flexShrink: 0,
                    transition: "transform .25s ease",
                    transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                    fontWeight: 300,
                    display: "inline-block",
                  }}>+</span>
                </div>
              ))}
            </div>

            {/* Answer panel */}
            <div className="cw-unsticky-mobile" style={{ position: "sticky", top: 100 }}>
              {faqOpen !== null && (
                <div style={{
                  background: "#ffffff",
                  borderRadius: 14,
                  padding: "32px 28px",
                  border: "1px solid #EBEBEB",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                  animation: "faqSlide .3s ease",
                }}>
                  <div style={{ width: 32, height: 3, background: "#C1502E", borderRadius: 2, marginBottom: 18 }} />
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#141210", marginBottom: 14, lineHeight: 1.4 }}>
                    {FAQS[faqOpen].q}
                  </h3>
                  <p style={{ fontSize: 16, color: "#444444", lineHeight: 1.85 }}>
                    {FAQS[faqOpen].a}
                  </p>
                  <p style={{ fontSize: 12, color: "#CCCCCC", marginTop: 28, letterSpacing: "0.08em" }}>
                    {faqOpen + 1} / {FAQS.length}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes faqSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}