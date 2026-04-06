"use client";

import { useState } from "react";
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

const GOAL = 30000;

const CAMPAIGNS = [
  {
    id: "ms-society",
    name: "MS Society — Texas Bike MS 150",
    description: "Support the fight against Multiple Sclerosis through our flagship charity ride.",
    icon: "🎗️",
    color: "teal",
    donateUrl: "https://events.nationalmssociety.org/teams/90906/donate",
    raised: 27428,
    goal: 30000,
  },
  {
    id: "alz",
    name: "Alzheimer's Association — Ride to End ALZ",
    description: "Help fight Alzheimer's disease through our annual charity cycling event.",
    icon: "💜",
    color: "gold",
    donateUrl: "https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056",
    raised: 12400,
    goal: 20000,
  },
  {
    id: "aangcc",
    name: "Support AANGCC Directly",
    description: "Fund club operations, events, travel, and community programming.",
    icon: "🚴",
    color: "teal",
    donateUrl: "https://donate.stripe.com/7sY8wH3bgcnh0WQ6CV5AQ0g",
    raised: 4200,
    goal: 10000,
  },
];

const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Sarah M.", amount: 2500, campaign: "MS Society", date: "2026-03-15" },
  { rank: 2, name: "James T.", amount: 1800, campaign: "MS Society", date: "2026-03-20" },
  { rank: 3, name: "Lisa R.", amount: 1500, campaign: "ALZ Ride", date: "2026-03-18" },
  { rank: 4, name: "Marcus J.", amount: 1200, campaign: "MS Society", date: "2026-03-22" },
  { rank: 5, name: "Angela B.", amount: 1000, campaign: "MS Society", date: "2026-03-25" },
  { rank: 6, name: "David K.", amount: 850, campaign: "ALZ Ride", date: "2026-03-10" },
  { rank: 7, name: "Priya S.", amount: 750, campaign: "MS Society", date: "2026-03-28" },
  { rank: 8, name: "Chris W.", amount: 600, campaign: "AANGCC", date: "2026-03-12" },
  { rank: 9, name: "Nicole H.", amount: 500, campaign: "MS Society", date: "2026-03-30" },
  { rank: 10, name: "Robert L.", amount: 450, campaign: "ALZ Ride", date: "2026-04-01" },
];

