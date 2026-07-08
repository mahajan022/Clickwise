import { useState } from "react";
import { useInView, PageBanner } from "../components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FAQS = [
  { q: "What's your turnaround time?", a: "Projects typically take 2–8 weeks depending on complexity. We provide a detailed timeline after the initial consultation, so you always know what to expect." },
  { q: "Do you offer ongoing support?", a: "Yes! We offer monthly maintenance and support packages to keep your website updated, secure, and optimised for performance." },
  { q: "What's your pricing?", a: "We work with budgets from ₹50,000 to ₹5,00,000+. Pricing depends on scope — we'll send a custom quote after a quick call to understand your needs." },
  { q: "Can you help with existing projects?", a: "Absolutely. We can audit, redesign, or enhance your existing website or app without any lock-in or long-term commitment." },
  { q: "Do you provide hosting?", a: "We don't host directly, but we'll set your project up on the platform of your choice and fully manage the infrastructure for you." },
];

/* ── IMAGE PATHS ── drop files in /public/ */
const CONTACT_IMAGES = {
  hero:    "https://res.cloudinary.com/dpejpwl80/image/upload/q_auto/f_auto/v1780139502/contact-banner_mcgzi0.png",     // Big hero image top right
  mid1:    "/contact1.png",     // Middle section image 1
  mid2:    "/contact2.png",     // Middle section image 2
  bottom:  "/contact-wp.png",   // Bottom CTA image
};

