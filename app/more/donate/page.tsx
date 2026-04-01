"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Cause = "ms150" | "alz";
type Step = 1 | 2 | 3;

// ─── Donorbox Widget ──────────────────────────────────────────────────────────

function DonorboxWidget({ campaign }: { campaign: string }) {
  useEffect(() => {
    // Load Donorbox script
    const existing = document.querySelector('script[src="https://donorbox.org/widgets.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://donorbox.org/widgets.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [campaign]);

  return (
    <div className="w-full">
      <dbox-widget
        campaign={campaign}
        type="donation_form"
        enable-auto-scroll="true"
      />
    </div>
  );
}

// ─── STEP 1: Landing Page ─────────────────────────────────────────────────────

function StepOne({ onSelectCause }: { onSelectCause: (cause: Cause) => void }) {
  const [goalProgress] = useState(65);

  return (
    <div className="flex flex-col gap-0">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/2025 MS 150 48.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#2A9D9E]" />
            <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Make a Difference</span>
            <span className="h-[1px] w-10 bg-[#2A9D9E]" />
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-6" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
            Ride With Us.
            <br />
            <span className="text-gradient-teal">Change Lives.</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-white/70 text-[17px] lg:text-[20px] max-w-[580px] mx-auto leading-relaxed mb-12">
            You don't have to clip in to make a difference. Every dollar you give
            rides with us — mile after mile, cause after cause.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onSelectCause("ms150")} className="btn-primary">
              Donate to MS 150 Team
            </button>
            <button onClick={() => onSelectCause("alz")} className="btn-outline">
              Donate to ALZ Ride Team
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Urgency Bar */}
      <section className="bg-black py-12 border-b border-white/[0.06]">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD84D]/30 bg-[#FFD84D]/[0.06] mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] animate-pulse" />
              <span className="text-[#FFD84D] text-[12px] font-semibold tracking-wide">Help us reach our next $10,000 goal</span>
            </div>
            <div className="flex items-center justify-between text-[13px] mb-3">
              <span className="text-white/50">$6,500 raised</span>
              <span className="text-[#FFD84D] font-semibold">65% to goal</span>
              <span className="text-white/50">$10,000 goal</span>
            </div>
            <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${goalProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#2A9D9E] to-[#FFD84D] rounded-full"
              />
            </div>
            <p className="text-white/30 text-[12px] mt-3">Every donation — no matter the size — moves us closer to the finish line.</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[#0a0a0a] py-24 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#2A9D9E]" />
                <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Why It Matters</span>
              </div>
              <h2 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
                Every mile we ride
                <br />
                <span className="text-gradient-teal">carries their story.</span>
              </h2>
              <div className="space-y-4 text-white/55 text-[15px] leading-relaxed">
                <p>We ride for the mother diagnosed in her thirties who refuses to let MS define her life. We ride for the father who shows up at every finish line to cheer on his daughter. We ride for the friend who once cycled beside us.</p>
                <p>These are not statistics. They are people we know. People whose lives change when research accelerates, when programs expand, when communities like ours refuse to stop showing up.</p>
                <p>Your donation does not just support a ride. It fuels a movement that will not stop until MS and Alzheimer's are defeated.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
              {[
                { value: "$65,000+", label: "Raised for MS Society", sub: "And counting — every year we ride.", color: "teal" },
                { value: "~1M", label: "Americans with MS", sub: "We ride for every one of them.", color: "gold" },
                { value: "6.7M", label: "Americans with Alzheimer's", sub: "Our ALZ team fights for them too.", color: "teal" },
                { value: "100%", label: "Goes to the cause", sub: "Every dollar you donate reaches the mission.", color: "gold" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`flex items-center gap-5 p-5 rounded-xl border ${s.color === "gold" ? "border-[#FFD84D]/15 bg-[#FFD84D]/[0.02]" : "border-white/[0.07] bg-[#141414]"}`}>
                  <div className={`font-heading text-[32px] font-bold leading-none flex-shrink-0 ${s.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{s.value}</div>
                  <div>
                    <div className="text-white text-[14px] font-semibold">{s.label}</div>
                    <div className="text-white/30 text-[12px] mt-0.5">{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Choose Your Cause */}
      <section className="bg-black py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block">
              Choose Your Cause
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-heading text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Where do you want
              <br />
              <span className="text-gradient-teal">your miles to go?</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {[
              {
                cause: "ms150" as Cause,
                title: "MS 150 Team",
                org: "National Multiple Sclerosis Society",
                color: "teal",
                icon: "🎗️",
                description: "Support our flagship charity ride. Every dollar funds MS research, patient programs, and advocacy for nearly 1 million Americans living with MS.",
                cta: "Donate to MS 150 Team",
              },
              {
                cause: "alz" as Cause,
                title: "Ride to End ALZ",
                org: "Alzheimer's Association",
                color: "gold",
                icon: "💜",
                description: "Support our ALZ ride team. Funds go directly to Alzheimer's research, care programs, and awareness for the 6.7 million Americans affected.",
                cta: "Donate to ALZ Ride Team",
              },
            ].map((item, i) => (
              <motion.div key={item.cause} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`relative rounded-2xl border overflow-hidden flex flex-col group ${item.color === "gold" ? "border-[#FFD84D]/25 bg-[#FFD84D]/[0.03]" : "border-[#2A9D9E]/25 bg-[#2A9D9E]/[0.03]"}`}>
                <div className={`h-[3px] w-full ${item.color === "gold" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent"}`} />
                <div className="p-8 flex flex-col gap-5 flex-1">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="font-heading text-white text-[28px] font-semibold mb-1">{item.title}</h3>
                    <p className={`text-[13px] font-medium ${item.color === "gold" ? "text-[#FFD84D]" : "text-[#2A9D9E]"}`}>{item.org}</p>
                  </div>
                  <p className="text-white/50 text-[14px] leading-relaxed flex-1">{item.description}</p>
                  <button
                    onClick={() => onSelectCause(item.cause)}
                    className={`w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${item.color === "gold" ? "bg-[#FFD84D] text-black hover:bg-white" : "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]"}`}
                  >
                    {item.cta} →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── STEP 2: Donation Form ────────────────────────────────────────────────────

function StepTwo({ cause, onBack, onComplete }: { cause: Cause; onBack: () => void; onComplete: () => void }) {
  const isMS = cause === "ms150";

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="max-w-[860px] mx-auto px-6 lg:px-10">

        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 text-[13px] mb-10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 block ${isMS ? "text-[#2A9D9E]" : "text-[#FFD84D]"}`}>
              {isMS ? "MS 150 Team · National MS Society" : "Ride to End ALZ · Alzheimer's Association"}
            </span>
            <h1 className="font-heading text-white text-[36px] lg:text-[52px] font-semibold leading-tight mb-4">
              {isMS ? "Support the MS 150 Team" : "Support the ALZ Ride Team"}
            </h1>
            <p className="text-white/50 text-[15px] max-w-[520px] mx-auto leading-relaxed">
              {isMS
                ? "Your donation goes directly to the National Multiple Sclerosis Society — funding research, programs, and advocacy."
                : "Your donation goes directly to the Alzheimer's Association — funding research, care, and awareness."}
            </p>
          </motion.div>
        </div>

        {/* Impact reminder */}
        <div className={`mb-8 p-5 rounded-2xl border flex items-center gap-4 ${isMS ? "border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.04]" : "border-[#FFD84D]/20 bg-[#FFD84D]/[0.04]"}`}>
          <div className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse ${isMS ? "bg-[#2A9D9E]" : "bg-[#FFD84D]"}`} />
          <p className="text-white/60 text-[13px] leading-relaxed">
            <span className="text-white font-semibold">100% of your donation</span> goes to {isMS ? "the National MS Society" : "the Alzheimer's Association"}. AANGCC does not take any portion of charitable donations.
          </p>
        </div>

        {/* Donorbox Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
          <div className={`h-[3px] w-full ${isMS ? "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" : "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent"}`} />
          <div className="p-6 lg:p-8">
            <DonorboxWidget campaign={isMS ? "support-ms-150-team" : "support-alz-ride-team"} />
          </div>
        </motion.div>

        {/* Thank you trigger */}
        <div className="text-center mt-8">
          <button onClick={onComplete} className="text-white/30 text-[12px] hover:text-white/50 transition-colors duration-200 underline underline-offset-4">
            I've completed my donation — show me the impact
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 3: Thank You ────────────────────────────────────────────────────────

function StepThree({ cause }: { cause: Cause }) {
  const isMS = cause === "ms150";

  const shareText = encodeURIComponent("I just donated to the AANGCC cycling team fighting MS and Alzheimer's. Join the movement! 🚴");
  const shareUrl = encodeURIComponent("https://www.aangcc.com/more/donate");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-8">

          {/* Check icon */}
          <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center ${isMS ? "border-[#2A9D9E] bg-[#2A9D9E]/10" : "border-[#FFD84D] bg-[#FFD84D]/10"}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20L16 28L32 12" stroke={isMS ? "#2A9D9E" : "#FFD84D"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Headline */}
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
              You're Now Part
              <br />
              <span className={isMS ? "text-gradient-teal" : "text-gradient-gold"}>of the Mission</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-white/60 text-[16px] leading-relaxed max-w-[520px] mx-auto">
              Your generosity powers real change. Every dollar you gave today moves us one step closer to a world without {isMS ? "Multiple Sclerosis" : "Alzheimer's disease"}.
            </motion.p>
          </div>

          {/* Impact cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {(isMS ? [
              { icon: "🔬", label: "Funds MS research" },
              { icon: "💊", label: "Supports patient programs" },
              { icon: "📢", label: "Drives MS advocacy" },
            ] : [
              { icon: "🧬", label: "Funds ALZ research" },
              { icon: "💙", label: "Supports families" },
              { icon: "📢", label: "Raises awareness" },
            ]).map((item) => (
              <div key={item.label} className={`p-5 rounded-xl border text-center ${isMS ? "border-[#2A9D9E]/20 bg-[#2A9D9E]/[0.04]" : "border-[#FFD84D]/20 bg-[#FFD84D]/[0.04]"}`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white/60 text-[12px] tracking-wide">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Share buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-col items-center gap-4 w-full">
            <p className="text-white/40 text-[13px]">Spread the word — every share brings us closer to our goal</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2] text-[13px] font-semibold hover:border-[#1877F2]/60 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Share on Facebook
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white/70 text-[13px] font-semibold hover:border-white/40 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Share on X
              </a>
              <a href={`https://www.instagram.com/allassnogascyclingclub`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E4405F]/30 bg-[#E4405F]/10 text-[#E4405F] text-[13px] font-semibold hover:border-[#E4405F]/60 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Follow on Instagram
              </a>
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/membership/why-join" className="btn-primary">Join The Club</Link>
            <Link href="/rides" className="btn-outline">View Ride Calendar</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function DonatePage() {
  const [step, setStep] = useState<Step>(1);
  const [cause, setCause] = useState<Cause>("ms150");

  const handleSelectCause = (selectedCause: Cause) => {
    setCause(selectedCause);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black pt-[72px]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <StepOne onSelectCause={handleSelectCause} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <StepTwo cause={cause} onBack={handleBack} onComplete={handleComplete} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <StepThree cause={cause} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
