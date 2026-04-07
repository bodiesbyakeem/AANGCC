"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Club",
    links: [
      { label: "About Us", href: "/about" },
      { label: "We Support", href: "/about/we-support" },
      { label: "Club Rules", href: "/more/club-rules" },
      { label: "Code of Conduct", href: "/more/code-of-conduct" },
      { label: "Privacy Notice", href: "/privacy" },
    ],
  },
  {
    heading: "Membership",
    links: [
      { label: "Join The Club", href: "/membership/join" },
      { label: "Members Only", href: "/membership/members-only" },
      { label: "Waiver of Liability", href: "/more/waiver" },
      { label: "Corporate Sponsorship", href: "/more/sponsorship" },
      { label: "Support MS ALZ RR", href: "/donate" },
    ],
  },
  {
    heading: "Rides",
    links: [
      { label: "Ride Calendar", href: "/rides" },
      { label: "Ride Levels", href: "/rides/levels" },
      { label: "MS 150 Team", href: "/rides/ms150" },
      { label: "Ride To End ALZ Team", href: "/rides/alz" },
      { label: "Rosedale Ride Team", href: "/rides/rosedale" },
      { label: "Team Photos", href: "/rides/photos" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/allassnogascyclingclub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/allassnogascyclingclub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@allassnogascyclingclub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0FAFA5", borderTop: "1px solid rgba(255,255,255,0.15)", overflow: "hidden", position: "relative" }}>

      {/* Top accent line */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

      {/* Glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "rgba(255,255,255,0.05)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

        {/* Main grid */}
        <div style={{ padding: "64px 0 48px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "64px", alignItems: "start" }}>

          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "200px" }}>

            <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
              <img
                src="/images/club-logo.png"
                alt="All Ass No Gas Cycling Club"
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
            </Link>

            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: "1.7", maxWidth: "260px" }}>
              Austin's premier cycling community. We ride hard, build bonds, and support the National Multiple Sclerosis Society with every mile.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFD84D";
                    e.currentTarget.style.borderColor = "rgba(255,216,77,0.5)";
                    e.currentTarget.style.backgroundColor = "rgba(255,216,77,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Donate buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="https://events.nationalmssociety.org/teams/90906/donate"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FFD84D", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                  Donate to MS 150 Team
                </span>
              </a>
              <a
                href="https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FFD84D", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                  Donate to ALZ Ride Team
                </span>
              </a>
              <a
                href="https://donate.stripe.com/7sY8wH3bgcnh0WQ6CV5AQ0g"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FFD84D", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                  Donate to AANGCC
                </span>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h4 style={{ color: "white", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "20px" }}>
                  {col.heading}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD84D")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "20px 0",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", letterSpacing: "0.04em" }}>
            © {currentYear} All Ass No Gas Cycling Club. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { label: "Waiver of Liability", href: "/more/waiver" },
              { label: "Club Rules", href: "/more/club-rules" },
              { label: "Privacy Notice", href: "/privacy" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD84D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
