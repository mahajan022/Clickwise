// Shared structured-data (JSON-LD) builders.
// Centralised here so every page references one source of truth for
// business identity (name, address, contact, socials) instead of
// copy-pasting it into each component.

export const SITE_URL = "https://clicksnads.com";

// Organization + LocalBusiness combined. Rendered once, site-wide, in App.jsx.
// This is the single most important block for GEO — it's what lets AI
// engines resolve "Clicksnads" as a known entity (a Mumbai marketing agency)
// rather than just an unstructured web page.
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Clicksnads",
  alternateName: "Clicks&Ads",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    "Clicksnads is a Mumbai-based digital marketing agency and website development company offering web design, SEO, performance marketing (Google/Meta Ads), branding, and social media management.",
  email: "anuragg7051@gmail.com",
  telephone: "+91-70515-75007",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Mumbai" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "₹8,000 – ₹5,00,000+",
  sameAs: [
    "https://www.instagram.com/clicksnads/",
    "https://www.linkedin.com/company/clicks-ads/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-70515-75007",
    email: "anuragg7051@gmail.com",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

// WebSite schema — put this on the homepage only.
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Clicksnads",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Turns a [{q, a}] array (already used across About/Services/Contact) into
// FAQPage JSON-LD. Reuses existing copy — no new content to write.
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

// Turns the SERVICES array (globals.js) into an ItemList of Service
// entities, each tied back to the Organization as provider.
export function servicesSchema(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Mumbai, India",
      },
    })),
  };
}

// Small helper so every page doesn't repeat json+ld boilerplate.
export function jsonLdScript(data) {
  return JSON.stringify(data);
}