function ProgressBar({ raised, goal, color }: { raised: number; goal: number; color: string }) {
  const pct = Math.min((raised / goal) * 100, 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[12px]">
        <span className={color === "gold" ? "text-[#b8960a] font-semibold" : "text-[#14CFC4] font-semibold"}>
          ${raised.toLocaleString()} raised
        </span>
        <span className="text-[#888]">Goal: ${goal.toLocaleString()}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full ${color === "gold" ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`}
        />
      </div>
      <div className="text-[11px] text-[#aaa]">{pct.toFixed(1)}% of goal reached</div>
    </div>
  );
}

function GoalProgressBar() {
  const totalRaised = 27428;
  const pct = Math.min((totalRaised / GOAL) * 100, 100);
  const remaining = Math.max(GOAL - totalRaised, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8"
    >
      <div className="h-[4px] w-full bg-[#FFD84D]" />
      <div className="p-7">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
          <div>
            <h2 className="font-heading text-[#111111] text-[24px] font-semibold">2026 MS 150 Fundraising Goal</h2>
<p className="text-[#888] text-[13px]">Texas Bike MS 150 · National MS Society</p>
            
          </div>
          <div className="text-right">
            <div className="font-heading text-[#14CFC4] text-[36px] font-bold leading-none">${totalRaised.toLocaleString()}</div>
            <div className="text-[#888] text-[12px]">of ${GOAL.toLocaleString()} goal</div>
          </div>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]"
          />
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#14CFC4] font-semibold">{pct.toFixed(1)}% complete</span>
          {remaining > 0 && (
            <span className="text-[#888]">
              <span className="text-[#FFD84D] font-semibold">${remaining.toLocaleString()}</span> remaining
            </span>
          )}
        </div>
        {remaining > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-[#FFD84D]/10 border border-[#FFD84D]/30 text-center">
            <p className="text-[#b8960a] text-[13px] font-semibold">
              🎯 We're ${remaining.toLocaleString()} away from our $30,000 MS 150 goal. Let's finish strong!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function DonatePage() {
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGNS[0]);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [donorForm, setDonorForm] = useState({ name: "", email: "" });
  const [recurring, setRecurring] = useState(false);
  const [activeTab, setActiveTab] = useState<"donate" | "leaderboard">("donate");

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonate = async () => {
    if (!donorForm.name || !donorForm.email || finalAmount <= 0) return;

    await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donor_name: donorForm.name,
        donor_email: donorForm.email,
        amount: finalAmount,
        campaign: selectedCampaign.id,
        recurring,
        status: "pending",
      }),
    });

    window.open(selectedCampaign.donateUrl, "_blank");
  };

  return (
    <div className="min-h-screen pt-[80px] pb-20">

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
            <span className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.25em] uppercase">Give Back</span>
            <span className="h-[1px] w-10 bg-[#FFD84D]" />
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Make Every Mile <span className="text-gradient-gold">Matter</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-white/70 text-[15px] max-w-[520px] mx-auto leading-relaxed">
            100% of charitable donations go directly to the MS Society, Alzheimer's Association, or AANGCC operations. Nothing held back.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

        <GoalProgressBar />

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10">
          {[
            { id: "donate", label: "Donate Now", icon: "💰" },
            { id: "leaderboard", label: "Top Fundraisers", icon: "🏆" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as "donate" | "leaderboard")}
              className={`flex items-center gap-2 px-5 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 -mb-[1px] ${activeTab === tab.id ? "border-[#FFD84D] text-white" : "border-transparent text-white/50 hover:text-white/80"}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Donate Tab */}
        {activeTab === "donate" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {CAMPAIGNS.map((campaign) => (
                <motion.button key={campaign.id} onClick={() => setSelectedCampaign(campaign)}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className={`text-left bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${selectedCampaign.id === campaign.id ? "ring-2 ring-[#FFD84D] shadow-xl" : "hover:shadow-lg"}`}>
                  <div className={`h-[3px] w-full ${campaign.color === "gold" ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`} />
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-3xl flex-shrink-0">{campaign.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-heading text-[#111111] text-[17px] font-semibold leading-snug">{campaign.name}</h3>
                          {selectedCampaign.id === campaign.id && (
                            <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#FFD84D] text-[#111]">Selected</span>
                          )}
                        </div>
                        <p className="text-[#666] text-[13px] leading-relaxed">{campaign.description}</p>
                      </div>
                    </div>
                    <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.color} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Donation form */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg self-start sticky top-24">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-6 flex flex-col gap-5">
                <div>
                  <h3 className="font-heading text-[#111111] text-[20px] font-semibold mb-1">Your Donation</h3>
                  <p className="text-[#888] text-[12px]">To: {selectedCampaign.name}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Select Amount</label>
                  <div className="grid grid-cols-3 gap-2">
                    {DONATION_AMOUNTS.map((amt) => (
                      <button key={amt} onClick={() => { setSelectedAmount(amt); setIsCustom(false); }}
                        className={`py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${!isCustom && selectedAmount === amt ? "bg-[#14CFC4] text-white" : "bg-gray-50 text-[#555] hover:bg-[#14CFC4]/10 border border-gray-200"}`}>
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsCustom(true)}
                    className={`py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${isCustom ? "bg-[#FFD84D] text-[#111]" : "bg-gray-50 text-[#555] hover:bg-gray-100 border border-gray-200"}`}>
                    Custom Amount
                  </button>
                  {isCustom && (
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] text-[14px]">$</span>
                      <input type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder="Enter amount" min="1"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div onClick={() => setRecurring(!recurring)}
                    className={`w-10 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 cursor-pointer ${recurring ? "bg-[#14CFC4]" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${recurring ? "left-5" : "left-1"}`} />
                  </div>
                  <div>
                    <p className="text-[#111] text-[13px] font-semibold">Monthly Recurring</p>
                    <p className="text-[#888] text-[11px]">Donate automatically every month</p>
                  </div>
                </label>

                <div className="flex flex-col gap-3">
                  <input type="text" value={donorForm.name} onChange={(e) => setDonorForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                  <input type="email" value={donorForm.email} onChange={(e) => setDonorForm(p => ({ ...p, email: e.target.value }))} placeholder="Your email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                </div>

                <button onClick={handleDonate} disabled={!donorForm.name || !donorForm.email || finalAmount <= 0}
                  className={`w-full py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${donorForm.name && donorForm.email && finalAmount > 0 ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                  Donate {finalAmount > 0 ? `$${finalAmount.toLocaleString()}` : ""}{recurring ? " / mo" : ""}
                </button>

                <p className="text-[#aaa] text-[11px] text-center">100% to the cause. No AANGCC fees.</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <h2 className="font-heading text-[#111111] text-[22px] font-semibold">Top Fundraisers</h2>
                    <p className="text-[#888] text-[12px]">2026 Season · All campaigns combined</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {MOCK_LEADERBOARD.map((entry) => (
                    <div key={entry.rank} className={`flex items-center gap-4 p-4 rounded-xl ${entry.rank <= 3 ? "bg-[#FFD84D]/5 border border-[#FFD84D]/20" : "bg-gray-50 border border-gray-100"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-[16px] flex-shrink-0 ${entry.rank === 1 ? "bg-[#FFD84D] text-[#111]" : entry.rank === 2 ? "bg-gray-200 text-[#555]" : entry.rank === 3 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-[#888]"}`}>
                        {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#111] font-semibold text-[14px]">{entry.name}</div>
                        <div className="text-[#888] text-[11px]">{entry.campaign} · {entry.date}</div>
                      </div>
                      <div className="font-heading text-[#14CFC4] text-[18px] font-bold">${entry.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/20 text-center">
                  <p className="text-[#555] text-[13px]">
                    Want to be on this leaderboard?{" "}
                    <button onClick={() => setActiveTab("donate")} className="text-[#14CFC4] font-semibold hover:underline">Make a donation</button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "🚴", title: "Ride With Us", body: "Join the team and earn fundraising support.", href: "/membership/join", cta: "Become a Member" },
            { icon: "🏢", title: "Corporate Match", body: "Many employers match charitable donations.", href: "/more/sponsorship", cta: "Sponsor AANGCC" },
            { icon: "📢", title: "Spread the Word", body: "Share our mission with friends and family.", href: "/about/we-support", cta: "Our Mission" },
          ].map((item) => (
            <div key={item.title} className="bg-white/15 border border-white/20 rounded-2xl p-6 text-center flex flex-col gap-3">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-heading text-white text-[18px] font-semibold">{item.title}</h3>
              <p className="text-white/65 text-[13px] leading-relaxed flex-1">{item.body}</p>
              <Link href={item.href} className="text-[#FFD84D] text-[12px] font-semibold hover:underline">{item.cta} →</Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
