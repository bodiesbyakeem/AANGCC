"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Based In",
    value: "Austin, Texas",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email Us",
    value: "info@aangcc.com",
    href: "mailto:info@aangcc.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: "Facebook",
    value: "allassnogascyclingclub",
    href: "https://www.facebook.com/allassnogascyclingclub",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: "Instagram",
    value: "@allassnogascyclingclub",
    href: "https://www.instagram.com/allassnogascyclingclub",
  },
];

function PageHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-[80px]">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/50" />
          <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Get In Touch</span>
          <span className="h-[1px] w-10 bg-white/50" />
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
          Let's <span className="text-gradient-gold">Connect</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/75 text-[16px] lg:text-[18px] max-w-[520px] mx-auto leading-relaxed">
          Questions about membership, sponsorship, or our next ride? We'd love to hear from you.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,175,165,0.3), transparent)" }} />
    </section>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xgopybwn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.ok) { setStatus("success"); setFormState({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputClass = "w-full px-5 py-3 rounded-xl bg-white/15 border border-white/25 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-200";

  return (
    <section className="relative py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
                We're always <span className="text-gradient-gold">riding.</span>
                <br />But we'll respond.
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/15 border border-white/20 group hover:bg-white/25 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 text-white">{item.icon}</div>
                      <div>
                        <div className="text-white/50 text-[11px] tracking-wide uppercase font-medium mb-[2px]">{item.label}</div>
                        <div className="text-white text-[13px]">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/15 border border-white/20">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 text-white">{item.icon}</div>
                      <div>
                        <div className="text-white/50 text-[11px] tracking-wide uppercase font-medium mb-[2px]">{item.label}</div>
                        <div className="text-white text-[13px]">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white/15 border border-white/20">
              <div className="text-white/50 text-[11px] tracking-wide uppercase font-medium mb-4">Quick Links</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Why Join The Club?", href: "/membership/why-join" },
                  { label: "Corporate Sponsorship", href: "/more/sponsorship" },
                  { label: "Donate to AANGCC", href: "/more/donate" },
                  { label: "FAQ", href: "/faq" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-2 text-white/70 text-[13px] hover:text-[#FFD84D] transition-colors duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#FFD84D]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-8">
            <div className="relative rounded-2xl bg-white overflow-hidden shadow-xl">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-8 lg:p-10">
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-16 gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border border-[#14CFC4]/30 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-[#111111] text-[28px] font-semibold mb-2">Message Sent!</h3>
                      <p className="text-[#666] text-[14px] max-w-[360px]">Thanks for reaching out. A member of the AANGCC team will get back to you within 24–48 hours.</p>
                    </div>
                    <button onClick={() => setStatus("idle")} className="px-6 py-3 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">Send Another Message</button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="font-heading text-[#111111] text-[28px] font-semibold mb-2">Send Us a Message</h3>
                      <p className="text-[#888] text-[13px]">Fill out the form below and we'll get back to you within 24–48 hours.</p>
                    </div>
                    {status === "error" && <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-500 text-[13px]">Something went wrong. Please try again or email us directly.</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Full Name *</label>
                        <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Your full name" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Email Address *</label>
                        <input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Subject</label>
                      <select name="subject" value={formState.subject} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 cursor-pointer">
                        <option value="">Select a topic</option>
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Corporate Sponsorship">Corporate Sponsorship</option>
                        <option value="Donation">Donation</option>
                        <option value="Rides & Events">Rides & Events</option>
                        <option value="Media & Press">Media & Press</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#888] text-[12px] font-medium tracking-wide uppercase">Message *</label>
                      <textarea name="message" value={formState.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={6} className="w-full px-5 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 resize-none" />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={status === "sending" || !formState.name || !formState.email || !formState.message}
                      className={`py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${formState.name && formState.email && formState.message ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"} ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactSection />
    </>
  );
}
