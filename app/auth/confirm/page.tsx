"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function AuthConfirmPage() {
  const router = useRouter();
  const supabase = createClient();
  const [tokenHash, setTokenHash] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activated, setActivated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTokenHash(params.get("token_hash"));
    setType(params.get("type"));
  }, []);

  const handleConfirm = async () => {
    if (!tokenHash || !type) {
      setError("Invalid or missing token. Please request a new link.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });

    if (error) {
      setError("This link has expired or already been used. Please request a new link.");
      setLoading(false);
      return;
    }

    if (type === "recovery") {
      router.push("/auth/reset-password");
    } else {
      // For invite — show password creation form
      setActivated(true);
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");

    if (password !== confirm) {
      setSaveError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setSaveError("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }

    // Password set — go to portal
    window.location.href = "/portal";
  };

  const inputClass = "w-full px-5 py-3.5 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Logo */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-8">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-20 h-20 object-contain mx-auto mb-4" />
          </Link>
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-medium">Member Portal</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-8">

            {/* Step 1: Activate button */}
            {!activated ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h1 className="font-heading text-[#111111] text-[26px] font-semibold mb-2">Welcome to AANGCC!</h1>
                <p className="text-[#888] text-[14px] leading-relaxed mb-8 max-w-[320px] mx-auto">
                  Click below to activate your membership and create your password.
                </p>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] text-left">
                    {error}
                    <div className="mt-3">
                      <Link href="/membership/members-only" className="text-[#14CFC4] font-semibold hover:underline text-[12px]">Back to Sign In →</Link>
                    </div>
                  </div>
                )}

                {!error && (
                  <button
                    onClick={handleConfirm}
                    disabled={loading || !tokenHash}
                    className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${tokenHash && !loading ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Activating...</>
                    ) : "Activate My Membership"}
                  </button>
                )}
                <p className="text-[#aaa] text-[11px] mt-5">This link is single-use and expires after 24 hours.</p>
              </div>
            ) : (
              /* Step 2: Set password */
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-emerald-600 text-[13px] font-semibold">Account activated successfully!</span>
                </div>
                <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-1">Create Your Password</h2>
                <p className="text-[#888] text-[13px] mb-6">Set a password to sign in to your member portal going forward.</p>

                {saveError && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{saveError}</div>
                )}

                <form onSubmit={handleSetPassword} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Confirm Password</label>
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your password" required className={inputClass} />
                  </div>
                  <button type="submit" disabled={saving || !password || !confirm}
                    className={`mt-2 w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${password && confirm && !saving ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                  >
                    {saving ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Setting up portal...</>) : "Enter the Portal →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-center mt-6">
          <Link href="/membership/members-only" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">← Back to Sign In</Link>
        </motion.div>
      </div>
    </div>
  );
}
