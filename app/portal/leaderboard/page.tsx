"use client";

import { useState, useEffect } from "react";
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

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  total_distance: number;
  total_elevation: number;
  total_rides: number;
  avg_speed: number;
  longest_ride: number;
}

type Metric = "distance" | "elevation" | "longest" | "rides" | "speed";
type Period = "this_week" | "last_week" | "this_month";

const METRIC_CONFIG: Record<Metric, { label: string; icon: string; unit: string; getValue: (e: LeaderboardEntry) => number; format: (v: number) => string }> = {
  distance: { label: "Total Distance", icon: "🚴", unit: "mi", getValue: e => e.total_distance, format: v => v.toFixed(1) },
  elevation: { label: "Total Elevation", icon: "⛰️", unit: "ft", getValue: e => e.total_elevation, format: v => v.toLocaleString() },
  longest: { label: "Longest Ride", icon: "🏅", unit: "mi", getValue: e => e.longest_ride, format: v => v.toFixed(1) },
  rides: { label: "Ride Count", icon: "📅", unit: "rides", getValue: e => e.total_rides, format: v => v.toString() },
  speed: { label: "Avg Speed", icon: "⚡", unit: "mph", getValue: e => e.avg_speed, format: v => v.toFixed(1) },
};

function getDateRange(period: Period): { start: string; end: string; label: string } {
  const now = new Date();

  if (period === "this_week") {
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return {
      start: monday.toISOString().split("T")[0],
      end: sunday.toISOString().split("T")[0],
      label: `${monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${sunday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
    };
  }

  if (period === "last_week") {
    const day = now.getDay();
    const thisMonday = new Date(now);
    thisMonday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(thisMonday.getDate() - 7);
    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
    return {
      start: lastMonday.toISOString().split("T")[0],
      end: lastSunday.toISOString().split("T")[0],
      label: `${lastMonday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${lastSunday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
    };
  }

  // this_month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    start: firstDay.toISOString().split("T")[0],
    end: lastDay.toISOString().split("T")[0],
    label: now.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

function getMedal(rank: number) {
  if (rank === 1) return { emoji: "🥇", color: "from-yellow-400 to-yellow-300", text: "text-yellow-700" };
  if (rank === 2) return { emoji: "🥈", color: "from-gray-300 to-gray-200", text: "text-gray-600" };
  if (rank === 3) return { emoji: "🥉", color: "from-orange-400 to-orange-300", text: "text-orange-700" };
  return null;
}

function getBadge(entry: LeaderboardEntry): { label: string; color: string } | null {
  if (entry.total_rides >= 5) return { label: "🔥 On Fire", color: "bg-orange-100 text-orange-600" };
  if (entry.total_distance >= 100) return { label: "💯 Century", color: "bg-purple-100 text-purple-600" };
  if (entry.longest_ride >= 50) return { label: "⚡ Long Hauler", color: "bg-blue-100 text-blue-600" };
  if (entry.total_rides >= 3) return { label: "🚴 Active", color: "bg-[#14CFC4]/10 text-[#0FAFA5]" };
  return null;
}

export default function LeaderboardPage() {
  const supabase = createClient();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [metric, setMetric] = useState<Metric>("distance");
  const [period, setPeriod] = useState<Period>("this_week");
  const [dateRange, setDateRange] = useState(getDateRange("this_week"));

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }
      setCurrentUserId(user.id);
    }
    init();
  }, []);

  useEffect(() => {
    const range = getDateRange(period);
    setDateRange(range);
    if (currentUserId) fetchLeaderboard(range);
  }, [period, currentUserId]);

  const fetchLeaderboard = async (range: { start: string; end: string }) => {
    setLoading(true);

    const { data: rides } = await supabase
      .from("rides")
      .select("user_id, distance_miles, elevation_feet, duration_minutes, avg_speed")
      .gte("ride_date", range.start)
      .lte("ride_date", range.end);

    if (!rides || rides.length === 0) {
      setEntries([]);
      setLoading(false);
      return;
    }

    // Aggregate by user
    const userMap: Record<string, {
      total_distance: number;
      total_elevation: number;
      total_rides: number;
      speed_sum: number;
      speed_count: number;
      longest_ride: number;
    }> = {};

    rides.forEach(r => {
      if (!userMap[r.user_id]) {
        userMap[r.user_id] = { total_distance: 0, total_elevation: 0, total_rides: 0, speed_sum: 0, speed_count: 0, longest_ride: 0 };
      }
      const u = userMap[r.user_id];
      u.total_distance += r.distance_miles;
      u.total_elevation += r.elevation_feet || 0;
      u.total_rides += 1;
      if (r.avg_speed) { u.speed_sum += r.avg_speed; u.speed_count += 1; }
      if (r.distance_miles > u.longest_ride) u.longest_ride = r.distance_miles;
    });

    // Fetch member profiles
    const userIds = Object.keys(userMap);
    const { data: members } = await supabase
      .from("members")
      .select("id, full_name, avatar_url")
      .in("id", userIds);

    const board: LeaderboardEntry[] = userIds.map(uid => ({
      user_id: uid,
      full_name: members?.find(m => m.id === uid)?.full_name || "Member",
      avatar_url: members?.find(m => m.id === uid)?.avatar_url || null,
      total_distance: Math.round(userMap[uid].total_distance * 10) / 10,
      total_elevation: Math.round(userMap[uid].total_elevation),
      total_rides: userMap[uid].total_rides,
      avg_speed: userMap[uid].speed_count > 0
        ? Math.round((userMap[uid].speed_sum / userMap[uid].speed_count) * 10) / 10
        : 0,
      longest_ride: Math.round(userMap[uid].longest_ride * 10) / 10,
    }));

    setEntries(board);
    setLoading(false);
  };

  const config = METRIC_CONFIG[metric];
  const sorted = [...entries]
    .sort((a, b) => config.getValue(b) - config.getValue(a))
    .slice(0, 10);

  const myRank = sorted.findIndex(e => e.user_id === currentUserId) + 1;
  const myEntry = entries.find(e => e.user_id === currentUserId);

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="py-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Members Only</span>
            </div>
            <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight">
              Weekly <span className="text-gradient-gold">Leaderboard</span>
            </h1>
            <p className="text-white/60 text-[13px] mt-1">📅 {dateRange.label}</p>
          </div>
          <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
        </motion.div>

        {/* My rank card */}
        {myEntry && myRank > 0 && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
            className="mb-6 p-5 rounded-2xl bg-[#FFD84D]/15 border border-[#FFD84D]/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFD84D]/20 flex items-center justify-center flex-shrink-0">
              <span className="font-heading text-[#FFD84D] text-[20px] font-bold">#{myRank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[14px]">Your Current Rank</p>
              <p className="text-white/60 text-[12px]">{config.format(config.getValue(myEntry))} {config.unit} · {myEntry.total_rides} ride{myEntry.total_rides !== 1 ? "s" : ""}</p>
            </div>
            <Link href="/portal/my-rides" className="px-4 py-2 rounded-xl bg-[#FFD84D] text-[#111] text-[11px] font-bold tracking-wide uppercase hover:bg-white transition-colors duration-200 flex-shrink-0">
              + Log Ride
            </Link>
          </motion.div>
        )}

        {/* Period filter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex items-center gap-2 mb-4 flex-wrap">
          {([
            { id: "this_week", label: "This Week" },
            { id: "last_week", label: "Last Week" },
            { id: "this_month", label: "This Month" },
          ] as { id: Period; label: string }[]).map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${period === p.id ? "bg-white text-[#111] border-white" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Metric filter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15} className="flex items-center gap-2 mb-8 flex-wrap">
          {(Object.entries(METRIC_CONFIG) as [Metric, typeof METRIC_CONFIG[Metric]][]).map(([id, cfg]) => (
            <button key={id} onClick={() => setMetric(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${metric === id ? "bg-[#FFD84D] text-[#111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
              <span>{cfg.icon}</span>{cfg.label}
            </button>
          ))}
        </motion.div>

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading leaderboard...</p>
          </div>
        ) : sorted.length === 0 ? (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-center py-20">
            <span className="text-6xl mb-4 block">🏆</span>
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">No rides logged yet</h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">
              Be the first to log a ride and claim the top spot!
            </p>
            <Link href="/portal/my-rides"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log a Ride →
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Top 3 podium */}
            {sorted.length >= 3 && (
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="grid grid-cols-3 gap-3 mb-6">
                {[sorted[1], sorted[0], sorted[2]].map((entry, podiumIdx) => {
                  const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                  const medal = getMedal(actualRank)!;
                  const isMe = entry.user_id === currentUserId;
                  const initials = entry.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                  const heightClass = actualRank === 1 ? "pt-0" : "pt-6";

                  return (
                    <div key={entry.user_id} className={`flex flex-col items-center ${heightClass}`}>
                      <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b ${medal.color} p-4 text-center ${isMe ? "ring-2 ring-white" : ""}`}>
                        <span className="text-[28px] block mb-2">{medal.emoji}</span>
                        <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 ring-2 ring-white/50">
                          {entry.avatar_url ? (
                            <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-white/30 flex items-center justify-center">
                              <span className={`font-bold text-[16px] ${medal.text}`}>{initials}</span>
                            </div>
                          )}
                        </div>
                        <p className={`font-heading text-[14px] font-semibold ${medal.text} truncate`}>{entry.full_name.split(" ")[0]}</p>
                        {isMe && <span className="text-[9px] font-bold bg-white/40 px-2 py-0.5 rounded-full">YOU</span>}
                        <p className={`font-heading text-[20px] font-bold ${medal.text} mt-1`}>{config.format(config.getValue(entry))}</p>
                        <p className={`text-[10px] ${medal.text} opacity-70 uppercase tracking-wide`}>{config.unit}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Full ranking list */}
            <div className="flex flex-col gap-3">
              {sorted.map((entry, i) => {
                const rank = i + 1;
                const medal = getMedal(rank);
                const isMe = entry.user_id === currentUserId;
                const badge = getBadge(entry);
                const initials = entry.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                const maxVal = config.getValue(sorted[0]);
                const pct = maxVal > 0 ? (config.getValue(entry) / maxVal) * 100 : 0;

                return (
                  <motion.div key={entry.user_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg ${isMe ? "ring-2 ring-[#FFD84D]" : ""}`}>
                    <div className="p-5">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-10 flex-shrink-0 text-center">
                          {medal ? (
                            <span className="text-[24px]">{medal.emoji}</span>
                          ) : (
                            <span className="font-heading text-[#bbb] text-[18px] font-bold">#{rank}</span>
                          )}
                        </div>

                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ${isMe ? "ring-2 ring-[#FFD84D]" : "ring-2 ring-gray-100"}`}>
                          {entry.avatar_url ? (
                            <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                              <span className="text-white text-[14px] font-bold">{initials}</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-heading text-[#111] text-[15px] font-semibold truncate">{entry.full_name}</p>
                            {isMe && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FFD84D] text-[#111]">YOU</span>}
                            {badge && <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <p className="text-[#888] text-[11px]">{entry.total_rides} ride{entry.total_rides !== 1 ? "s" : ""}</p>
                            <span className="text-[#ddd]">·</span>
                            <p className="text-[#888] text-[11px]">{entry.total_distance.toFixed(1)} mi total</p>
                            {entry.longest_ride > 0 && <>
                              <span className="text-[#ddd]">·</span>
                              <p className="text-[#888] text-[11px]">longest {entry.longest_ride.toFixed(1)} mi</p>
                            </>}
                          </div>
                        </div>

                        {/* Primary metric */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-heading text-[#111] text-[22px] font-bold leading-none">{config.format(config.getValue(entry))}</p>
                          <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">{config.unit}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.04 }}
                          className={`h-full rounded-full ${rank === 1 ? "bg-[#FFD84D]" : rank === 2 ? "bg-[#14CFC4]" : rank === 3 ? "bg-[#0FAFA5]/70" : "bg-gray-200"}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="mt-10 p-5 rounded-2xl bg-white/10 border border-white/15 text-center">
          <p className="text-white/50 text-[12px] leading-relaxed">
            Leaderboard shows top 10 members. Rankings update in real time as rides are logged.{" "}
            Heart rate and calorie data remain private.{" "}
            <Link href="/portal/my-rides" className="text-[#FFD84D] hover:underline">Log a ride</Link> to appear on the board.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
