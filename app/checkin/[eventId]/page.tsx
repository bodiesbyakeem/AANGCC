"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

type CheckInStep = "info" | "waiver-required" | "success" | "already-checked-in" | "error";

export default function CheckInPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const supabase = createClient();

  const [step, setStep] = useState<CheckInStep>("info");
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("AANGCC Ride");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [isMember, setIsMember] = useState(false);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [checkInId, setCheckInId] = useState<string | null>(null);

  useEffect(() => {
    // Decode event name from eventId
    try {
      const decoded = decodeURIComponent(eventId.replace(/-/g, " "));
      setEventName(decoded);
    } catch {
      setEventName("AANGCC Ride");
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setIsMember(true);
        // Pre-fill form with member data
        const { data: member } = await supabase
          .from("members")
          .select("full_name, email, phone, waiver_signed")
          .eq("id", session.user.id)
          .single();

        if (member) {
          setForm({
            name: member.full_name || "",
            email: member.email || session.user.email || "",
            phone: member.phone || "",
          });
          setWaiverSigned(member.waiver_signed || false);
        }
      }
    });
  }, [eventId]);

  const handleCheckIn = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);

    try {
      // Check if waiver is signed via API
      const waiverCheck = await fetch(`/api/waiver/sign?email=${encodeURIComponent(form.email)}`);
      const waiverData = await waiverCheck.json();
      const hasSigned = waiverData.signed || waiverSigned;

      if (!hasSigned) {
        setStep("waiver-required");
        setLoading(false);
        return;
      }

      // Submit check-in
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          event_name: eventName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          waiver_verified: true,
          is_member: isMember,
        }),
      });

      const data = await response.json();

      if (data.already_checked_in) {
        setStep("already-checked-in");
      } else if (data.success) {
        setCheckInId(data.checkin_id);
        setStep("success");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Logo */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center mb-8">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-3" />
          </Link>
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-medium">Event Check-In</p>
        </motion.div>

        {/* Step: Info Form */}
        {step === "info" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#14CFC4]" />
            <div className="p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🚴</span>
                <div>
                  <h1 className="font-heading text-[#111111] text-[22px] font-semibold leading-tight">{eventName}</h1>
                  <p className="text-[#888] text-[12px]">AANGCC Event Check-In</p>
                </div>
              </div>

              {isMember && (
                <div className="mb-5 p-3 rounded-xl bg-[#14CFC4]/10 border border-[#14CFC4]/20 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[#0FAFA5] text-[12px] font-semibold">Member detected — info pre-filled</span>
                </div>
              )}

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(512) 000-0000" className={inputClass} />
                </div>
              </div>

              <button onClick={handleCheckIn} disabled={loading || !form.name || !form.email}
                className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${form.name && form.email && !loading ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Checking In...</>
                ) : "Check In to Ride →"}
              </button>

              <p className="text-[#aaa] text-[11px] text-center mt-4 leading-relaxed">
                A signed waiver is required to check in. <Link href="/waiver" className="text-[#14CFC4] hover:underline">Sign waiver</Link>
              </p>
            </div>
          </motion.div>
        )}

        {/* Step: Waiver Required */}
        {step === "waiver-required" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#FFD84D]" />
            <div className="p-7 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFD84D]/20 border-2 border-[#FFD84D]/40 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8960a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-2">Waiver Required</h2>
              <p className="text-[#666] text-[14px] leading-relaxed mb-6">
                You must sign the AANGCC Waiver of Liability before participating in any ride or event. It takes less than 2 minutes.
              </p>
              <a href={`/waiver?redirect=/checkin/${eventId}`}
                className="w-full py-4 rounded-xl bg-[#FFD84D] text-[#111111] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300 block text-center mb-3">
                Sign Waiver Now →
              </a>
              <button onClick={() => setStep("info")} className="text-[#888] text-[12px] hover:text-[#111] transition-colors">
                ← Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#14CFC4]" />
            <div className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-5">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M8 18L14 24L28 12" stroke="#14CFC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-heading text-[#111111] text-[28px] font-semibold mb-2">You're Checked In! 🎉</h2>
              <p className="text-[#666] text-[14px] leading-relaxed mb-2">{form.name}</p>
              <p className="text-[#14CFC4] text-[13px] font-semibold mb-6">{eventName}</p>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-[#888] text-[11px] uppercase tracking-wide mb-2">Check-In Details</p>
                <p className="text-[#555] text-[13px]">✅ Waiver verified</p>
                <p className="text-[#555] text-[13px]">📍 {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                <p className="text-[#555] text-[13px]">🎫 ID: {checkInId?.slice(-8).toUpperCase()}</p>
              </div>
              <p className="text-[#888] text-[13px] leading-relaxed">
                Ride safe and have fun! 🚴
              </p>
            </div>
          </motion.div>
        )}

        {/* Step: Already Checked In */}
        {step === "already-checked-in" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#14CFC4]" />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14CFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-2">Already Checked In</h2>
              <p className="text-[#666] text-[14px] leading-relaxed">
                {form.name}, you're already checked in for <strong>{eventName}</strong>. See you on the road! 🚴
              </p>
            </div>
          </motion.div>
        )}

        {/* Step: Error */}
        {step === "error" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-red-400" />
            <div className="p-8 text-center">
              <h2 className="font-heading text-[#111111] text-[24px] font-semibold mb-2">Something Went Wrong</h2>
              <p className="text-[#666] text-[14px] leading-relaxed mb-6">Please try again or see the ride captain for manual check-in.</p>
              <button onClick={() => setStep("info")} className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-center mt-6">
          <Link href="/" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">← Back to AANGCC</Link>
        </motion.div>
      </div>
    </div>
  );
}

