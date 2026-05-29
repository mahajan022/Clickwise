import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MQ, SERVICES } from "./globals";

const P = { fontFamily: "'Poppins', sans-serif" };

/* ── INTERSECTION OBSERVER ── */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setV(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ── NAV ── */
export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => loc.pathname === path;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #111111;
          text-decoration: none;
          letter-spacing: 0.01em;
          padding: 6px 0;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: #E8471A;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover {
          color: #E8471A;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.active {
          color: #E8471A;
        }
        .nav-link.active::after {
          width: 100%;
        }

        .nav-cta {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: #E8471A;
          padding: 11px 26px;
          border-radius: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(232,71,26,.35);
          position: relative;
          overflow: hidden;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232,71,26,.5);
        }
        .nav-cta:hover::before {
          opacity: 1;
        }
        .nav-cta:active {
          transform: translateY(0px);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #E4E3DD;
          padding: 24px clamp(20px,5vw,80px) 32px;
          z-index: 99;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .mobile-menu.open {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-nav-link {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #111;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid #F0EFEA;
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: #E8471A;
          padding-left: 8px;
        }

        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
        borderBottom: scrolled ? "1px solid #E4E3DD" : "1px solid rgba(228,227,221,0.6)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,80px)",
          height: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt="Clickwise"
              style={{ height: 36, width: "auto", objectFit: "contain", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            />
          </Link>

          {/* Desktop Links */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link${isActive(item.href) ? " active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="nav-cta">
              Contact
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#111",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {[...navItems, { label: "Contact", href: "/contact" }].map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`mobile-nav-link${isActive(item.href) ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

/* ── PLACEHOLDER ── */
export function Placeholder({ emoji = "📸", label = "Placeholder" }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#F0EFEA", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 32 }}>{emoji}</span>
      <span style={{ fontSize: 12, color: "#999" }}>{label}</span>
    </div>
  );
}

/* ── PAGE BANNER ── */
export function PageBanner({ tag = "Page", title = "Title", sub = "Subtitle", bg }) {
  const [ref, v] = useInView();
  return (
    <section style={{
      background: bg ? `url(${bg}) center/cover no-repeat` : "#fff",
      borderBottom: "1px solid #E4E3DD",
      padding: "80px clamp(20px,5vw,80px)",
      position: "relative",
    }}>
      {bg && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }} />
      )}
      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontSize: "clamp(40px,5vw,64px)", fontWeight: 800,
          color: bg ? "#fff" : "#111111",
          lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px",
          opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)",
          transition: "all .7s cubic-bezier(.16,1,.3,1) .1s"
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: 16,
          color: bg ? "rgba(255,255,255,.8)" : "#6B7280",
          lineHeight: 1.8, maxWidth: 700, margin: "0 auto",
          opacity: v ? 1 : 0, transform: v ? "none" : "translateY(12px)",
          transition: "all .7s cubic-bezier(.16,1,.3,1) .2s"
        }}>
          {sub}
        </p>
      </div>
    </section>
  );
}

/* ── MARQUEE BAR ── */
export function MarqueeBar() {
  const items = [
    { icon: "›", text: "50+ Projects Delivered" },
    { icon: "›", text: "100% Client Satisfaction" },
    { icon: "›", text: "3+ Years of Craft" },
    { icon: "›", text: "Mumbai's Top Digital Agency" },
    { icon: "›", text: "30+ Happy Clients" },
    { icon: "›", text: "Premium Web & Brand Design" },
    { icon: "›", text: "React & MERN Experts" },
    { icon: "›", text: "Results-Driven Strategy" },
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#0D0D0D", padding: "18px 0", overflow: "hidden", borderBottom: "1px solid #1F2937" }}>
      <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap", animation: "scroll 35s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, paddingRight: 48 }}>
            <span style={{ color: "#E8471A", fontSize: 14, fontWeight: 900 }}>{item.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {item.text}
            </span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ── FLOATING WHATSAPP ── */
export function FloatingWA() {
  return (
    <a
      href="https://wa.me/917051575007"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(37,211,102,.4)",
        zIndex: 999,
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.15)";
        e.currentTarget.style.boxShadow = "0 12px 48px rgba(37,211,102,.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,.4)";
      }}
    >
      💬
    </a>
  );
}