function ImgBox({ src, ratio = "1/1", radius = 16 }) {
  return (
    <div style={{ width: "100%", aspectRatio: ratio, borderRadius: radius, overflow: "hidden", background: "#E8E6E0" }}>
      {src && <img src={src} alt="" loading="lazy" decoding="async" onLoad={(e) => { e.currentTarget.style.opacity = 1; }} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity .5s ease" }} />}
    </div>
  );
}

export default function Contact() {
  const [ref1, v1] = useInView();
  const [ref2, v2] = useInView();
  const [ref3, v3] = useInView();
  const [ref4, v4] = useInView();
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      const res = await fetch("https://formspree.io/f/mbdbepwr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _subject: `New Clickwise Enquiry from ${name}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => { setName(""); setEmail(""); setPhone(""); setMessage(""); setSubmitted(false); }, 3000);
      } else {
        alert("Something went wrong. Please WhatsApp us or email anuragg7051@gmail.com directly.");
      }
    } catch (err) {
      alert("Network error. Please WhatsApp us or email anuragg7051@gmail.com directly.");
    }
  };

  return (
    <div className="page-enter">
      <Helmet>
  <title>Contact Clicks&Ads — Digital Marketing Agency Near You in Mumbai</title>
  <meta name="description" content="Get in touch with Mumbai's trusted digital marketing agency and web development company. Free consultation, fast turnaround." />
</Helmet>

      {/* ── HERO SECTION ── */}
      <section style={{ background: "#fff", padding: "100px clamp(20px,5vw,80px) 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref1} className="cw-grid-2" style={{ gap: 60, alignItems: "end" }}>

            {/* Left — heading */}
            <div style={{ paddingBottom: 80, opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: "#E8471A", textTransform: "uppercase", marginBottom: 24 }}>Get In Touch</p>
              <h1 style={{ fontSize: "clamp(40px,5vw,72px)", fontWeight: 800, color: "#111111", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 28 }}>
                Let's Build<br />
                Something<br />
                <span style={{ color: "#E8471A", fontStyle: "italic" }}>Extraordinary.</span>
              </h1>
              <p style={{ fontSize: 18, color: "#5A6270", lineHeight: 1.8, maxWidth: 420, marginBottom: 48 }}>
                Have a project in mind? We'd love to hear about it. Free consultation, no commitment, no sales pitch — just an honest conversation about your goals.
              </p>

              {/* Contact quick links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Email us", value: "anuragg7051@gmail.com", href: "mailto:anuragg7051@gmail.com", color: "#E8471A" },
                  { label: "Call us", value: "+91 70515 75007", href: "tel:+917051575007", color: "#111111" },
                  { label: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/917051575007", color: "#25D366" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      textDecoration: "none",
                      opacity: v1 ? 1 : 0,
                      transform: v1 ? "none" : "translateX(-16px)",
                      transition: `all .7s cubic-bezier(.16,1,.3,1) ${.2 + i * 0.1}s`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.querySelector(".contact-val").style.color = item.color; }}
                    onMouseLeave={(e) => { e.currentTarget.querySelector(".contact-val").style.color = "#111111"; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F7F7F5", border: "1px solid #E4E3DD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {i === 0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                      {i === 1 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>}
                      {i === 2 && <svg width="18" height="18" viewBox="0 0 24 24" fill={item.color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{item.label}</p>
                      <p className="contact-val" style={{ fontSize: 16, fontWeight: 700, color: "#111111", transition: "color .25s" }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — hero image */}
            <div style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(30px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .1s" }}>
              <div style={{ borderRadius: "24px 24px 0 0", overflow: "hidden", height: 600 }}>
                <ImgBox src={CONTACT_IMAGES.hero} ratio="3/4" radius={0} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM + IMAGES ── */}
      <section style={{ background: "#F7F7F5", padding: "100px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref2} className="cw-grid-2" style={{ gap: 60, alignItems: "start" }}>

            {/* Left — image stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateX(-24px)", transition: "all .8s cubic-bezier(.16,1,.3,1)" }}>
              <ImgBox src={CONTACT_IMAGES.mid1} ratio="16/9" />
              <div className="cw-grid-2" style={{ gap: 16 }}>
                <ImgBox src={CONTACT_IMAGES.mid2} ratio="1/1" />
                {/* Stats card */}
                <div style={{ borderRadius: 16, background: "#E8471A", padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>24h</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8 }}>Response Time</div>
                  <div style={{ width: 32, height: 2, background: "rgba(255,255,255,.4)", marginTop: 16 }} />
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginTop: 12 }}>We reply to every inquiry within 24 hours — guaranteed.</p>
                </div>
              </div>

              {/* Why work with us */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", border: "1px solid #E4E3DD" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111111", marginBottom: 20 }}>Why work with us?</h3>
                {[
                  "Free consultation, no commitment",
                  "Detailed proposal within 48 hours",
                  "Fixed pricing, no hidden costs",
                  "30-day post-launch support included",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(232,71,26,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E8471A" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#4B5563", fontWeight: 500 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div style={{ opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateY(24px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .1s" }}>
              <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", boxShadow: "0 4px 6px rgba(0,0,0,.04), 0 24px 80px rgba(0,0,0,.08)" }}>
                <h2 style={{ fontSize: "clamp(24px,2.5vw,32px)", fontWeight: 800, color: "#111111", marginBottom: 8, letterSpacing: "-0.8px" }}>
                  Tell us about your project
                </h2>
                <p style={{ fontSize: 16, color: "#5A6270", marginBottom: 36, lineHeight: 1.7 }}>
                  We'll get back to you within 24 hours with a plan and estimate.
                </p>

                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Your Name *", type: "text", value: name, onChange: setName, placeholder: "Rohan Mehta" },
                    { label: "Email Address *", type: "email", value: email, onChange: setEmail, placeholder: "rohan@company.com" },
                    { label: "Phone (Optional)", type: "tel", value: phone, onChange: setPhone, placeholder: "+91 98765 43210" },
                  ].map((field, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#111111", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>{field.label}</label>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder={field.placeholder}
                        required={field.label.includes("*")}
                        style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #E4E3DD", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#FAFAF9", transition: "all .25s", fontFamily: "inherit" }}
                        onFocus={(e) => { e.target.style.borderColor = "#E8471A"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(232,71,26,.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E4E3DD"; e.target.style.background = "#FAFAF9"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#111111", display: "block", marginBottom: 8 }}>Tell us about your project *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you building? What's your timeline? What's your budget range?"
                      required
                      style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #E4E3DD", borderRadius: 10, fontSize: 15, minHeight: 130, outline: "none", boxSizing: "border-box", resize: "vertical", background: "#FAFAF9", transition: "all .25s", fontFamily: "inherit", lineHeight: 1.6 }}
                      onFocus={(e) => { e.target.style.borderColor = "#E8471A"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(232,71,26,.08)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E4E3DD"; e.target.style.background = "#FAFAF9"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: submitted ? "#22C55E" : "linear-gradient(135deg, #F2551F 0%, #E8471A 55%, #C93C12 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "17px 28px",
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      cursor: "pointer",
                      transition: "all .3s cubic-bezier(.16,1,.3,1)",
                      boxShadow: submitted ? "none" : "0 8px 26px rgba(232,71,26,.32), inset 0 1px 0 rgba(255,255,255,.18)",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => { if (!submitted) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 42px rgba(232,71,26,.45), inset 0 1px 0 rgba(255,255,255,.25)"; } }}
                    onMouseLeave={(e) => { if (!submitted) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(232,71,26,.32), inset 0 1px 0 rgba(255,255,255,.18)"; } }}
                  >
                    {submitted ? "Message Sent! ✓" : "Send Message →"}
                  </button>

                  <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>
                    Prefer WhatsApp?{" "}
                    <a href="https://wa.me/917051575007" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600, textDecoration: "none" }}>
                      Chat with us instantly →
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section style={{ background: "#111111", padding: "80px clamp(20px,5vw,80px)" }}>
        <div ref={ref3} className="cw-grid-4 cw-stack-mobile" style={{ maxWidth: 1320, margin: "0 auto", gap: 1 }}>
          {[
            { title: "You Reach Out", desc: "Fill the form or WhatsApp us. We respond within 24 hours.", icon: "/icons/reach-out.png" },
            { title: "Discovery Call", desc: "A quick 30-min call to understand your goals and vision.", icon: "/icons/discovery.png" },
            { title: "We Send a Plan", desc: "Detailed proposal with scope, timeline, and fixed pricing.", icon: "/icons/plan.png" },
            { title: "We Get to Work", desc: "Project kicks off. You're updated at every milestone.", icon: "/icons/work.png" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "44px 36px", borderRight: i < 3 ? "1px solid #1F2937" : "none", opacity: v3 ? 1 : 0, transform: v3 ? "none" : "translateY(20px)", transition: `all .6s cubic-bezier(.16,1,.3,1) ${i * 0.1}s` }}>
              <img
                src={s.icon}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={(e) => { e.currentTarget.style.opacity = 1; }}
                style={{ width: 46, height: 46, objectFit: "contain", marginBottom: 22, display: "block", opacity: 0, transition: "opacity .4s ease" }}
              />
              <h4 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontSize: 15, color: "#8A93A0", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff", padding: "100px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={ref4} style={{ textAlign: "center", marginBottom: 72, opacity: v4 ? 1 : 0, transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="cw-grid-2" style={{ gap: 32, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FAQS.map((faq, i) => (
                <div key={i} onClick={() => setActiveFAQ(i)}
                  style={{ padding: "18px 24px", borderRadius: 10, cursor: "pointer", transition: "all .25s", background: activeFAQ === i ? "#E8471A" : "#F7F7F5", border: `1px solid ${activeFAQ === i ? "#E8471A" : "#E4E3DD"}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                  onMouseEnter={(e) => { if (activeFAQ !== i) { e.currentTarget.style.borderColor = "rgba(232,71,26,.4)"; e.currentTarget.style.background = "#fff5f3"; } }}
                  onMouseLeave={(e) => { if (activeFAQ !== i) { e.currentTarget.style.borderColor = "#E4E3DD"; e.currentTarget.style.background = "#F7F7F5"; } }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: activeFAQ === i ? "#fff" : "#111111", transition: "color .25s" }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: activeFAQ === i ? "#fff" : "#E8471A", flexShrink: 0, transition: "transform .3s", transform: activeFAQ === i ? "rotate(45deg)" : "none", fontWeight: 300 }}>+</span>
                </div>
              ))}
            </div>
            <div className="cw-unsticky-mobile" style={{ position: "sticky", top: 100 }}>
              <div key={activeFAQ} style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1.5px solid #E8471A", boxShadow: "0 12px 48px rgba(232,71,26,.08)", animation: "faqIn .3s cubic-bezier(.16,1,.3,1)" }}>
                <div style={{ width: 40, height: 3, background: "#E8471A", borderRadius: 2, marginBottom: 20 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 14, lineHeight: 1.4 }}>{FAQS[activeFAQ].q}</h3>
                <p style={{ fontSize: 16, color: "#5A6270", lineHeight: 1.9 }}>{FAQS[activeFAQ].a}</p>
                <p style={{ fontSize: 12, color: "#C4C4C4", marginTop: 28, letterSpacing: "0.08em" }}>{activeFAQ + 1} / {FAQS.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA WITH IMAGE ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 580, display: "flex", alignItems: "center" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={CONTACT_IMAGES.bottom}
            alt=""
            decoding="async"
            onLoad={(e) => { e.currentTarget.style.opacity = 1; }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 25%",
              opacity: 0,
              transition: "opacity .6s ease",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,.45)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "100px clamp(20px,5vw,80px)", textAlign: "center", width: "100%" }}>
          <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Let's Turn Your Vision Into Reality
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.8)", marginBottom: 40, lineHeight: 1.8 }}>
            No project is too big or too small. Let's build something extraordinary together.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/917051575007" target="_blank" rel="noopener noreferrer" className="cw-btn cw-btn-wa" style={{ textTransform: "none", letterSpacing: "0.03em" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes faqIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}