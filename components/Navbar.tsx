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
      { label: "Donate to AANGCC", href: "/more/donate" },
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
          backgroundColor: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
              <img
                src="/images/AANGCC WEB LOGO.png"
                alt="AANGCC"
                style={{ width: "42px", height: "42px", objectFit: "contain" }}
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ color: "white", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  All Ass No Gas
                </span>
                <span style={{ color: "#2A9D9E", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginTop: "3px" }}>
                  Cycling Club · Austin, TX
                </span>
              </div>
            </Link>

            {/* Desktop Nav — centered */}
            {isDesktop && (
              <nav style={{ display: "flex", alignItems: "center", gap: "4px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
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
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        color: activeDropdown === link.label ? "white" : "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = activeDropdown === link.label ? "white" : "rgba(255,255,255,0.6)")}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>

                    {/* Teal underline */}
                    {activeDropdown === link.label && (
                      <div style={{ position: "absolute", bottom: 0, left: "12px", right: "12px", height: "2px", backgroundColor: "#2A9D9E", borderRadius: "2px" }} />
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
                            minWidth: "200px",
                            zIndex: 100,
                            backgroundColor: "#141414",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                          }}
                        >
                          {link.dropdown.map((item, i) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "12px 20px",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.6)",
                                textDecoration: "none",
                                borderTop: i !== 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                transition: "color 0.15s, background 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
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

            {/* Right: CTA + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              {isDesktop && (
                <Link
                  href="/membership/why-join"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    backgroundColor: "#2A9D9E",
                    color: "black",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "background 0.3s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFD84D")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A9D9E")}
                >
                  Join The Club
                </Link>
              )}

              {/* Hamburger — always visible on mobile */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
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
                backgroundColor: "#0a0a0a",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                overflowY: "auto",
              }}
            >
              {/* Panel header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                  <img src="/images/AANGCC WEB LOGO.png" alt="AANGCC" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
                  <span style={{ color: "white", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em" }}>AANGCC</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}
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
                          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "12px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500 }}
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
                                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderRadius: "8px", color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}
                                >
                                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#2A9D9E", flexShrink: 0 }} />
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
                        style={{ display: "block", padding: "12px 16px", borderRadius: "12px", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "16px" }}>
                <Link
                  href="/membership/why-join"
                  onClick={() => setMobileOpen(false)}
                  style={{ display: "block", width: "100%", textAlign: "center", padding: "16px", borderRadius: "12px", backgroundColor: "#2A9D9E", color: "black", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
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
