"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface Ride {
  id: string;
  title: string | null;
  ride_date: string;
  distance_miles: number;
  duration_minutes: number;
  avg_speed: number | null;
  elevation_feet: number | null;
  calories: number | null;
  avg_heart_rate: number | null;
}

interface PersonalBest {
  id: string;
  metric_type: string;
  metric_value: number;
  achieved_on: string;
  ride_id: string | null;
}

interface NewPB {
  metric_type: string;
  old_value: number;
  new_value: number;
}

const PB_META: Record<string, { label: string; icon: string; unit: string; description: string; color: string }> = {
  longest_ride: { label: "Longest Single Ride", icon: "🏅", unit: "mi", description: "Your furthest ride ever", color: "bg-[#14CFC4]" },
  highest_elevation: { label: "Highest Elevation", icon: "⛰️", unit: "ft", description: "Most climbing in a single ride", color: "bg-[#FFD84D]" },
  fastest_speed: { label: "Fastest Avg Speed", icon: "⚡", unit: "mph", description: "Best average speed on rides over 10 miles", color: "bg-[#14CFC4]" },
  longest_duration: { label: "Longest Duration", icon: "⏱️", unit: "min", description: "Your longest time in the saddle", color: "bg-[#FFD84D]" },
  highest_weekly_mileage: { label: "Highest Weekly Mileage", icon: "📅", unit: "mi", description: "Most miles in a single week", color: "bg-[#14CFC4]" },
  most_rides_week: { label: "Most Rides in a Week", icon: "🚴", unit: "rides", description: "Most rides logged in a single week", color: "bg-[#FFD84D]" },
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function formatPBValue(metricType: string, value: number): string {
  if (metricType === "longest_duration") return formatDuration(value);
  if (metricType === "highest_elevation") return value.toLocaleString();
  if (metricType === "most_rides_week") return Math.round(value).toString();
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return monday.toISOString().split("T")[0];
}

async function computeAndSavePBs(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  rides: Ride[],
  existingPBs: PersonalBest[]
): Promise<NewPB[]> {
  if (rides.length === 0) return [];

  const newPBs: NewPB[] = [];

  const pbMap: Record<string, PersonalBest> = {};
  existingPBs.forEach(pb => { pbMap[pb.metric_type] = pb; });

  const check = async (metricType: string, value: number, achievedOn: string, rideId?: string) => {
    if (!value || isNaN(value)) return;
    const existing = pbMap[metricType];
    if (!existing || value > existing.metric_value) {
      newPBs.push({
        metric_type: metricType,
        old_value: existing?.metric_value || 0,
        new_value: value,
      });
      await supabase.from("personal_bests").upsert({
        user_id: userId,
        metric_type: metricType,
        metric_value: value,
        achieved_on: achievedOn,
        ride_id: rideId || null,
      }, { onConflict: "user_id,metric_type" });
    }
  };

  // Longest single ride
  const longest = [...rides].sort((a, b) => b.distance_miles - a.distance_miles)[0];
  await check("longest_ride", longest.distance_miles, longest.ride_date, longest.id);

  // Highest elevation in one ride
  const rides_with_elev = rides.filter(r => r.elevation_feet && r.elevation_feet > 0);
  if (rides_with_elev.length > 0) {
    const highestElev = [...rides_with_elev].sort((a, b) => (b.elevation_feet || 0) - (a.elevation_feet || 0))[0];
    await check("highest_elevation", highestElev.elevation_feet!, highestElev.ride_date, highestElev.id);
  }

  // Fastest avg speed on rides over 10 miles
  const qualifying = rides.filter(r => r.avg_speed && r.distance_miles >= 10);
  if (qualifying.length > 0) {
    const fastest = [...qualifying].sort((a, b) => (b.avg_speed || 0) - (a.avg_speed || 0))[0];
    await check("fastest_speed", fastest.avg_speed!, fastest.ride_date, fastest.id);
  }

  // Longest duration
  const longestDur = [...rides].sort((a, b) => b.duration_minutes - a.duration_minutes)[0];
  await check("longest_duration", longestDur.duration_minutes, longestDur.ride_date, longestDur.id);

  // Weekly aggregates
  const weekMap: Record<string, { miles: number; rides: number; dates: string[] }> = {};
  rides.forEach(r => {
    const wk = getWeekKey(r.ride_date);
    if (!weekMap[wk]) weekMap[wk] = { miles: 0, rides: 0, dates: [] };
    weekMap[wk].miles += r.distance_miles;
    weekMap[wk].rides += 1;
    weekMap[wk].dates.push(r.ride_date);
  });

  let bestWeekMiles = 0;
  let bestWeekMilesDate = "";
  let bestWeekRides = 0;
  let bestWeekRidesDate = "";

  Object.entries(weekMap).forEach(([, data]) => {
    if (data.miles > bestWeekMiles) {
      bestWeekMiles = data.miles;
      bestWeekMilesDate = data.dates[0];
    }
    if (data.rides > bestWeekRides) {
      bestWeekRides = data.rides;
      bestWeekRidesDate = data.dates[0];
    }
  });

  await check("highest_weekly_mileage", Math.round(bestWeekMiles * 10) / 10, bestWeekMilesDate);
  await check("most_rides_week", bestWeekRides, bestWeekRidesDate);

  return newPBs;
}

// ── CELEBRATION BANNER ───────────────────────────────────────────────────────

function CelebrationBanner({ pbs, onDismiss }: { pbs: NewPB[]; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-4"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-[4px] w-full bg-[#FFD84D]" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#FFD84D] text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">🎉 New Personal Best{pbs.length > 1 ? "s" : ""}!</p>
              <h3 className="font-heading text-[#111] text-[20px] font-semibold">You crushed it!</h3>
            </div>
            <button onClick={onDismiss} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200 transition-colors text-[11px]">✕</button>
          </div>
          <div className="flex flex-col gap-2">
            {pbs.map(pb => {
              const meta = PB_META[pb.metric_type];
              if (!meta) return null;
              return (
                <div key={pb.metric_type} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFD84D]/10 border border-[#FFD84D]/20">
                  <span className="text-[20px]">{meta.icon}</span>
                  <div className="flex-1">
                    <p className="text-[#111] text-[13px] font-semibold">{meta.label}</p>
                    <p className="text-[#888] text-[11px]">
                      {pb.old_value > 0 ? `${formatPBValue(pb.metric_type, pb.old_value)} → ` : "First time! "}
                      <span className="text-[#14CFC4] font-semibold">{formatPBValue(pb.metric_type, pb.new_value)} {meta.unit}</span>
                    </p>
                  </div>
                  <span className="text-[16px]">🏆</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function MyStatsPage() {
  const supabase = createClient();
  const [rides, setRides] = useState<Ride[]>([]);
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "bests" | "history">("overview");
  const [newPBs, setNewPBs] = useState<NewPB[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }
      setUserId(user.id);

      const [{ data: ridesData }, { data: pbData }] = await Promise.all([
        supabase.from("rides").select("*").eq("user_id", user.id).order("ride_date", { ascending: false }),
        supabase.from("personal_bests").select("*").eq("user_id", user.id),
      ]);

      const rideList = ridesData || [];
      const pbList = pbData || [];

      setRides(rideList);
      setPersonalBests(pbList);

      // Compute and save PBs
      if (rideList.length > 0) {
        const newBests = await computeAndSavePBs(supabase, user.id, rideList, pbList);
        if (newBests.length > 0) {
          setNewPBs(newBests);
          // Refresh PBs
          const { data: refreshed } = await supabase.from("personal_bests").select("*").eq("user_id", user.id);
          setPersonalBests(refreshed || []);
        }
      }

      setLoading(false);
    }
    load();
  }, []);

  // Lifetime stats
  const totalMiles = rides.reduce((s, r) => s + r.distance_miles, 0);
  const totalRides = rides.length;
  const totalDuration = rides.reduce((s, r) => s + r.duration_minutes, 0);
  const totalElevation = rides.reduce((s, r) => s + (r.elevation_feet || 0), 0);
  const totalCalories = rides.reduce((s, r) => s + (r.calories || 0), 0);

  // Weekly average
  const weekMap: Record<string, number> = {};
  rides.forEach(r => {
    const wk = getWeekKey(r.ride_date);
    weekMap[wk] = (weekMap[wk] || 0) + r.distance_miles;
  });
  const weekKeys = Object.keys(weekMap);
  const avgWeeklyMiles = weekKeys.length > 0
    ? weekKeys.reduce((s, k) => s + weekMap[k], 0) / weekKeys.length
    : 0;

  // This week / this month
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);
  const thisWeekRides = rides.filter(r => new Date(r.ride_date + "T12:00:00") >= monday);
  const thisWeekMiles = thisWeekRides.reduce((s, r) => s + r.distance_miles, 0);
  const thisMonthRides = rides.filter(r => {
    const d = new Date(r.ride_date + "T12:00:00");
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthMiles = thisMonthRides.reduce((s, r) => s + r.distance_miles, 0);

  const pbMap: Record<string, PersonalBest> = {};
  personalBests.forEach(pb => { pbMap[pb.metric_type] = pb; });

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {newPBs.length > 0 && <CelebrationBanner pbs={newPBs} onDismiss={() => setNewPBs([])} />}
      </AnimatePresence>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="py-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#14CFC4]" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Member Portal</span>
            </div>
            <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight">
              My <span className="text-gradient-gold">Stats</span>
            </h1>
            <p className="text-white/60 text-[14px] mt-1">{totalRides} rides · {totalMiles.toFixed(1)} lifetime miles</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
            <Link href="/portal/my-rides" className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">+ Log Ride</Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="flex items-center gap-1 mb-8 border-b border-white/10 pb-0">
          {([
            { id: "overview", label: "📊 Overview" },
            { id: "bests", label: "🏆 Personal Bests" },
            { id: "history", label: "📋 Ride History" },
          ] as { id: typeof activeTab; label: string }[]).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 -mb-[1px] whitespace-nowrap ${activeTab === tab.id ? "border-[#FFD84D] text-white" : "border-transparent text-white/50 hover:text-white/80"}`}>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading your stats...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📊</span>
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">No stats yet</h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto">Log your first ride to start tracking progress and earning personal bests.</p>
            <Link href="/portal/my-rides" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log First Ride →
            </Link>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                {/* Period summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "This Week", value: thisWeekMiles.toFixed(1), unit: "mi", sub: `${thisWeekRides.length} ride${thisWeekRides.length !== 1 ? "s" : ""}`, color: "bg-[#14CFC4]", icon: "📅" },
                    { label: "This Month", value: thisMonthMiles.toFixed(1), unit: "mi", sub: `${thisMonthRides.length} rides`, color: "bg-[#FFD84D]", icon: "🗓️" },
                    { label: "Avg Weekly", value: avgWeeklyMiles.toFixed(1), unit: "mi", sub: `over ${weekKeys.length} week${weekKeys.length !== 1 ? "s" : ""}`, color: "bg-[#14CFC4]", icon: "📈" },
                    { label: "Lifetime", value: totalMiles.toFixed(1), unit: "mi", sub: `${totalRides} rides`, color: "bg-[#FFD84D]", icon: "🚴" },
                  ].map(stat => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg">
                      <div className={`h-[4px] w-full ${stat.color}`} />
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{stat.icon}</span>
                          <p className="text-[#888] text-[11px] uppercase tracking-wide font-medium">{stat.label}</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="font-heading text-[#111] text-[28px] font-bold leading-none">{stat.value}</p>
                          <p className="text-[#888] text-[13px]">{stat.unit}</p>
                        </div>
                        <p className="text-[#aaa] text-[11px] mt-1">{stat.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Detailed lifetime stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: "Total Time", value: formatDuration(totalDuration), icon: "⏱️" },
                    { label: "Total Elevation", value: `${totalElevation.toLocaleString()} ft`, icon: "⛰️" },
                    ...(totalCalories > 0 ? [{ label: "Total Calories", value: `${totalCalories.toLocaleString()} cal`, icon: "🔥" }] : []),
                  ].map(stat => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white/15 border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                      <span className="text-2xl">{stat.icon}</span>
                      <div>
                        <p className="text-white/60 text-[11px] uppercase tracking-wide font-medium">{stat.label}</p>
                        <p className="font-heading text-white text-[20px] font-bold">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Personal bests snapshot */}
                {personalBests.length > 0 && (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-[4px] w-full bg-[#FFD84D]" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-[#111] text-[18px] font-semibold">Personal Bests</h3>
                        <button onClick={() => setActiveTab("bests")} className="text-[#14CFC4] text-[12px] font-semibold hover:underline">View All →</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {personalBests.slice(0, 4).map(pb => {
                          const meta = PB_META[pb.metric_type];
                          if (!meta) return null;
                          return (
                            <div key={pb.metric_type} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFD84D]/8 border border-[#FFD84D]/20">
                              <span className="text-[20px]">{meta.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[#888] text-[11px] uppercase tracking-wide truncate">{meta.label}</p>
                                <div className="flex items-baseline gap-1">
                                  <p className="font-heading text-[#111] text-[18px] font-bold">{formatPBValue(pb.metric_type, pb.metric_value)}</p>
                                  <p className="text-[#888] text-[11px]">{meta.unit}</p>
                                </div>
                              </div>
                              <span className="text-[#FFD84D] text-[16px]">🏆</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent rides */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-[4px] w-full bg-[#14CFC4]" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-[#111] text-[18px] font-semibold">Recent Rides</h3>
                      <button onClick={() => setActiveTab("history")} className="text-[#14CFC4] text-[12px] font-semibold hover:underline">View All →</button>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-50">
                      {rides.slice(0, 5).map(ride => (
                        <div key={ride.id} className="flex items-center gap-4 py-3">
                          <div className="w-9 h-9 rounded-xl bg-[#14CFC4]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[14px]">🚴</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#111] text-[13px] font-semibold truncate">{ride.title || "Ride"}</p>
                            <p className="text-[#aaa] text-[11px]">{new Date(ride.ride_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[#111] text-[13px] font-bold">{ride.distance_miles} mi</p>
                            <p className="text-[#aaa] text-[11px]">{formatDuration(ride.duration_minutes)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PERSONAL BESTS TAB */}
            {activeTab === "bests" && (
              <div className="flex flex-col gap-4">
                {personalBests.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-5xl mb-4 block">🏆</span>
                    <p className="text-white/60 text-[15px]">Log more rides to unlock personal bests!</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/50 text-[13px]">Personal bests are automatically detected and updated each time you log a ride.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.keys(PB_META).map(metricType => {
                        const pb = pbMap[metricType];
                        const meta = PB_META[metricType];
                        const isNew = newPBs.some(n => n.metric_type === metricType);

                        return (
                          <motion.div key={metricType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg ${isNew ? "ring-2 ring-[#FFD84D]" : ""}`}>
                            <div className={`h-[4px] w-full ${meta.color}`} />
                            <div className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#FFD84D]/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-[24px]">{meta.icon}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-[#888] text-[11px] uppercase tracking-wide font-medium">{meta.label}</p>
                                    {isNew && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FFD84D] text-[#111]">NEW! 🎉</span>}
                                  </div>
                                  {pb ? (
                                    <>
                                      <div className="flex items-baseline gap-1 mt-1">
                                        <p className="font-heading text-[#111] text-[28px] font-bold leading-none">{formatPBValue(metricType, pb.metric_value)}</p>
                                        <p className="text-[#888] text-[14px]">{meta.unit}</p>
                                      </div>
                                      <p className="text-[#aaa] text-[11px] mt-1">
                                        {new Date(pb.achieved_on + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                      </p>
                                      <p className="text-[#bbb] text-[11px] mt-0.5">{meta.description}</p>
                                    </>
                                  ) : (
                                    <p className="text-[#bbb] text-[13px] mt-2">Not yet achieved · {meta.description}</p>
                                  )}
                                </div>
                                {pb && <span className="text-[#FFD84D] text-[20px] flex-shrink-0">🏆</span>}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                {rides.map((ride, i) => (
                  <motion.div key={ride.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#14CFC4]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[18px]">🚴</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-[#111] text-[15px] font-semibold truncate">{ride.title || "Ride"}</p>
                        <p className="text-[#aaa] text-[11px]">{new Date(ride.ride_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-center">
                          <p className="font-heading text-[#111] text-[15px] font-bold">{ride.distance_miles}</p>
                          <p className="text-[#aaa] text-[10px]">mi</p>
                        </div>
                        <div className="text-center">
                          <p className="font-heading text-[#111] text-[15px] font-bold">{formatDuration(ride.duration_minutes)}</p>
                          <p className="text-[#aaa] text-[10px]">time</p>
                        </div>
                        {ride.avg_speed && (
                          <div className="text-center hidden sm:block">
                            <p className="font-heading text-[#111] text-[15px] font-bold">{ride.avg_speed}</p>
                            <p className="text-[#aaa] text-[10px]">mph</p>
                          </div>
                        )}
                        {ride.elevation_feet ? (
                          <div className="text-center hidden md:block">
                            <p className="font-heading text-[#111] text-[15px] font-bold">{ride.elevation_feet.toLocaleString()}</p>
                            <p className="text-[#aaa] text-[10px]">ft</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {ride.notes && (
                      <p className="mt-3 pt-3 border-t border-gray-50 text-[#888] text-[12px] leading-relaxed line-clamp-2">{ride.notes}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
