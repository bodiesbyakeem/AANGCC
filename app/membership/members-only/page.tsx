"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function MembersOnlyPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError("Sign in failed — no session returned. Please try again.");
      setLoading(false);
      return;
    }

    // Session confirmed — navigate to portal
    window.location.replace("/portal");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setForgotLoading(false);
    if (!error) setForgotSent(true);
  };

  const inputClass = "w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">

      {/* Background glow */}
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

        {/* Card */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[4px] w-full bg-[#FFD84D]" />

          <div className="p-8">
            {!showForgot ? (
              <>
                <h1 className="font-heading text-[#111111] text-[28px] font-semibold mb-1">Welcome Back</h1>
                <p className="text-[#888] text-[13px] mb-8">Sign in to access your member portal.</p>

                {error && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Password</label>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-[#14CFC4] text-[12px] font-medium hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email || !password}
                    className={`mt-2 w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                      email && password && !loading
                        ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-[#888] text-[12px] leading-relaxed">
                    Not a member yet?{" "}
                    <Link href="/membership/why-join" className="text-[#14CFC4] font-semibold hover:underline">
                      Join AANGCC
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(""); }}
                  className="flex items-center gap-2 text-[#888] text-[13px] mb-6 hover:text-[#111] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to Sign In
                </button>

                {!forgotSent ? (
                  <>
                    <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-2">Reset Password</h2>
                    <p className="text-[#888] text-[13px] mb-6">Enter your email and we'll send you a reset link.</p>
                    <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-[#111] text-[14px] placeholder-gray-300 focus:outline-none focus:border-[#14CFC4] transition-colors duration-200"
                      />
                      <button
                        type="submit"
                        disabled={forgotLoading || !forgotEmail}
                        className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                          forgotEmail && !forgotLoading
                            ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {forgotLoading ? "Sending..." : "Send Reset Link"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-[#14CFC4]/10 border border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-[#111111] text-[22px] font-semibold mb-2">Check Your Email</h3>
                    <p className="text-[#666] text-[13px] leading-relaxed">We sent a password reset link to <strong>{forgotEmail}</strong>. Check your inbox and follow the instructions.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Support note */}
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-center text-white/50 text-[12px] mt-6 leading-relaxed">
          Need help? Contact us at{" "}
          <a href="mailto:info@allassnogascyclingclub.com" className="text-white/70 hover:text-[#FFD84D] transition-colors">
            info@allassnogascyclingclub.com
          </a>
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-center mt-4">
          <Link href="/" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">
            ← Back to AANGCC
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
