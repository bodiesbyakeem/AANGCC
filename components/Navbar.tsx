"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "We Support", href: "/about/we-support" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    dropdown: [
      { label: "Why Join The Club?", href: "/membership/why-join" },
      { label: "Members Only", href: "/membership/members-only" },
    ],
  },
  {
    label: "Ride Calendar",
    href: "/rides",
    dropdown: [
      { label: "Team Photos", href: "/rides/photos" },
      { label: "Ride Levels", href: "/rides/levels" },
      { label: "MS 150 Team", href: "/rides/ms150" },
      { label: "Ride To End ALZ Team", href: "/rides/alz" },
      { label: "Rosedale Ride Team", href: "/rides/rosedale" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "#",
    dropdown: [
      { label: "Corporate Sponsorship", href: "/more/sponsorship" },
      
      { label: "Donate to AANGCC", href: "https://donate.stripe.com/7sY8wH3bgcnh0WQ6CV5AQ0g" },
      { label: "Club Rules", href: "/more/club-rules" },
      { label: "Code of Conduct", href: "/more/code-of-conduct" },
      { label: "Club Bylaws", href: "/more/bylaws" },
      { label: "Waiver of Liability", href: "/more/waiver" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.4s ease",
          backgroundColor: scrolled ? "#0FAFA5" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.15)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>

            {/* ── Logo only — no wordmark ── */}
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
              <img
                src="/images/club-logo.png"
                alt="All Ass No Gas Cycling Club"
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
            </Link>

            {/* ── Desktop Nav — centered ── */}
            {isDesktop && (
              <nav style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}>
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    style={{ position: "relative" }}
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        textTransform: "uppercase",
                        color: activeDropdown === link.label ? "#FFD84D" : "rgba(255,255,255,0.85)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD84D")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = activeDropdown === link.label ? "#FFD84D" : "rgba(255,255,255,0.85)")}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>

                    {/* Gold underline */}
                    {activeDropdown === link.label && (
                      <div style={{ position: "absolute", bottom: 0, left: "10px", right: "10px", height: "2px", backgroundColor: "#FFD84D", borderRadius: "2px" }} />
                    )}

                    {/* Dropdown */}
                    <AnimatePresence>
                      {link.dropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop: "8px",
                            minWidth: "210px",
                            zIndex: 100,
                            backgroundColor: "#FFFFFF",
                            borderRadius: "14px",
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                          }}
                        >
                          {link.dropdown.map((item, i) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "12px 20px",
                                fontSize: "11px",
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-inter), Inter, sans-serif",
                                color: "#111111",
                                textDecoration: "none",
                                borderTop: i !== 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
                                transition: "color 0.15s, background 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#0FAFA5";
                                e.currentTarget.style.backgroundColor = "rgba(15,175,165,0.06)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#111111";
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            )}

            {/* ── Right: CTA + Hamburger ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              {isDesktop && (
                <Link
                  href="/membership/why-join"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "10px 22px",
                    borderRadius: "10px",
                    backgroundColor: "#111111",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFD84D";
                    e.currentTarget.style.color = "#111111";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#111111";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Join The Club
                </Link>
              )}

              {!isDesktop && (
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}
                  aria-label="Toggle menu"
                >
                  <span style={{ display: "block", width: "20px", height: "1.5px", backgroundColor: "white", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(0, 6.5px)" : "none" }} />
                  <span style={{ display: "block", width: "16px", height: "1.5px", backgroundColor: "white", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
                  <span style={{ display: "block", width: "20px", height: "1.5px", backgroundColor: "white", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(0, -6.5px)" : "none" }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
                width: "85vw",
                maxWidth: "360px",
                backgroundColor: "#0FAFA5",
                borderLeft: "1px solid rgba(255,255,255,0.15)",
                overflowY: "auto",
              }}
            >
              {/* Panel header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                  <img src="/images/club-logo.png" alt="AANGCC" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                          {link.label}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s", transform: mobileExpanded === link.label ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden", paddingLeft: "16px" }}
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "8px", color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter), Inter, sans-serif", textDecoration: "none" }}
                                >
                                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#FFD84D", flexShrink: 0 }} />
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "12px 16px", borderRadius: "10px", color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), Inter, sans-serif", textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.15)", marginTop: "8px" }}>
                <Link
                  href="/membership/join"
                  onClick={() => setMobileOpen(false)}
                  style={{ display: "block", width: "100%", textAlign: "center", padding: "16px", borderRadius: "12px", backgroundColor: "#111111", color: "white", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), Inter, sans-serif", textDecoration: "none" }}
                >
                  Join The Club
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
