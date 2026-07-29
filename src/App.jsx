import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader, Navbar, Footer } from "./components";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import "./index.css";
import ChatBot from './ChatBot'
import { ORGANIZATION_SCHEMA, jsonLdScript } from "./seo";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{jsonLdScript(ORGANIZATION_SCHEMA)}</script>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ChatBot />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [shown, setShown] = useState(false);
  const done = () => { setShown(true); setTimeout(() => setLoading(false), 750); };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {loading && <Loader onDone={done} />}
      <div style={{ opacity: shown ? 1 : 0, transition: "opacity .9s ease" }}>
        <Layout />
      </div>
    </BrowserRouter>
  );
}