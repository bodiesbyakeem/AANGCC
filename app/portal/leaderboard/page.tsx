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
  total_rides: number;
  total_elevation: number;
  total_duration: number;
}

type SortMetric = "distance" | "rides" | "elevation";

function getWeekRange() {
  const now = new Date();
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

function getMedal(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

export default function LeaderboardPage() {
  const supabase = createClient();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortMetric>("distance");
  const week = getWeekRange();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }
      setCurrentUserId(user.id);

      // Fetch all rides for this week
      const { data: rides } = await supabase
        .from("rides")
        .select("user_id, distance_miles, elevation_feet, duration_minutes")
        .gte("ride_date", week.start)
        .lte("ride_date", week.end);

      if (!rides || rides.length === 0) { setLoading(false); return; }

      // Aggregate by user
      const userMap: Record<string, { total_distance: number; total_rides: number; total_elevation: number; total_duration: number }> = {};
      rides.forEach(r => {
        if (!userMap[r.user_id]) userMap[r.user_id] = { total_distance: 0, total_rides: 0, total_elevation: 0, total_duration: 0 };
        userMap[r.user_id].total_distance += r.distance_miles;
        userMap[r.user_id].total_rides += 1;
        userMap[r.user_id].total_elevation += r.elevation_feet || 0;
        userMap[r.user_id].total_duration += r.duration_minutes;
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
        ...userMap[uid],
      }));

      setEntries(board);
      setLoading(false);
    }
    load();
  }, []);

  const sorted = [...entries].sort((a, b) => {
    if (sortBy === "distance") return b.total_distance - a.total_distance;
    if (sortBy === "rides") return b.total_rides - a.total_rides;
    return b.total_elevation - a.total_elevation;
  });

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
            <p className="text-white/60 text-[13px] mt-1">📅 {week.label}</p>
          </div>
          <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
        </motion.div>

        {/* Sort tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="flex items-center gap-2 mb-8">
          {([
            { id: "distance", label: "🚴 Distance" },
            { id: "rides", label: "📅 Ride Count" },
            { id: "elevation", label: "⛰️ Elevation" },
          ] as { id: SortMetric; label: string }[]).map(tab => (
            <button key={tab.id} onClick={() => setSortBy(tab.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${sortBy === tab.id ? "bg-[#FFD84D] text-[#111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
              {tab.label}
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
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">No rides this week yet</h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">Be the first to log a ride this week and claim the top spot on the leaderboard!</p>
            <Link href="/portal/my-rides"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log a Ride →
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((entry, i) => {
              const rank = i + 1;
              const medal = getMedal(rank);
              const isMe = entry.user_id === currentUserId;
              const initials = entry.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative rounded-2xl overflow-hidden ${isMe ? "ring-2 ring-[#FFD84D]" : ""}`}
                >
                  <div className={`${rank <= 3 ? "bg-white" : "bg-white/90"} p-5`}>
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-10 flex-shrink-0 text-center">
                        {medal ? (
                          <span className="text-[24px]">{medal}</span>
                        ) : (
                          <span className="font-heading text-[#aaa] text-[18px] font-bold">#{rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                        {entry.avatar_url ? (
                          <img src={entry.avatar_url} alt={entry.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                            <span className="text-white text-[14px] font-bold">{initials}</span>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-heading text-[#111] text-[16px] font-semibold truncate">{entry.full_name}</p>
                          {isMe && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD84D] text-[#111]">YOU</span>}
                        </div>
                        <p className="text-[#888] text-[12px]">{entry.total_rides} ride{entry.total_rides !== 1 ? "s" : ""} this week</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <p className="font-heading text-[#111] text-[20px] font-bold">
                            {sortBy === "distance" ? `${entry.total_distance.toFixed(1)}` :
                             sortBy === "rides" ? entry.total_rides :
                             entry.total_elevation.toLocaleString()}
                          </p>
                          <p className="text-[#888] text-[10px] uppercase tracking-wide">
                            {sortBy === "distance" ? "miles" : sortBy === "rides" ? "rides" : "feet"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    {sorted[0] && (
                      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${rank === 1 ? "bg-[#FFD84D]" : rank === 2 ? "bg-[#14CFC4]" : rank === 3 ? "bg-[#0FAFA5]" : "bg-gray-300"}`}
                          style={{
                            width: `${(() => {
                              const max = sortBy === "distance" ? sorted[0].total_distance :
                                         sortBy === "rides" ? sorted[0].total_rides :
                                         sorted[0].total_elevation;
                              const val = sortBy === "distance" ? entry.total_distance :
                                          sortBy === "rides" ? entry.total_rides :
                                          entry.total_elevation;
                              return max > 0 ? (val / max) * 100 : 0;
                            })()}%`
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="mt-10 p-5 rounded-2xl bg-white/10 border border-white/15 text-center">
          <p className="text-white/50 text-[12px] leading-relaxed">
            Leaderboard resets every Monday at midnight. Log your rides at{" "}
            <Link href="/portal/my-rides" className="text-[#FFD84D] hover:underline">My Rides</Link>{" "}
            to appear on the leaderboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