/* ── FOOTER ── */
export function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialLinks = [
    { 
      label: "Instagram", 
      url: "https://instagram.com/clickwise", 
      color: "#E4405F",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    },
    { 
      label: "LinkedIn", 
      url: "https://linkedin.com/company/clickwise", 
      color: "#0077B5",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    },
    { 
      label: "WhatsApp", 
      url: "https://wa.me/917051575007", 
      color: "#25D366",
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    },
  ];

  return (
    <footer style={{ background: "#0F0F0F", padding: "120px clamp(20px,5vw,80px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: "-50%", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(232,71,26,.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center", paddingBottom: 80, borderBottom: "1px solid #1F2937", marginBottom: 80 }}>
          <div>
            <h3 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>
              Let's Create Something <span style={{ color: "#E8471A", fontStyle: "italic" }}>Extraordinary</span>
            </h3>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.8, maxWidth: 480 }}>
              Ready to transform your brand? Let's build something that stands out and drives results.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", whiteSpace: "nowrap" }}>
            <a href="mailto:anuragg7051@gmail.com"
              style={{ background: "#E8471A", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 13, transition: "all .3s", boxShadow: "0 8px 24px rgba(232,71,26,.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,71,26,.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,71,26,.3)"; }}
            >
              Start Your Project
            </a>
          </div>
        </div>

        {/* Middle grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr repeat(3, 1fr)", gap: 80, marginBottom: 80 }}>
          <div>
            <img src="/logo-white.png" alt="Clickwise" style={{ height: 60, width: "auto", objectFit: "contain", marginBottom: 24, display: "block", opacity: .95 }} />
            <p style={{ fontSize: 13, fontWeight: 300, color: "#9CA3AF", lineHeight: 1.9, marginBottom: 32 }}>
              Mumbai's premier creative digital agency. We help ambitious brands grow, look incredible, and win online through strategic design and technology.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map(({ label, url, color, svg }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" title={label}
                  style={{
                    width: 44, height: 44, borderRadius: 10,
                    border: `1.5px solid ${hoveredIcon === label ? color : "#1F2937"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all .3s cubic-bezier(.16,1,.3,1)",
                    background: hoveredIcon === label ? color : "transparent",
                    color: hoveredIcon === label ? "#fff" : "#6B7280",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() => setHoveredIcon(label)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#E8471A", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>Services</h4>
            {["Web Design", "Development", "Branding", "Photography", "SEO & AI", "Growth Strategy", "Social Media", "Automation"].map(s => (
              <a key={s} href="#services" style={{ color: "#6B7280", fontSize: 13, marginBottom: 14, display: "block", textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={(e) => { e.target.style.color = "#E8471A"; e.target.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.target.style.color = "#6B7280"; e.target.style.transform = "translateX(0)"; }}
              >{s}</a>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#E8471A", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>Company</h4>
            {[["/", "Home"], ["/about", "About"], ["/work", "Work"], ["/services", "Services"], ["/contact", "Contact"]].map(([link, label]) => (
              <Link key={label} to={link} style={{ color: "#6B7280", fontSize: 13, marginBottom: 14, display: "block", textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={(e) => { e.target.style.color = "#E8471A"; e.target.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.target.style.color = "#6B7280"; e.target.style.transform = "translateX(0)"; }}
              >{label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#E8471A", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>Get in Touch</h4>
            <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 14, lineHeight: 1.8 }}>
              📍 Mumbai, Maharashtra, India
            </p>
            <a href="tel:+917051575007" style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 8, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={(e) => { e.target.style.color = "#E8471A"; }}
              onMouseLeave={(e) => { e.target.style.color = "#9CA3AF"; }}
            >+91 70515 75007</a>
            <a href="mailto:anuragg7051@gmail.com" style={{ color: "#E8471A", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => { e.target.style.opacity = ".8"; }}
              onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
            >anuragg7051@gmail.com</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1F2937", padding: "28px 0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "#4B5563", fontSize: 12 }}>© 2025 Clickwise. All rights reserved.</p>
          <p style={{ color: "#4B5563", fontSize: 12 }}>Made with ❤️ from India 🇮🇳</p>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#privacy" style={{ color: "#6B7280", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={(e) => { e.target.style.color = "#E8471A"; }}
              onMouseLeave={(e) => { e.target.style.color = "#6B7280"; }}
            >Privacy Policy</a>
            <a href="#terms" style={{ color: "#6B7280", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={(e) => { e.target.style.color = "#E8471A"; }}
              onMouseLeave={(e) => { e.target.style.color = "#6B7280"; }}
            >Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Nav as Navbar };

export function Loader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid #E4E3DD",
        borderTop: "3px solid #E8471A",
        animation: "spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}