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

const MS_GOAL = 30000;
const MS_RAISED = 32224;

const CAMPAIGNS = [
  {
    id: "ms-society",
    name: "2026 MS Society — Texas Bike MS 150",
    description: "Support the fight against Multiple Sclerosis through our flagship charity ride. The Texas Bike MS 150 is a two-day, 156-mile ride from Austin to College Station raising critical funds for the National MS Society.",
    icon: "🎗️",
    color: "teal",
    donateUrl: "https://events.nationalmssociety.org/teams/90906/donate",
    raised: 32224,
    goal: 30000,
    stat: "$98,118+ raised since founding",
    windowStart: { month: 11, day: 1 },
    windowEnd: { month: 4, day: 30 },
    reopensMsg: "Opens November 1",
  },
  {
    id: "alz",
    name: "2026 Alzheimer's Association — Ride to End ALZ",
    description: "Help fight Alzheimer's disease through our annual charity cycling event in Dripping Springs, Texas. 6.7 million Americans are living with Alzheimer's — every dollar moves us closer to a cure.",
    icon: "💜",
    color: "gold",
    donateUrl: "https://act.alz.org/site/TR/Ride2026/Ride?pg=team&team_id=1044928&fr_id=20056",
    raised: 1025,
    goal: 5000,
    stat: "40 miles · Dripping Springs, TX",
    windowStart: { month: 5, day: 1 },
    windowEnd: { month: 10, day: 30 },
    reopensMsg: "Opens May 1",
  },
  {
    id: "rosedale",
    name: "2026 Rosedale Ride",
    description: "Supporting The Rosedale School — an Austin ISD campus serving students with disabilities and complex medical needs. This ride keeps us rooted in the Austin community we love.",
    icon: "🌹",
    color: "teal",
    donateUrl: "https://p2p.onecause.com/rosedaleride32",
    raised: 900,
    goal: 900,
    stat: "Goal reached! 🎉",
    windowStart: { month: 1, day: 5 },
    windowEnd: { month: 3, day: 30 },
    reopensMsg: "Opens January 5",
  },
];
function isDonationActive(windowStart: { month: number; day: number }, windowEnd: { month: number; day: number }): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const afterStart = month > windowStart.month || (month === windowStart.month && day >= windowStart.day);
  const beforeEnd = month < windowEnd.month || (month === windowEnd.month && day <= windowEnd.day);

  // Handle windows that span across year boundary (e.g. Nov–Apr)
  if (windowStart.month > windowEnd.month) {
    return afterStart || beforeEnd;
  }
  return afterStart && beforeEnd;
}
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Wendell W.", amount: 8195, campaign: "MS Society", date: "2026-03-15" },
  { rank: 2, name: "Marcus J.", amount: 6271, campaign: "MS Society", date: "2026-03-20" },
  { rank: 3, name: "Akeem D.", amount: 4383, campaign: "ALZ Ride", date: "2026-03-18" },
  { rank: 4, name: "Melanie G.", amount: 3035, campaign: "MS Society", date: "2026-03-22" },
  { rank: 5, name: "Gaurav P.", amount: 2330, campaign: "MS Society", date: "2026-03-25" },
  { rank: 6, name: "Frank J.", amount: 2135, campaign: "ALZ Ride", date: "2026-03-10" },
  { rank: 7, name: "Kayla J.", amount: 2051, campaign: "MS Society", date: "2026-03-28" },
  { rank: 8, name: "David M.", amount: 1300, campaign: "AANGCC", date: "2026-03-12" },
  { rank: 9, name: "Nadeem K.", amount: 526, campaign: "MS Society", date: "2026-03-30" },
  { rank: 10, name: "Anastasia M.", amount: 437, campaign: "ALZ Ride", date: "2026-04-01" },
];

