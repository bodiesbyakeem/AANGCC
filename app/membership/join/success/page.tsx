"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function JoinSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-20">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[560px]">

        {/* Logo */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-8">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-20 h-20 object-contain mx-auto" />
          </Link>
        </motion.div>

        {/* Success card */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-10 text-center">

            {/* Checkmark */}
            <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M8 18L14 24L28 12" stroke="#14CFC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="font-heading text-[#111111] text-[32px] font-semibold mb-3">
              Welcome to AANGCC!
            </h1>
            <p className="text-[#666] text-[15px] leading-relaxed mb-8 max-w-[400px] mx-auto">
              Your membership is active. You're now part of Austin's most purpose-driven cycling community. Every mile matters.
            </p>

            {/* Next steps */}
            <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
              <p className="text-[#888] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">What's Next</p>
              <div className="flex flex-col gap-4">
                {[
                  { step: "01", title: "Sign in to your portal", desc: "Access your member dashboard to complete your profile.", href: "/membership/members-only", cta: "Sign In Now" },
                  { step: "02", title: "Check the ride calendar", desc: "Find your next ride and show up ready to roll.", href: "/rides", cta: "View Rides" },
                  { step: "03", title: "Support the MS Society", desc: "Set up your fundraising page for the MS 150.", href: "/rides/ms150", cta: "MS 150 Team" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="font-heading text-[#14CFC4] text-[20px] font-bold opacity-40 flex-shrink-0 leading-none mt-0.5">{item.step}</span>
                    <div className="flex-1">
                      <div className="text-[#111] font-semibold text-[14px] mb-0.5">{item.title}</div>
                      <div className="text-[#888] text-[12px]">{item.desc}</div>
                    </div>
                    <Link href={item.href} className="text-[#14CFC4] text-[12px] font-semibold hover:text-[#0FAFA5] transition-colors flex-shrink-0">
                      {item.cta} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/membership/members-only" className="flex-1 py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111111] transition-colors duration-300 text-center">
                Go to Member Portal
              </Link>
              <Link href="/rides" className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-[#555] text-[13px] font-bold tracking-[0.08em] uppercase hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-300 text-center">
                View Ride Calendar
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-center text-white/40 text-[12px] mt-6 leading-relaxed">
          A receipt has been sent to your email. Questions?{" "}
          <a href="mailto:info@allassnogascyclingclub.com" className="text-white/60 hover:text-[#FFD84D] transition-colors">
            info@allassnogascyclingclub.com
          </a>
        </motion.p>
      </div>
    </div>
  );
}
