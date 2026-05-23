import { useState } from "react";
import { Link } from "react-router-dom";
import { useInView, PageBanner } from "../components";
import { STATS } from "../globals";

/* 3D Icons — paste your icon image paths here */
/* 
  HOW TO ADD 3D ICONS:
  1. Download free 3D icons from: https://3dicons.co OR https://iconscout.com/3d-illustrations
  2. Save them in /public/icons/ folder e.g. public/icons/icon-craft.png
  3. Replace the src in each icon below e.g. src="/icons/icon-craft.png"
*/
const Icon3D = ({ src, fallback = "🎯", size = 64 }) => (
  src
    ? <img src={src} alt="" style={{ width: size, height: size, objectFit: "contain" }} />
    : <span style={{ fontSize: size * 0.6 }}>{fallback}</span>
);

export default function About() {
  const [ref1, v1] = useInView();
  const [ref2, v2] = useInView();
  const [ref3, v3] = useInView();
  const [ref4, v4] = useInView();
  const [ref5, v5] = useInView();
  const [ref6, v6] = useInView();
  const [ref7, v7] = useInView();
  const [ref8, v8] = useInView();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const values = [
    {
      /* ICON: replace null with "/icons/icon-craft.png" after downloading from 3dicons.co */
      icon3d: null, fallback: "✦",
      title: "Craft First",
      desc: "Every pixel and every line of code matters deeply to us. We obsess over micro-details — typography spacing, hover states, loading performance — because these small things compound into extraordinary user experiences that clients remember and trust.",
    },
    {
      icon3d: null, fallback: "◎",
      title: "Results Driven",
      desc: "Beautiful design that doesn't convert is just expensive decoration. Every design decision we make is backed by conversion data, user psychology, and business strategy. We measure success in leads generated, sales made, and revenue grown — not just aesthetics.",
    },
    {
      icon3d: null, fallback: "◈",
      title: "Radical Transparency",
      desc: "You'll never wonder what we're working on or when it'll be done. We share detailed project timelines, weekly updates, and honest assessments — even when the news isn't perfect. Clear communication builds trust, and trust builds long relationships.",
    },
    {
      icon3d: null, fallback: "⬡",
      title: "Always Innovating",
      desc: "The digital landscape changes fast. We invest heavily in staying ahead — learning new frameworks, testing emerging AI tools, studying global design trends — so your brand benefits from cutting-edge thinking, not yesterday's best practices.",
    },
    {
      icon3d: null, fallback: "◇",
      title: "True Partnership",
      desc: "We don't clock out at 5pm on your project. We think about your business during off-hours because we're genuinely invested in your success. When you win, we win. This partner mentality drives everything we do — from strategy to after-launch support.",
    },
    {
      icon3d: null, fallback: "△",
      title: "Zero Compromise",
      desc: "We've walked away from projects where quality was being negotiated away. Our reputation is built on exceptional work, not adequate work. Every deliverable goes through rigorous internal review before it ever reaches your eyes.",
    },
  ];

  const process = [
    { num: "01", title: "Deep Discovery", desc: "We don't start designing until we truly understand your business, your customers, your competitors, and your goals. This phase includes a detailed brief, competitor audit, and a strategy session where we align on vision and direction.", time: "1–2 days" },
    { num: "02", title: "Strategy & Architecture", desc: "Before any visuals, we map out the complete site structure, user journey, and conversion strategy. Every page has a purpose, every button has an intent. We create a detailed blueprint that serves as the foundation for everything that follows.", time: "1–3 days" },
    { num: "03", title: "Design & Concept", desc: "Our designers craft pixel-perfect mockups in Figma — from hero sections to mobile views. We iterate fast, incorporate your feedback quickly, and ensure the final design is not just beautiful but strategically sound and brand-consistent.", time: "3–7 days" },
    { num: "04", title: "Development", desc: "Hand-coded in React or your chosen stack. No bloated page builders, no generic templates. Clean, semantic, performant code that loads fast, ranks on Google, and scales with your business. Every site is fully responsive and tested across 15+ devices.", time: "3–10 days" },
    { num: "05", title: "QA & Launch", desc: "Before going live, every site goes through our 50-point quality checklist — speed tests, SEO audit, form testing, cross-browser checks, accessibility review. We don't launch until it's perfect. Then we handle the full deployment.", time: "1–2 days" },
    { num: "06", title: "Growth & Support", desc: "Launch day is just the beginning. We monitor performance, track analytics, fix any issues within 24 hours, and provide ongoing strategic recommendations. Monthly retainers available for brands that want a long-term digital growth partner.", time: "Ongoing" },
  ];

  const faqs = [
    { q: "How does the design process work?", a: "We follow a 6-phase collaborative approach: Discovery → Strategy → Design → Development → QA → Launch. You're involved at every key milestone with regular updates, Figma previews, and feedback rounds. Nothing goes to the next phase without your sign-off." },
    { q: "What's included in a website redesign?", a: "Complete site audit, competitor analysis, new design in Figma, full development, content migration, SEO setup, speed optimization, and 30 days of free post-launch support. We ensure zero downtime during the switchover." },
    { q: "How long does a project take?", a: "Landing pages: 3–5 days. Standard websites: 7–14 days. Complex web apps or full brand + web packages: 3–6 weeks. We provide a detailed timeline with milestones before starting, so you always know exactly what to expect and when." },
    { q: "Do you offer ongoing support?", a: "Yes — we offer monthly retainer packages starting from ₹5,000/month covering updates, backups, security monitoring, performance optimization, and priority support. Perfect for businesses that want a reliable digital partner long-term." },
    { q: "What's your approach to SEO?", a: "We build SEO into the foundation — proper heading hierarchy, semantic HTML, meta tags, schema markup, Core Web Vitals optimization, and fast load times. We also offer ongoing SEO services including content strategy, keyword targeting, and AI search optimization (ChatGPT, Perplexity)." },
    { q: "Can you help with existing projects?", a: "Absolutely. We regularly take over projects from other agencies or freelancers, audit the codebase, redesign specific sections, or build on top of existing systems. No lock-in — you can work with us project-by-project or on retainer." },
    { q: "What does it cost?", a: "Logo design starts from ₹8,000. Landing pages from ₹15,000. Full websites from ₹25,000. Brand + web packages from ₹40,000. MERN stack apps quoted custom based on scope. We're transparent about pricing — no hidden costs, no surprise invoices." },
    { q: "Do you work outside Mumbai?", a: "Entirely remote-friendly. We work with clients across India and internationally — Australia, UAE, UK, US. All collaboration happens via Figma, WhatsApp, email, and video calls. Different timezone? We're flexible with meeting schedules." },
  ];

  const ImgBox = ({ src, ratio = "4/3" }) => (
    <div style={{ width: "100%", aspectRatio: ratio, borderRadius: 14, overflow: "hidden", background: "#e8e8e8", boxShadow: "0 12px 40px rgba(17,17,17,.08)" }}>
      {src && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
    </div>
  );

  return (
    <div className="page-enter">
      <PageBanner
        tag="ABOUT"
        title="A Mumbai studio that builds legendary brands."
        sub="We combine beautiful design, clean code, and smart strategy to help ambitious businesses grow, convert, and dominate online."
      />

      {/* ── WHO WE ARE ── */}
      <section style={{ background: "#fff", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "center" }}>
          <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateX(-24px)", transition: "all .9s cubic-bezier(.16,1,.3,1)" }}>
            {/* REPLACE: src="/about-main.jpg" */}
            <ImgBox ratio="4/3" />
          </div>
          <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(24px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .1s" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, lineHeight: 1.1, color: "#111111", marginBottom: 24, letterSpacing: "-1px" }}>
              We don't just build websites.<br />We build businesses.
            </h2>
            <p style={{ fontSize: 15, fontWeight: 400, color: "#4B5563", lineHeight: 1.9, marginBottom: 20 }}>
              Clickwise was born from a frustration with agencies that charged premium prices for mediocre, templated work. We believed Mumbai's businesses deserved better — design that actually converts, code that actually performs, and strategy that actually drives growth.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 20 }}>
              Since our founding, we've partnered with startups launching their first product, mid-sized companies scaling their digital presence, and established brands reinventing themselves for the digital age. Each project gets the same level of obsession — because we understand that your website is your most important salesperson, working 24/7.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>
              Today, Clickwise is a full-service creative digital agency offering web design, development, brand identity, photography, social media, SEO, and growth marketing — all under one roof, with one point of contact, and one standard: excellence.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 48, paddingTop: 40, borderTop: "1px solid #E4E3DD" }}>
              {STATS.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#E8471A", letterSpacing: "-1px", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY TIMELINE ── */}
      <section style={{ background: "#fff", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref3} style={{ textAlign: "center", marginBottom: 80, opacity: v3 ? 1 : 0, transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px" }}>How We Got Here.</h2>
            <p style={{ fontSize: 15, color: "#6B7280", marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
              Every great agency has a story. Ours started with a simple question: why can't Indian businesses get world-class digital work?
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { year: "2021", title: "The Spark", desc: "Founded by Anuragg out of a home office in Mumbai. First client was a local restaurant that needed a proper website. Delivered it in 4 days. They called it the best investment they'd ever made. That feedback became our north star.", color: "#E8471A" },
                { year: "2022", title: "Gaining Momentum", desc: "Word spread fast. 15+ projects in the first full year — logos, websites, brand identities. First retainer client signed. Moved from freelance to a proper studio setup. Started turning down bad-fit clients to focus on quality.", color: "#E8471A" },
                { year: "2023", title: "Building the Team", desc: "Brought in a developer and a growth strategist. Launched MERN stack development services. First international client — a startup in Dubai. Revenue tripled. Still said no to more clients than we said yes to.", color: "#E8471A" },
                { year: "2024", title: "Premium Agency", desc: "50+ projects delivered. 30+ happy clients. Featured in local business press. Full suite of services — design, dev, brand, SEO, social, AI automation. 100% client satisfaction rate. Not bragging — just keeping score.", color: "#E8471A" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 0, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 24 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em", flexShrink: 0 }}>{item.year}</div>
                    {i < 3 && <div style={{ width: 2, flex: 1, background: "#E4E3DD", marginTop: 8, marginBottom: 8, minHeight: 40 }} />}
                  </div>
                  <div style={{ paddingTop: 10, paddingBottom: 40, opacity: v3 ? 1 : 0, transform: v3 ? "none" : "translateX(-16px)", transition: `all .7s cubic-bezier(.16,1,.3,1) ${i * 0.12}s` }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111111", marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.9 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              {/* REPLACE: src="/story-image.jpg" */}
              <ImgBox ratio="4/5" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES with 3D icons ── */}
      <section style={{ background: "#111111", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref4} style={{ marginBottom: 80, opacity: v4 ? 1 : 0, transform: v4 ? "none" : "translateY(20px)", transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>The Values That Drive Us.</h2>
            <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 560, lineHeight: 1.8 }}>
              These aren't words on a wall. They're filters we apply to every decision, every hire, and every project we take on.
            </p>
          </div>
          {/* 
            3D ICONS INSTRUCTIONS:
            1. Go to https://3dicons.co (free) or https://iconscout.com/3d-illustrations
            2. Search for: "rocket", "target", "chat", "bulb", "handshake", "diamond"
            3. Download as PNG (transparent background)
            4. Save in: public/icons/icon-craft.png, icon-results.png, etc.
            5. Replace icon3d: null with icon3d: "/icons/icon-craft.png"
          */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {values.map((val, i) => (
              <div key={i}
                style={{
                  padding: "52px 44px",
                  background: "#161616",
                  borderLeft: i % 3 !== 0 ? "1px solid #1F2937" : "none",
                  borderBottom: i < 3 ? "1px solid #1F2937" : "none",
                  opacity: v4 ? 1 : 0,
                  transform: v4 ? "none" : "translateY(30px)",
                  transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1c1c1c"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#161616"; }}
              >
                <div style={{ marginBottom: 24, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon3D src={val.icon3d} fallback={val.fallback} size={64} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{val.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.85 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK (PROCESS) ── */}
      <section style={{ background: "#fff", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref5} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px", marginBottom: 24, lineHeight: 1.1 }}>
                How We Work.<br />Every Single Time.
              </h2>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.9, marginBottom: 32 }}>
                Our 6-phase process has been refined over 50+ projects. It eliminates guesswork, reduces revisions, and ensures you always know exactly where your project stands.
              </p>
              {/* REPLACE: src="/process-image.jpg" */}
              <ImgBox ratio="4/3" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {process.map((step, i) => (
                <div key={i} style={{ borderBottom: i < process.length - 1 ? "1px solid #E4E3DD" : "none", padding: "32px 0", opacity: v5 ? 1 : 0, transform: v5 ? "none" : "translateX(20px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "#E8471A", letterSpacing: "0.1em" }}>{step.num}</span>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>{step.title}</h3>
                    </div>
                    <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.08em", background: "#F7F7F5", padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{step.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.85, paddingLeft: 32 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CLICKWISE ── */}
      <section style={{ background: "#F7F7F5", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref6} style={{ textAlign: "center", marginBottom: 80, opacity: v6 ? 1 : 0, transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px" }}>Why Brands Choose Clickwise.</h2>
            <p style={{ fontSize: 15, color: "#6B7280", marginTop: 16, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.8 }}>
              There are hundreds of agencies in Mumbai. Here's what makes us different — and why our clients stay.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { num: "01", title: "Everything Under One Roof", desc: "Brand identity, website, photography, social media, SEO, growth marketing, AI automation — we do it all. No need to manage 5 different vendors. One team, one vision, zero fragmentation. This alone saves most clients 30% in costs and weeks in coordination time." },
              { num: "02", title: "Custom Everything, No Templates", desc: "We hand-code and hand-design everything. No Squarespace. No Wix. No WordPress page builders. Pure, clean, custom code that loads in under 2 seconds, ranks on Google, and can be extended infinitely as your business grows." },
              { num: "03", title: "Speed Without Sacrificing Quality", desc: "Most agencies take 6–8 weeks for a website. We deliver the same quality in 7–21 days. How? Refined processes, focused team, and zero scope creep. Fast doesn't mean rushed — it means experienced." },
              { num: "04", title: "Mumbai-Based, Global Standards", desc: "We're deeply rooted in Mumbai's business culture and understand Indian markets. But our design aesthetic, technical quality, and strategic thinking match or exceed global agencies — at a fraction of the cost." },
              { num: "05", title: "Honest Pricing, No Surprises", desc: "We quote the full project price upfront. No discovery fees, no change order games, no invoice shock. What we quote is what you pay. If scope changes, we discuss it openly before doing the work." },
              { num: "06", title: "Partners, Not Vendors", desc: "We don't disappear after launch. We're available on WhatsApp. We proactively suggest improvements. We track your analytics and flag opportunities. Clients who've worked with us for 2+ years call us an extension of their team — and that's exactly how we think of ourselves." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "40px 36px", background: "#fff", borderRadius: 14, border: "1px solid #E4E3DD", opacity: v6 ? 1 : 0, transform: v6 ? "none" : "translateY(24px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(17,17,17,.1)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, color: "#E8471A", letterSpacing: "0.12em", marginBottom: 16 }}>{item.num}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111111", marginBottom: 14 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.85 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#E8471A", padding: "80px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={ref7} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", opacity: v7 ? 1 : 0, transform: v7 ? "none" : "translateY(20px)", transition: `all .6s cubic-bezier(.16,1,.3,1) ${i * 0.1}s` }}>
                <div style={{ fontSize: "clamp(40px,5vw,72px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>{s.v}</div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginTop: 12 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — Two Column ── */}
      <section style={{ background: "#F7F7F5", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={ref8} style={{ textAlign: "center", marginBottom: 80, opacity: v8 ? 1 : 0, transition: "all .7s" }}>
            <h2 style={{ fontSize: "clamp(30px,3vw,50px)", fontWeight: 800, color: "#111111", letterSpacing: "-1px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {faqs.map((faq, i) => (
                <div key={i} onClick={() => setActiveFAQ(i)}
                  style={{ padding: "18px 24px", borderRadius: 10, cursor: "pointer", transition: "all .3s", background: activeFAQ === i ? "#E8471A" : "#fff", border: `1px solid ${activeFAQ === i ? "#E8471A" : "#E4E3DD"}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                  onMouseEnter={(e) => { if (activeFAQ !== i) e.currentTarget.style.borderColor = "rgba(232,71,26,.4)"; }}
                  onMouseLeave={(e) => { if (activeFAQ !== i) e.currentTarget.style.borderColor = "#E4E3DD"; }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: activeFAQ === i ? "#fff" : "#111111" }}>{faq.q}</span>
                  <span style={{ color: activeFAQ === i ? "#fff" : "#E8471A", fontSize: 18, flexShrink: 0 }}>{activeFAQ === i ? "✕" : "+"}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #E4E3DD", boxShadow: "0 12px 40px rgba(17,17,17,.06)", position: "sticky", top: 100 }}>
              <div style={{ width: 40, height: 3, background: "#E8471A", borderRadius: 2, marginBottom: 24 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 16, lineHeight: 1.4 }}>{faqs[activeFAQ].q}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9 }}>{faqs[activeFAQ].a}</p>
              <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 32, letterSpacing: "0.1em" }}>{activeFAQ + 1} / {faqs.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#E8471A", padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: "#fff", marginBottom: 20, lineHeight: 1.1, letterSpacing: "-1px" }}>
            Ready to partner with us?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", marginBottom: 36, lineHeight: 1.8 }}>
            Let's build something extraordinary together. Free consultation, no commitment. Just an honest conversation about your goals.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn-white" style={{ textDecoration: "none" }}>Start a Project →</Link>
            <a href="https://wa.me/917051575007" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 700, color: "#E8471A", background: "#fff", padding: "13px 28px", borderRadius: 4, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid #fff", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#E8471A"; }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}