function ProgressBar({ raised, goal, color }: { raised: number; goal: number; color: string }) {
  const pct = Math.min((raised / goal) * 100, 100);
  const complete = pct >= 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[12px]">
        <span className={color === "gold" ? "text-[#b8960a] font-semibold" : "text-[#14CFC4] font-semibold"}>
          ${raised.toLocaleString()} raised
        </span>
        <span className="text-[#888]">Goal: ${goal.toLocaleString()}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full ${complete ? "bg-emerald-400" : color === "gold" ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`}
        />
      </div>
      <div className={`text-[11px] ${complete ? "text-emerald-500 font-semibold" : "text-[#aaa]"}`}>
        {complete ? "✓ Goal reached!" : `${pct.toFixed(1)}% of goal reached`}
      </div>
    </div>
  );
}

function MSProgressBar() {
  const pct = Math.min((MS_RAISED / MS_GOAL) * 100, 100);
  const remaining = Math.max(MS_GOAL - MS_RAISED, 0);

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
            <div className="font-heading text-[#14CFC4] text-[36px] font-bold leading-none">${MS_RAISED.toLocaleString()}</div>
            <div className="text-[#888] text-[12px]">of ${MS_GOAL.toLocaleString()} goal</div>
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
  const [activeTab, setActiveTab] = useState<"donate" | "leaderboard">("donate");

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
            100% of charitable donations go directly to the MS Society, Alzheimer's Association, or Rosedale Foundation. Nothing held back.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* MS 150 Progress Bar */}
        <MSProgressBar />

        

        {/* Donate Tab */}
        {activeTab === "donate" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
            {CAMPAIGNS.map((campaign, i) => (
              <motion.div key={campaign.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`h-[4px] w-full ${campaign.color === "gold" ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`} />
                <div className="p-7 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{campaign.icon}</span>
                        <h3 className="font-heading text-[#111111] text-[22px] font-semibold leading-snug">{campaign.name}</h3>
                      </div>
                      <p className="text-[#666] text-[14px] leading-relaxed mb-5">{campaign.description}</p>
                      <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.color} />
                      <p className={`text-[12px] font-medium mt-3 ${campaign.color === "gold" ? "text-[#b8960a]" : "text-[#14CFC4]"}`}>{campaign.stat}</p>
                    </div>
                   <div className="flex flex-col gap-3 flex-shrink-0 lg:w-[180px]">
                      {isDonationActive(campaign.windowStart, campaign.windowEnd) ? (
                        <a href={campaign.donateUrl} target="_blank" rel="noopener noreferrer"
                          className={`w-full text-center py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 block ${campaign.color === "gold" ? "bg-[#FFD84D] text-[#111111] hover:bg-[#111111] hover:text-white" : "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111111]"}`}>
                          Donate Now →
                        </a>
                      ) : (
                        <div className="w-full text-center py-4 rounded-xl text-[13px] font-bold tracking-[0.08em] uppercase bg-gray-100 text-gray-400 cursor-not-allowed">
                          Donations Closed
                        </div>
                      )}
                      <p className="text-[#aaa] text-[10px] text-center leading-relaxed">
                        {isDonationActive(campaign.windowStart, campaign.windowEnd)
                          ? "100% goes directly to the cause"
                          : campaign.reopensMsg}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom CTA cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              {[
                { icon: "🚴", title: "Ride With Us", body: "Join the team and fundraise alongside us.", href: "/membership/join", cta: "Become a Member" },
                { icon: "🏢", title: "Sponsor AANGCC", body: "Partner with us as a corporate sponsor.", href: "/more/sponsorship", cta: "View Packages" },
                { icon: "📢", title: "Spread the Word", body: "Share our mission with friends and family.", href: "/about/we-support", cta: "Our Mission" },
              ].map((item) => (
                <div key={item.title} className="bg-white/15 border border-white/20 rounded-2xl p-6 text-center flex flex-col gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="font-heading text-white text-[18px] font-semibold">{item.title}</h3>
                  <p className="text-white/65 text-[13px] leading-relaxed flex-1">{item.body}</p>
                  <Link href={item.href} className="text-[#FFD84D] text-[12px] font-semibold hover:underline">{item.cta} →</Link>
                </div>
              ))}
            </div>
          </motion.div>
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
      </div>
    </div>
  );
}
