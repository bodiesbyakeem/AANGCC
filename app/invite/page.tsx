"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function InvitePage() {
  const supabase = createClient();
  const [token, setToken] = useState<string | null>(null);
  const [invite, setInvite] = useState<{
    invitee_name: string;
    invitee_email: string;
    membership_type: string;
    inviter_name?: string;
  } | null>(null);
  const [status, setStatus] = useState<"loading" | "valid" | "expired" | "used" | "error">("loading");
  const [form, setForm] = useState({ password: "", confirm_password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (!t) { setStatus("error"); return; }
    setToken(t);
    validateToken(t);
  }, []);

  const validateToken = async (t: string) => {
    try {
      const res = await fetch(`/api/invite/validate?token=${t}`);
      const data = await res.json();
      if (data.valid) {
        setInvite(data.invite);
        setStatus("valid");
      } else if (data.reason === "expired") {
        setStatus("expired");
      } else if (data.reason === "used") {
        setStatus("used");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.password || form.password.length < 8) {
      setError("Password must be at least 8 characters."); return;
    }
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match."); return;
    }
    if (!token || !invite) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/invite/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: invite.invitee_email,
          password: form.password,
          full_name: invite.invitee_name,
          membership_type: invite.membership_type,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to create account. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[480px] text-center">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-10">
            <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M8 18L14 24L28 12" stroke="#14CFC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-heading text-[#111] text-[28px] font-semibold mb-3">Welcome to AANGCC!</h2>
            <p className="text-[#666] text-[14px] leading-relaxed mb-8">
              Your account has been created successfully. Sign in to access the member portal, sign your waiver, and complete your profile.
            </p>
            <Link href="/membership/members-only"
              className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300 block text-center">
              Sign In to Portal →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Expired screen
  if (status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[480px] text-center">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-10">
            <span className="text-5xl block mb-4">⏰</span>
            <h2 className="font-heading text-[#111] text-[26px] font-semibold mb-3">Invite Link Expired</h2>
            <p className="text-[#666] text-[14px] leading-relaxed mb-6">
              This invite link has expired (links are valid for 48 hours). Please ask the person who invited you to send a new invite from their member portal.
            </p>
            <Link href="/" className="text-[#14CFC4] text-[13px] font-semibold hover:underline">← Back to AANGCC</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Already used screen
  if (status === "used") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[480px] text-center">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-10">
            <span className="text-5xl block mb-4">✅</span>
            <h2 className="font-heading text-[#111] text-[26px] font-semibold mb-3">Already Activated</h2>
            <p className="text-[#666] text-[14px] leading-relaxed mb-6">
              This invite link has already been used. Sign in to access your account.
            </p>
            <Link href="/membership/members-only"
              className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300 block text-center">
              Sign In →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error screen
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[480px] text-center">
          <div className="h-[4px] w-full bg-red-400" />
          <div className="p-10">
            <span className="text-5xl block mb-4">❌</span>
            <h2 className="font-heading text-[#111] text-[26px] font-semibold mb-3">Invalid Invite Link</h2>
            <p className="text-[#666] text-[14px] leading-relaxed mb-6">
              This invite link is invalid or has been removed. Please contact your inviter for a new link.
            </p>
            <Link href="/" className="text-[#14CFC4] text-[13px] font-semibold hover:underline">← Back to AANGCC</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading screen
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 text-[13px]">Validating your invite...</p>
        </div>
      </div>
    );
  }

  // Valid invite — registration form
  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <div className="max-w-[560px] mx-auto px-6 lg:px-10">

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="py-10 text-center">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-4" />
          </Link>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
            <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">You've Been Invited</span>
          </div>
          <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight mb-3">
            Join <span className="text-gradient-gold">AANGCC</span>
          </h1>
          <p className="text-white/65 text-[15px] leading-relaxed">
            Welcome, <strong className="text-white">{invite?.invitee_name}</strong>! You've been invited to join as a <strong className="text-white">{invite?.membership_type}</strong> member.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-8">
            <h2 className="font-heading text-[#111] text-[22px] font-semibold mb-1">Create Your Account</h2>
            <p className="text-[#888] text-[13px] mb-6">
              Your email is <strong>{invite?.invitee_email}</strong>. Set a password to activate your account.
            </p>

            {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address</label>
                <input type="email" value={invite?.invitee_email || ""} disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 text-[#888] text-[14px] bg-gray-50 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Password *</label>
                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Min. 8 characters" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Confirm Password *</label>
                <input type="password" value={form.confirm_password} onChange={e => setForm(p => ({ ...p, confirm_password: e.target.value }))}
                  placeholder="Repeat your password" className={inputClass}
                  onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }} />
              </div>

              <div className="p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/20">
                <p className="text-[#555] text-[12px] leading-relaxed">
                  After creating your account you'll be asked to sign AANGCC's Waiver of Liability (Version 3.0) and complete your member profile before accessing the directory.
                </p>
              </div>

              <button onClick={handleSubmit} disabled={submitting || !form.password || !form.confirm_password}
                className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 flex items-center justify-center gap-2 ${!submitting && form.password && form.confirm_password ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</>
                ) : "Activate My Account →"}
              </button>

              <p className="text-[#aaa] text-[11px] text-center">
                Questions? <a href="mailto:info@allassnogascyclingclub.com" className="text-[#14CFC4] hover:underline">info@allassnogascyclingclub.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
