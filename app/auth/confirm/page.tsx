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

  useEffect(() => {
    // Extract token_hash and type from URL query params
    const params = new URLSearchParams(window.location.search);
    setTokenHash(params.get("token_hash"));
    setType(params.get("type"));
  }, []);

  const handleConfirm = async () => {
    if (!tokenHash || !type) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });

    if (error) {
      setError("This link has expired or already been used. Please request a new reset link.");
      setLoading(false);
      return;
    }

    // Token verified — redirect to reset password page
    router.push("/auth/reset-password");
  };

  const isRecovery = type === "recovery";

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
          <div className="p-8 text-center">

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <h1 className="font-heading text-[#111111] text-[26px] font-semibold mb-2">
              {isRecovery ? "Reset Your Password" : "Confirm Your Account"}
            </h1>
            <p className="text-[#888] text-[14px] leading-relaxed mb-8 max-w-[320px] mx-auto">
              {isRecovery
                ? "Click the button below to securely reset your AANGCC account password."
                : "Click the button below to confirm and activate your AANGCC account."
              }
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] text-left">
                {error}
                <div className="mt-3">
                  <Link href="/membership/members-only" className="text-[#14CFC4] font-semibold hover:underline text-[12px]">
                    Request a new link →
                  </Link>
                </div>
              </div>
            )}

            {!error && (
              <button
                onClick={handleConfirm}
                disabled={loading || !tokenHash}
                className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  tokenHash && !loading
                    ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  isRecovery ? "Continue to Reset Password" : "Confirm My Account"
                )}
              </button>
            )}

            <p className="text-[#aaa] text-[11px] mt-5 leading-relaxed">
              This link is single-use and expires after 24 hours.
            </p>
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
