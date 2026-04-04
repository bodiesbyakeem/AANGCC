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

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase injects the session from the reset link automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/portal");
    }, 2500);
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

            {success ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-heading text-[#111111] text-[26px] font-semibold mb-2">Password Updated!</h2>
                <p className="text-[#888] text-[13px] leading-relaxed">Your password has been changed. Redirecting you to the portal...</p>
              </div>
            ) : !ready ? (
              <div className="text-center py-6">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-[#14CFC4] rounded-full animate-spin mx-auto mb-4" />
                <h2 className="font-heading text-[#111111] text-[22px] font-semibold mb-2">Verifying Reset Link</h2>
                <p className="text-[#888] text-[13px] leading-relaxed mb-6">Please wait while we verify your reset link...</p>
                <p className="text-[#aaa] text-[12px]">
                  If nothing happens,{" "}
                  <Link href="/membership/members-only" className="text-[#14CFC4] hover:underline">
                    request a new link
                  </Link>
                </p>
              </div>
            ) : (
              <>
                <h1 className="font-heading text-[#111111] text-[26px] font-semibold mb-1">Set New Password</h1>
                <p className="text-[#888] text-[13px] mb-7">Enter a new password for your AANGCC account.</p>

                {error && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>
                )}

                <form onSubmit={handleReset} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Confirm Password</label>
                    <input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your password"
                      required
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !password || !confirm}
                    className={`mt-2 w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                      password && confirm && !loading
                        ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-center mt-6">
          <Link href="/membership/members-only" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">
            ← Back to Sign In
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
