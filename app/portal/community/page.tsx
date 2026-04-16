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
  metric_type: string;
  metric_value: number;
  achieved_on: string;
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function StatCard({ label, value, unit, icon, color }: { label: string; value: string | number; unit?: string; icon: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className={`h-[4px] w-full ${color}`} />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <p className="text-[#888] text-[12px] font-medium uppercase tracking-wide">{label}</p>
        </div>
        <div className="flex items-baseline gap-1">
          <p className="font-heading text-[#111111] text-[32px] font-bold leading-none">{value}</p>
          {unit && <p className="text-[#888] text-[14px]">{unit}</p>}
        </div>
      </div>
    </motion.div>
  );
}

function PBCard({ pb, rides }: { pb: PersonalBest; rides: Ride[] }) {
  const labels: Record<string, { label: string; unit: string; icon: string }> = {
    longest_ride: { label: "Longest Ride", unit: "mi", icon: "🏅" },
    fastest_speed: { label: "Fastest Speed", unit: "mph", icon: "⚡" },
    most_elevation: { label: "Most Elevation", unit: "ft", icon: "⛰️" },
    most_calories: { label: "Most Calories", unit: "cal", icon: "🔥" },
    lowest_heart_rate: { label: "Lowest Avg Heart Rate", unit: "bpm", icon: "❤️" },
  };

  const meta = labels[pb.metric_type] || { label: pb.metric_type, unit: "", icon: "🏆" };
  const date = new Date(pb.achieved_on + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="h-[4px] w-full bg-[#FFD84D]" />
      <div className="p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FFD84D]/15 flex items-center justify-center flex-shrink-0">
          <span className="text-[24px]">{meta.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#888] text-[11px] uppercase tracking-wide font-medium">{meta.label}</p>
          <div className="flex items-baseline gap-1">
            <p className="font-heading text-[#111] text-[22px] font-bold">{pb.metric_value}</p>
            <p className="text-[#888] text-[12px]">{meta.unit}</p>
          </div>
          <p className="text-[#aaa] text-[11px] mt-0.5">Achieved {date}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="text-[#FFD84D] text-[20px]">🏆</span>
        </div>
      </div>
    </div>
  );
}

export default function MyStatsPage() {
  const supabase = createClient();
  const [rides, setRides] = useState<Ride[]>([]);
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "bests" | "history">("overview");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }

      const [{ data: ridesData }, { data: pbData }] = await Promise.all([
        supabase.from("rides").select("*").eq("user_id", user.id).order("ride_date", { ascending: false }),
        supabase.from("personal_bests").select("*").eq("user_id", user.id),
      ]);

      const rideList = ridesData || [];
      setRides(rideList);

      // Auto-compute personal bests from rides
      if (rideList.length > 0) {
        const computed: PersonalBest[] = [];

        const longestRide = [...rideList].sort((a, b) => b.distance_miles - a.distance_miles)[0];
        if (longestRide) computed.push({ metric_type: "longest_ride", metric_value: longestRide.distance_miles, achieved_on: longestRide.ride_date });

        const fastestRide = [...rideList].filter(r => r.avg_speed).sort((a, b) => (b.avg_speed || 0) - (a.avg_speed || 0))[0];
        if (fastestRide?.avg_speed) computed.push({ metric_type: "fastest_speed", metric_value: fastestRide.avg_speed, achieved_on: fastestRide.ride_date });

        const mostElevation = [...rideList].filter(r => r.elevation_feet).sort((a, b) => (b.elevation_feet || 0) - (a.elevation_feet || 0))[0];
        if (mostElevation?.elevation_feet) computed.push({ metric_type: "most_elevation", metric_value: mostElevation.elevation_feet, achieved_on: mostElevation.ride_date });

        const mostCalories = [...rideList].filter(r => r.calories).sort((a, b) => (b.calories || 0) - (a.calories || 0))[0];
        if (mostCalories?.calories) computed.push({ metric_type: "most_calories", metric_value: mostCalories.calories, achieved_on: mostCalories.ride_date });

        setPersonalBests(computed);
      }

      setLoading(false);
    }
    load();
  }, []);

  // Computed stats
  const totalMiles = rides.reduce((s, r) => s + r.distance_miles, 0);
  const totalRides = rides.length;
  const totalDuration = rides.reduce((s, r) => s + r.duration_minutes, 0);
  const totalElevation = rides.reduce((s, r) => s + (r.elevation_feet || 0), 0);
  const totalCalories = rides.reduce((s, r) => s + (r.calories || 0), 0);
  const avgSpeed = rides.filter(r => r.avg_speed).length > 0
    ? rides.filter(r => r.avg_speed).reduce((s, r) => s + (r.avg_speed || 0), 0) / rides.filter(r => r.avg_speed).length
    : 0;

  // This month
  const now = new Date();
  const thisMonth = rides.filter(r => {
    const d = new Date(r.ride_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthMiles = thisMonth.reduce((s, r) => s + r.distance_miles, 0);

  // This week
  const monday = new Date(now);
  monday.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
  monday.setHours(0, 0, 0, 0);
  const thisWeek = rides.filter(r => new Date(r.ride_date) >= monday);
  const thisWeekMiles = thisWeek.reduce((s, r) => s + r.distance_miles, 0);

  return (
    <div className="min-h-screen pt-[80px] pb-20">
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
            <p className="text-white/60 text-[14px] mt-1">{totalRides} rides · {totalMiles.toFixed(1)} total miles</p>
          </div>
          <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="flex items-center gap-2 mb-8 border-b border-white/10 pb-0">
          {([
            { id: "overview", label: "Overview" },
            { id: "bests", label: "Personal Bests" },
            { id: "history", label: "Ride History" },
          ] as { id: typeof activeTab; label: string }[]).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 -mb-[1px] ${activeTab === tab.id ? "border-[#FFD84D] text-white" : "border-transparent text-white/50 hover:text-white/80"}`}>
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
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">Log your first ride to start tracking your progress and personal bests.</p>
            <Link href="/portal/my-rides"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log a Ride →
            </Link>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                {/* Quick stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard label="This Week" value={thisWeekMiles.toFixed(1)} unit="mi" icon="📅" color="bg-[#14CFC4]" />
                  <StatCard label="This Month" value={thisMonthMiles.toFixed(1)} unit="mi" icon="🗓️" color="bg-[#FFD84D]" />
                  <StatCard label="Total Miles" value={totalMiles.toFixed(1)} unit="mi" icon="🚴" color="bg-[#14CFC4]" />
                  <StatCard label="Total Rides" value={totalRides} icon="🏁" color="bg-[#FFD84D]" />
                </div>

                {/* Detailed stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard label="Total Time" value={formatDuration(totalDuration)} icon="⏱️" color="bg-[#14CFC4]" />
                  <StatCard label="Total Elevation" value={`${totalElevation.toLocaleString()}`} unit="ft" icon="⛰️" color="bg-[#FFD84D]" />
                  {totalCalories > 0 && <StatCard label="Total Calories" value={totalCalories.toLocaleString()} unit="cal" icon="🔥" color="bg-[#14CFC4]" />}
                  {avgSpeed > 0 && <StatCard label="Avg Speed" value={avgSpeed.toFixed(1)} unit="mph" icon="⚡" color="bg-[#FFD84D]" />}
                </div>

                {/* Recent rides mini list */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-[4px] w-full bg-[#14CFC4]" />
                  <div className="p-6">
                    <h3 className="font-heading text-[#111] text-[18px] font-semibold mb-4">Recent Rides</h3>
                    <div className="flex flex-col gap-3">
                      {rides.slice(0, 5).map(ride => (
                        <div key={ride.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                          <div className="w-10 h-10 rounded-xl bg-[#14CFC4]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[16px]">🚴</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#111] text-[13px] font-semibold truncate">{ride.title || "Ride"}</p>
                            <p className="text-[#888] text-[11px]">{new Date(ride.ride_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[#111] text-[14px] font-bold">{ride.distance_miles} mi</p>
                            <p className="text-[#888] text-[11px]">{formatDuration(ride.duration_minutes)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {rides.length > 5 && (
                      <button onClick={() => setActiveTab("history")} className="mt-4 w-full py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                        View All {rides.length} Rides →
                      </button>
                    )}
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
                  personalBests.map(pb => <PBCard key={pb.metric_type} pb={pb} rides={rides} />)
                )}
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                {rides.map((ride, i) => (
                  <motion.div key={ride.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#14CFC4]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[20px]">🚴</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-[#111] text-[16px] font-semibold truncate">{ride.title || "Ride"}</p>
                      <p className="text-[#888] text-[12px]">{new Date(ride.ride_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center">
                        <p className="font-heading text-[#111] text-[16px] font-bold">{ride.distance_miles}</p>
                        <p className="text-[#888] text-[10px]">mi</p>
                      </div>
                      <div className="text-center">
                        <p className="font-heading text-[#111] text-[16px] font-bold">{formatDuration(ride.duration_minutes)}</p>
                        <p className="text-[#888] text-[10px]">time</p>
                      </div>
                      {ride.avg_speed && (
                        <div className="text-center hidden sm:block">
                          <p className="font-heading text-[#111] text-[16px] font-bold">{ride.avg_speed}</p>
                          <p className="text-[#888] text-[10px]">mph</p>
                        </div>
                      )}
                    </div>
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
