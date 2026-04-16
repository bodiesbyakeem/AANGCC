"use client";

import { useState, useRef, useEffect } from "react";
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

const WAIVER_VERSION = "3.0";

const WAIVER_SECTIONS = [
  {
    number: "01",
    title: "Acknowledgment of Inherent and Extraordinary Risks",
    content: `I acknowledge that cycling and participation in activities organized, sponsored, or facilitated by All Ass No Gas Cycling Club ("AANGCC") involve significant, inherent, and unpredictable risks, including but not limited to: collisions with vehicles, cyclists, pedestrians, animals, or stationary objects; road hazards including debris, potholes, uneven surfaces, and construction zones; mechanical failure of equipment, whether personal or third-party; weather-related hazards including heat, wind, rain, and reduced visibility; acts or omissions of other participants, motorists, or third parties; and physical exertion risks including dehydration, cardiac events, and overexertion. I understand these risks may result in serious bodily injury, permanent disability, paralysis, or death, as well as property damage or loss, and that such risks cannot be eliminated without fundamentally altering the nature of the activity.`,
  },
  {
    number: "02",
    title: "Voluntary Assumption of All Risks",
    content: `I knowingly, voluntarily, and expressly assume all risks, both known and unknown, foreseeable and unforeseeable, arising out of or related to my participation in any AANGCC activity. I certify that I am physically and medically capable of participating, I have not been advised otherwise by a qualified medical professional, and I accept full responsibility for my participation.`,
  },
  {
    number: "03",
    title: "Broad Release of Liability (Including Negligence)",
    content: `To the maximum extent permitted by Texas law, I hereby release, waive, discharge, and covenant not to sue AANGCC and all affiliated parties, including officers, directors, employees, contractors, volunteers, ride leaders, organizers, coordinators, other participants and members, sponsors, partners, advertisers, affiliated businesses, property owners, municipalities, and venues (collectively, the "Released Parties") from any and all claims, demands, damages, losses, liabilities, or causes of action, including those arising from ordinary negligence, relating to personal injury or death, property damage or loss, or any incident occurring before, during, or after participation. This release explicitly includes claims based on the NEGLIGENCE of any Released Party, to the fullest extent allowed by law.`,
  },
  {
    number: "04",
    title: "Express Indemnification and Duty to Defend",
    content: `I agree to defend, indemnify, and hold harmless the Released Parties from and against any and all claims, liabilities, damages, judgments, costs, and expenses (including attorney's fees) arising from my participation in AANGCC activities, my negligent, reckless, or intentional acts or omissions, my violation of traffic laws, safety rules, or club policies, or any claim brought by third parties arising from my conduct. This obligation includes a duty to defend the Released Parties against such claims at my own expense.`,
  },
  {
    number: "05",
    title: "Third-Party Beneficiary Protection",
    content: `I expressly agree that all Released Parties are intended third-party beneficiaries of this Agreement and are entitled to enforce its terms as if they were signatories.`,
  },
  {
    number: "06",
    title: "Equipment, Conduct, and Safety Compliance",
    content: `I represent and warrant that my bicycle is in safe and proper working condition, I will wear a properly fitted helmet at all times during all AANGCC group rides and events, I will comply with all applicable traffic laws and AANGCC safety protocols, and I understand that headphones and earbuds are prohibited except bone-conducting devices. I accept full responsibility for my equipment and conduct during all AANGCC activities.`,
  },
  {
    number: "07",
    title: "Medical Consent and Liability Waiver",
    content: `In the event of injury or incapacity, I authorize AANGCC representatives to seek emergency medical care on my behalf, I consent to treatment deemed necessary by licensed medical professionals, and I agree to assume full financial responsibility for any medical care provided. I release all Released Parties from any liability related to medical response decisions made on my behalf during an AANGCC activity.`,
  },
  {
    number: "08",
    title: "Arbitration Agreement and Class Action Waiver",
    content: `Any dispute arising from this Agreement or my participation in AANGCC activities shall be resolved through binding individual arbitration only, governed by the Federal Arbitration Act (FAA), and conducted in Travis County, Texas. I expressly waive the right to a jury trial and the right to participate in class actions or class arbitration.`,
  },
  {
    number: "09",
    title: "Governing Law and Venue",
    content: `This Agreement shall be governed by the laws of the State of Texas. Any claims not subject to arbitration shall be resolved exclusively in the courts of Travis County, Texas.`,
  },
  {
    number: "10",
    title: "Photography, Media, and Likeness Release",
    content: `I grant AANGCC and its affiliates the irrevocable right to photograph, record, and use my likeness during club activities, and to use such media for marketing, promotional, and commercial purposes without compensation or further consent. I understand that I may opt out by notifying a club officer before a ride or event begins.`,
  },
  {
    number: "11",
    title: "Severability",
    content: `If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    number: "12",
    title: "Survival of Agreement",
    content: `This Agreement shall survive indefinitely and apply to all current and future participation in AANGCC activities, regardless of any change in membership status.`,
  },
  {
    number: "13",
    title: "Acknowledgment of Understanding",
    content: `I acknowledge that I have read this Agreement in full, I understand its legal significance, I am giving up substantial rights including the right to sue, and I am signing this Agreement freely and voluntarily without coercion.`,
  },
];

function SignatureCanvas({ onSignature }: { onSignature: (data: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSignature(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignature("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white" style={{ touchAction: "none" }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={150}
          className="w-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-300 text-[14px]">Sign here with mouse or finger</p>
          </div>
        )}
        <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between">
          <div className="h-[1px] bg-gray-200 flex-1 mr-4" />
          {hasSignature && (
            <button type="button" onClick={clearSignature} className="text-[11px] text-red-400 hover:text-red-600 font-medium transition-colors flex-shrink-0">Clear</button>
          )}
        </div>
      </div>
      <p className="text-[#aaa] text-[11px]">Draw your signature above. This constitutes a legally binding electronic signature.</p>
    </div>
  );
}

export default function WaiverPage() {
  const supabase = createClient();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) setRedirectTo(redirect);
  }, []);
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreedArbitration, setAgreedArbitration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const waiverRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = waiverRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    if (atBottom) setScrolledToBottom(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email) { setError("Please enter your full name and email."); return; }
    if (!signature) { setError("Please draw your signature before submitting."); return; }
    if (!agreed) { setError("You must agree to the terms to continue."); return; }
    if (!agreedArbitration) { setError("You must acknowledge the arbitration clause to continue."); return; }

    setLoading(true);

    try {
      let ipAddress = "unknown";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch {}

      const { data: { user } } = await supabase.auth.getUser();

      const { data: waiver, error: waiverError } = await supabase
        .from("waivers")
        .insert({
          user_id: user?.id || null,
          version: WAIVER_VERSION,
          signed_at: new Date().toISOString(),
          ip_address: ipAddress,
          signature,
          full_name: form.full_name,
          email: form.email,
          agreed_to_terms: true,
        })
        .select()
        .single();

      if (waiverError) throw waiverError;

      await supabase.from("audit_log").insert({
        user_id: user?.id || null,
        action: "waiver_signed",
        entity: "waivers",
        entity_id: waiver.id,
        ip_address: ipAddress,
        metadata: {
          full_name: form.full_name,
          email: form.email,
          version: WAIVER_VERSION,
          timestamp: new Date().toISOString(),
        },
      });

      if (user) {
        await supabase.from("members").update({
          waiver_signed: true,
          waiver_id: waiver.id,
        }).eq("id", user.id);
      }

      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <div className="relative z-10 w-full max-w-[520px] text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#14CFC4]" />
            <div className="p-10">
              <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 border-2 border-[#14CFC4]/30 flex items-center justify-center mx-auto mb-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M8 18L14 24L28 12" stroke="#14CFC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-heading text-[#111111] text-[30px] font-semibold mb-3">Waiver Signed!</h2>
              <p className="text-[#666] text-[14px] leading-relaxed mb-8">
                Your waiver has been recorded and stored securely. Your signature, IP address, and timestamp have been permanently logged for compliance purposes.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/portal" className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300 block text-center">Go to Member Portal</Link>
                <Link href="/rides" className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-[#555] text-[13px] font-bold tracking-[0.08em] uppercase hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-300 block text-center">View Ride Calendar</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-white/50" />
            <span className="text-white/70 text-[11px] font-semibold tracking-[0.25em] uppercase">Legal</span>
            <span className="h-[1px] w-10 bg-white/50" />
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Guest Waiver of <span className="text-gradient-gold">Liability</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-white/70 text-[15px] max-w-[520px] mx-auto leading-relaxed mb-4">
            All AANGCC members must read and sign this waiver before participating in any ride or event. This is a legally binding document.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD84D]/20 border border-[#FFD84D]/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-[#FFD84D] text-[12px] font-medium">Version {WAIVER_VERSION} · Arbitration Clause · Travis County, Texas</span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Scrollable Waiver */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[#888] text-[12px] font-medium">Please read the entire waiver before signing</span>
            {!scrolledToBottom
              ? <span className="text-[#14CFC4] text-[11px] font-semibold animate-pulse">↓ Scroll to read all</span>
              : <span className="text-emerald-500 text-[11px] font-semibold">✓ Fully read</span>
            }
          </div>
          <div ref={waiverRef} onScroll={handleScroll} className="p-7 overflow-y-auto" style={{ maxHeight: "400px" }}>
            <h2 className="font-heading text-[#111111] text-[22px] font-semibold mb-2">All Ass No Gas Cycling Club</h2>
            <p className="text-[#888] text-[12px] mb-6">Waiver of Liability, Assumption of Risk, and Indemnification Agreement · Version {WAIVER_VERSION}</p>
            <div className="flex flex-col gap-6">
              {WAIVER_SECTIONS.map((section) => (
                <div key={section.number}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading text-[#14CFC4] text-[20px] font-bold opacity-40">{section.number}</span>
                    <h3 className="font-heading text-[#111111] text-[16px] font-semibold">{section.title}</h3>
                  </div>
                  <p className="text-[#555] text-[13px] leading-relaxed pl-9">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Signing Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-7 lg:p-8">
            <h2 className="font-heading text-[#111111] text-[22px] font-semibold mb-1">Sign the Guest Waiver</h2>
            <p className="text-[#888] text-[13px] mb-7">Complete all fields and draw your signature before your trial ride.</p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Legal Name *</label>
                  <input type="text" value={form.full_name} onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))} placeholder="As it appears on your ID" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(512) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Electronic Signature *</label>
                <SignatureCanvas onSignature={setSignature} />
              </div>

              <div className="flex flex-col gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                  <span className="text-[#555] text-[13px] leading-relaxed">
                    I have read the entire Waiver of Liability in its entirety. I understand its terms and legal effect, and I voluntarily agree to be bound by its provisions. I am 18 years of age or older.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreedArbitration} onChange={(e) => setAgreedArbitration(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0" />
                  <span className="text-[#555] text-[13px] leading-relaxed">
                    I specifically acknowledge and agree to the <strong>Arbitration Clause and Class Action Waiver</strong> (Section 07). I understand that I am waiving my right to a jury trial and to participate in class action lawsuits.
                  </span>
                </label>
              </div>

              <div className="p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/20">
                <p className="text-[#555] text-[12px] leading-relaxed">
                  <strong>Legal Notice:</strong> By submitting this form, you are creating a legally binding electronic signature under the E-SIGN Act. Your signature, name, email, IP address, and timestamp will be permanently recorded for compliance and audit purposes. Venue: Travis County, Texas.
                </p>
              </div>

              <button type="submit" disabled={loading || !form.full_name || !form.email || !signature || !agreed || !agreedArbitration}
                className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  form.full_name && form.email && signature && agreed && agreedArbitration && !loading
                    ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
                  : "Sign & Submit Waiver"
                }
              </button>

              <p className="text-[#aaa] text-[11px] text-center leading-relaxed">
                Questions? <a href="mailto:info@allassnogascyclingclub.com" className="text-[#14CFC4] hover:underline">info@allassnogascyclingclub.com</a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

