"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

interface Member {
  id: string;
  full_name: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  membership_type: string | null;
  membership_status: string | null;
  renewal_date: string | null;
  joined_at: string | null;
  is_active: boolean | null;
  stripe_customer_id: string | null;
  waiver_signed: boolean | null;
  avatar_url: string | null;
  bio: string | null;
  show_phone: boolean | null;
  show_email: boolean | null;
  show_address: boolean | null;
  state_location: string | null;
}

interface Ride {
  id: string;
  title: string | null;
  ride_date: string;
  distance_miles: number;
  duration_minutes: number;
  avg_speed: number | null;
  elevation_feet: number | null;
}

interface PersonalBest {
  metric_type: string;
  metric_value: number;
  achieved_on: string;
}

interface CommunityPost {
  id: string;
  user_id: string;
  post_type: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  full_name?: string;
  avatar_url?: string | null;
  like_count?: number;
}

// ── DASHBOARD WIDGETS ────────────────────────────────────────────────────────

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const PB_META: Record<string, { label: string; icon: string; unit: string }> = {
  longest_ride: { label: "Longest Ride", icon: "🏅", unit: "mi" },
  highest_elevation: { label: "Highest Elevation", icon: "⛰️", unit: "ft" },
  fastest_speed: { label: "Fastest Speed", icon: "⚡", unit: "mph" },
  longest_duration: { label: "Longest Duration", icon: "⏱️", unit: "min" },
  highest_weekly_mileage: { label: "Best Week", icon: "📅", unit: "mi" },
  most_rides_week: { label: "Most Rides/Week", icon: "🚴", unit: "rides" },
};

function formatPBValue(metricType: string, value: number): string {
  if (metricType === "longest_duration") return formatDuration(value);
  if (metricType === "highest_elevation") return value.toLocaleString();
  if (metricType === "most_rides_week") return Math.round(value).toString();
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

interface DashboardData {
  thisWeekMiles: number;
  thisWeekRides: number;
  totalMiles: number;
  totalRides: number;
  longestRide: number;
  leaderboardRank: number | null;
  lastRide: Ride | null;
  recentPBs: PersonalBest[];
  recentPosts: CommunityPost[];
}

function DashboardWidgets({ userId }: { userId: string }) {
  const supabase = createClient();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const weekStart = getWeekStart();
      const now = new Date();
      const weekEnd = now.toISOString().split("T")[0];

      const [
        { data: allRides },
        { data: weekRides },
        { data: allLeaderboardRides },
        { data: pbs },
        { data: posts },
      ] = await Promise.all([
        supabase.from("rides").select("*").eq("user_id", userId).order("ride_date", { ascending: false }),
        supabase.from("rides").select("distance_miles").eq("user_id", userId).gte("ride_date", weekStart).lte("ride_date", weekEnd),
        supabase.from("rides").select("user_id, distance_miles").gte("ride_date", weekStart).lte("ride_date", weekEnd),
        supabase.from("personal_bests").select("*").eq("user_id", userId).order("achieved_on", { ascending: false }).limit(3),
        supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(3),
      ]);

      // This week stats
      const thisWeekMiles = weekRides?.reduce((s, r) => s + r.distance_miles, 0) || 0;
      const thisWeekRideCount = weekRides?.length || 0;

      // Lifetime stats
      const totalMiles = allRides?.reduce((s, r) => s + r.distance_miles, 0) || 0;
      const totalRides = allRides?.length || 0;
      const longestRide = allRides?.length ? Math.max(...allRides.map(r => r.distance_miles)) : 0;
      const lastRide = allRides?.[0] || null;

      // Leaderboard rank (by distance this week)
      let leaderboardRank: number | null = null;
      if (allLeaderboardRides && allLeaderboardRides.length > 0) {
        const userTotals: Record<string, number> = {};
        allLeaderboardRides.forEach(r => {
          userTotals[r.user_id] = (userTotals[r.user_id] || 0) + r.distance_miles;
        });
        const sorted = Object.entries(userTotals).sort((a, b) => b[1] - a[1]);
        const myRank = sorted.findIndex(([uid]) => uid === userId);
        leaderboardRank = myRank >= 0 ? myRank + 1 : null;
      }

      // Enrich posts with member info
      let enrichedPosts: CommunityPost[] = [];
      if (posts && posts.length > 0) {
        const userIds = Array.from(new Set(posts.map(p => p.user_id)));
        const { data: members } = await supabase.from("members").select("id, full_name, avatar_url").in("id", userIds);
        const postIds = posts.map(p => p.id);
        const { data: likes } = await supabase.from("post_likes").select("post_id").in("post_id", postIds);
        enrichedPosts = posts.map(p => ({
          ...p,
          full_name: members?.find(m => m.id === p.user_id)?.full_name || "Member",
          avatar_url: members?.find(m => m.id === p.user_id)?.avatar_url || null,
          like_count: likes?.filter(l => l.post_id === p.id).length || 0,
        }));
      }

      setData({
        thisWeekMiles,
        thisWeekRides: thisWeekRideCount,
        totalMiles,
        totalRides,
        longestRide,
        leaderboardRank,
        lastRide,
        recentPBs: pbs || [],
        recentPosts: enrichedPosts,
      });
      setLoading(false);
    }
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/10 rounded-2xl h-[100px] animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "This Week", value: data.thisWeekMiles.toFixed(1), unit: "mi", sub: `${data.thisWeekRides} ride${data.thisWeekRides !== 1 ? "s" : ""}`, icon: "🚴", color: "bg-[#14CFC4]" },
          { label: "Leaderboard Rank", value: data.leaderboardRank ? `#${data.leaderboardRank}` : "—", unit: "", sub: data.leaderboardRank ? "this week" : "log a ride", icon: "🏆", color: "bg-[#FFD84D]" },
          { label: "Total Miles", value: data.totalMiles.toFixed(1), unit: "mi", sub: `${data.totalRides} lifetime rides`, icon: "📊", color: "bg-[#14CFC4]" },
          { label: "Longest Ride", value: data.longestRide.toFixed(1), unit: "mi", sub: "personal best", icon: "🏅", color: "bg-[#FFD84D]" },
        ].map(stat => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className={`h-[4px] w-full ${stat.color}`} />
            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[16px]">{stat.icon}</span>
                <p className="text-[#888] text-[10px] uppercase tracking-wide font-medium">{stat.label}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="font-heading text-[#111] text-[24px] font-bold leading-none">{stat.value}</p>
                {stat.unit && <p className="text-[#888] text-[12px]">{stat.unit}</p>}
              </div>
              <p className="text-[#bbb] text-[10px] mt-1">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Last ride */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-[#111] text-[16px] font-semibold">Last Ride</h3>
              <Link href="/portal/my-rides" className="text-[#14CFC4] text-[11px] font-semibold hover:underline">View All →</Link>
            </div>
            {data.lastRide ? (
              <div>
                <p className="text-[#111] text-[14px] font-semibold mb-1 truncate">{data.lastRide.title || "Ride"}</p>
                <p className="text-[#aaa] text-[11px] mb-4">{new Date(data.lastRide.ride_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2.5 rounded-xl bg-[#14CFC4]/8">
                    <p className="font-heading text-[#111] text-[18px] font-bold">{data.lastRide.distance_miles}</p>
                    <p className="text-[#aaa] text-[9px] uppercase tracking-wide">mi</p>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#FFD84D]/10">
                    <p className="font-heading text-[#111] text-[18px] font-bold">{formatDuration(data.lastRide.duration_minutes)}</p>
                    <p className="text-[#aaa] text-[9px] uppercase tracking-wide">time</p>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-gray-50">
                    <p className="font-heading text-[#111] text-[18px] font-bold">{data.lastRide.avg_speed || "—"}</p>
                    <p className="text-[#aaa] text-[9px] uppercase tracking-wide">mph</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-3xl block mb-2">🚴</span>
                <p className="text-[#aaa] text-[13px] mb-3">No rides logged yet</p>
                <Link href="/portal/my-rides" className="text-[12px] font-bold text-[#14CFC4] hover:underline">Log your first ride →</Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent personal bests */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-[#111] text-[16px] font-semibold">Personal Bests</h3>
              <Link href="/portal/my-stats" className="text-[#14CFC4] text-[11px] font-semibold hover:underline">View All →</Link>
            </div>
            {data.recentPBs.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {data.recentPBs.map(pb => {
                  const meta = PB_META[pb.metric_type];
                  if (!meta) return null;
                  return (
                    <div key={pb.metric_type} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFD84D]/8 border border-[#FFD84D]/15">
                      <span className="text-[18px]">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#888] text-[10px] uppercase tracking-wide truncate">{meta.label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="font-heading text-[#111] text-[16px] font-bold">{formatPBValue(pb.metric_type, pb.metric_value)}</p>
                          <p className="text-[#aaa] text-[10px]">{meta.unit}</p>
                        </div>
                      </div>
                      <span className="text-[14px]">🏆</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-3xl block mb-2">🏆</span>
                <p className="text-[#aaa] text-[13px] mb-3">No personal bests yet</p>
                <Link href="/portal/my-stats" className="text-[12px] font-bold text-[#14CFC4] hover:underline">View your stats →</Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent community posts */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-[#111] text-[16px] font-semibold">Team Feed</h3>
              <Link href="/portal/community" className="text-[#14CFC4] text-[11px] font-semibold hover:underline">View All →</Link>
            </div>
            {data.recentPosts.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.recentPosts.map(post => {
                  const initials = (post.full_name || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <div key={post.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        {post.avatar_url ? <img src={post.avatar_url} alt="" className="w-full h-full object-cover" /> :
                          <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{initials}</span>
                          </div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#111] text-[12px] font-semibold truncate">{post.full_name}</p>
                        {post.content && <p className="text-[#666] text-[11px] leading-relaxed line-clamp-2">{post.content}</p>}
                        {post.image_url && !post.content && <p className="text-[#14CFC4] text-[11px]">📷 Shared a photo</p>}
                        <p className="text-[#bbb] text-[10px] mt-0.5">{timeAgo(post.created_at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-3xl block mb-2">🌟</span>
                <p className="text-[#aaa] text-[13px] mb-3">No posts yet</p>
                <Link href="/portal/community" className="text-[12px] font-bold text-[#14CFC4] hover:underline">Be the first to post →</Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Portal nav shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "My Rides", href: "/portal/my-rides", icon: "🚴", desc: "Log & track rides" },
          { label: "Leaderboard", href: "/portal/leaderboard", icon: "🏆", desc: "Weekly rankings" },
          { label: "My Stats", href: "/portal/my-stats", icon: "📊", desc: "Personal bests" },
          { label: "Community", href: "/portal/community", icon: "🌟", desc: "Team feed" },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className="bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-white/30 transition-all duration-200 group">
            <span className="text-2xl block mb-2">{item.icon}</span>
            <p className="text-white text-[13px] font-semibold group-hover:text-[#FFD84D] transition-colors duration-200">{item.label}</p>
            <p className="text-white/50 text-[11px]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── CALENDAR ─────────────────────────────────────────────────────────────────

type EventCategory = "Ride" | "Meeting" | "Event" | "Social";

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: EventCategory;
  description: string;
  meetAt?: string;
  postRide?: string;
  miles?: string;
  elevation?: string;
  membersOnly?: boolean;
}

const CALENDAR_EVENTS: CalEvent[] = [
  { id: "c1", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-04", time: "8:00 a.m.", category: "Ride", miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" },
  { id: "c2", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-11", time: "8:00 a.m.", category: "Ride", miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" },
  { id: "c3", title: "Group Ride — Buescher State Park", date: "2026-04-18", time: "9:00 a.m.", category: "Ride", miles: "22 Miles", elevation: "1,584 Feet Elev.", description: "Route: Buescher State Park", meetAt: "100 Park Road C\nSmithville, Texas 78957", postRide: "Comfort Cafe\n111 NW 1st Street\nSmithville, TX 78957" },
  { id: "c4", title: "Mandatory Team Meeting", date: "2026-04-24", time: "5:30 - 6:30 p.m.", category: "Meeting", description: "Mandatory team meeting for all AANGCC members.", meetAt: "8140 Ceberry Drive #B\nAustin, Texas 78759" },
  { id: "c5", title: "2026 Texas Bike MS-150 — Day 1 | AUS-LG", date: "2026-04-25", time: "6:15 a.m.", category: "Event", description: "2026 Texas Bike MS-150 · Day 1 from Austin to La Grange.", meetAt: "San Jacinto Parking Garage\n2400 San Jacinto Blvd.\nAustin, Texas 78701" },
  { id: "c6", title: "2026 Texas Bike MS-150 — Day 2 | LG-CST", date: "2026-04-26", time: "6:15 a.m.", category: "Event", description: "2026 Texas Bike MS-150 · Day 2 from La Grange to the coast.", meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945" },
  { id: "celebration-2026", title: "Team Celebration Party 🎉", date: "2026-05-16", time: "3:00 p.m.", category: "Social", description: "Join us for our annual team celebration party! Food, drinks, and great company with your AANGCC family. Members only.", meetAt: "Rose Kirk Home\n4901 Interlachen Lane\nAustin, Texas 78747", membersOnly: true },
  ...([
    "2026-05-09","2026-05-23","2026-05-30",
    "2026-06-06","2026-06-13","2026-06-20","2026-06-27",
    "2026-07-04","2026-07-11","2026-07-18","2026-07-25",
    "2026-08-01","2026-08-08","2026-08-15","2026-08-22","2026-08-29",
    "2026-09-05","2026-09-12","2026-09-19","2026-09-26",
    "2026-10-03","2026-10-10",
  ].map((date, i) => ({ id: `csat-${i}`, title: "Group Ride — Govalle Neighborhood Park", date, time: "8:00 a.m.", category: "Ride" as EventCategory, miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" }))),
  { id: "calz-2026", title: "Ride to End ALZ", date: "2026-10-17", time: "8:00 a.m.", category: "Event", miles: "40 Miles", elevation: "2,434 Feet Elev.", description: "Ride to End ALZ — Annual charity ride supporting the Alzheimer's Association.", meetAt: "Speeding Springs\n7100 Creek Road\nDripping Springs, Texas 78620", postRide: "Onsite — Sponsored by H.E.B." },
  { id: "cms150-2027-1", title: "2027 Texas Bike MS-150 — Day 1 | AUS-LG", date: "2027-04-24", time: "6:15 a.m.", category: "Event", description: "2027 Texas Bike MS-150 · Day 1 from Austin to La Grange.", meetAt: "San Jacinto Parking Garage\n2400 San Jacinto Blvd.\nAustin, Texas 78701" },
  { id: "cms150-2027-2", title: "2027 Texas Bike MS-150 — Day 2 | LG-CST", date: "2027-04-25", time: "6:15 a.m.", category: "Event", description: "2027 Texas Bike MS-150 · Day 2 from La Grange to the coast.", meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945" },
];

const CAL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CAL_DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDay(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function fmtDate(y: number, m: number, d: number) { return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }

function CalEventModal({ event, onClose }: { event: CalEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl max-w-[520px] w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className={`h-[4px] w-full ${event.membersOnly ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`} />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{event.category}</span>
            {event.membersOnly && <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D]/20 text-[#b8960a]">🔒 Members Only</span>}
          </div>
          <h3 className="font-heading text-[#111111] text-[22px] font-semibold mt-2 mb-2 leading-tight">{event.title}</h3>
          <div className="flex items-center gap-3 text-[#888] text-[13px] mb-5 flex-wrap">
            <span>{new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span><span>{event.time}</span>
          </div>
          {(event.miles || event.elevation) && (
            <div className="flex gap-3 mb-5 flex-wrap">
              {event.miles && <div className="px-3 py-1.5 rounded-lg bg-[#14CFC4]/10 text-[#0FAFA5] text-[13px] font-semibold">🚴 {event.miles}</div>}
              {event.elevation && <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-[#666] text-[13px] font-semibold">⛰️ {event.elevation}</div>}
            </div>
          )}
          {event.description && <p className="text-[#555] text-[14px] leading-relaxed mb-4">{event.description}</p>}
          {event.meetAt && (
            <div className="mb-4">
              <div className="text-[#aaa] text-[11px] tracking-wide uppercase font-medium mb-1">Meet At</div>
              <p className="text-[#444] text-[13px] leading-relaxed whitespace-pre-line">{event.meetAt}</p>
            </div>
          )}
          {event.postRide && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-[#FFD84D] text-[11px] tracking-wide uppercase font-semibold mb-1">Post Ride Social</div>
              <p className="text-[#444] text-[13px] leading-relaxed whitespace-pre-line">{event.postRide}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function MemberCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [filterCat, setFilterCat] = useState<EventCategory | "All">("All");

  const filtered = filterCat === "All" ? CALENDAR_EVENTS : CALENDAR_EVENTS.filter(e => e.category === filterCat);
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalEvent[]> = {};
    filtered.forEach(ev => { if (!map[ev.date]) map[ev.date] = []; map[ev.date].push(ev); });
    return map;
  }, [filtered]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const today = new Date().toISOString().split("T")[0];

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };

  const upcoming = CALENDAR_EVENTS.filter(e => e.date >= today).sort((a,b) => a.date.localeCompare(b.date)).slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD84D]/15 border border-[#FFD84D]/30">
          <span className="text-[#FFD84D] text-[11px]">🔒</span>
          <span className="text-[#FFD84D] text-[11px] font-semibold">Members-only events included</span>
        </div>
        <p className="text-white/50 text-[12px]">This calendar is only visible to active AANGCC members.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <h3 className="font-heading text-white text-[20px] font-semibold min-w-[180px] text-center">{CAL_MONTHS[month]} {year}</h3>
              <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["All","Ride","Meeting","Event","Social"] as const).map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat as EventCategory | "All")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-200 ${filterCat === cat ? "bg-[#FFD84D] text-[#111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {[{ label: "Ride", color: "bg-[#14CFC4]" }, { label: "Meeting", color: "bg-[#FFD84D]" }, { label: "Event", color: "bg-white" }, { label: "Social 🔒", color: "bg-purple-400" }].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-white/55 text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="grid grid-cols-7 bg-[#0FAFA5]">
              {CAL_DAYS.map(d => <div key={d} className="py-2.5 text-center text-[10px] font-semibold tracking-[0.1em] uppercase text-white/80">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: totalCells }).map((_, i) => {
                const dayNum = i - firstDay + 1;
                const isCurrent = dayNum >= 1 && dayNum <= daysInMonth;
                const dateStr = isCurrent ? fmtDate(year, month, dayNum) : "";
                const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
                const isToday = dateStr === today;
                return (
                  <div key={i} className={`min-h-[80px] p-1.5 border-b border-r border-gray-100 ${!isCurrent ? "bg-gray-50/50" : "bg-white"} ${i % 7 === 6 ? "border-r-0" : ""}`}>
                    {isCurrent && (
                      <>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-medium mb-1 ml-auto ${isToday ? "bg-[#14CFC4] text-white" : "text-[#999]"}`}>{dayNum}</div>
                        <div className="flex flex-col gap-0.5">
                          {dayEvents.slice(0, 2).map(ev => (
                            <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                              className={`w-full text-left px-1.5 py-0.5 rounded text-[9px] font-medium truncate hover:opacity-80 transition-opacity ${ev.membersOnly ? "bg-[#FFD84D]/25 text-[#8a7000]" : ev.category === "Meeting" ? "bg-[#FFD84D]/20 text-[#8a7000]" : ev.category === "Social" ? "bg-purple-100 text-purple-700" : "bg-[#14CFC4]/15 text-[#0FAFA5]"}`}>
                              {ev.membersOnly && "🔒 "}{ev.title}
                            </button>
                          ))}
                          {dayEvents.length > 2 && <button onClick={() => setSelectedEvent(dayEvents[2])} className="text-[9px] text-[#aaa] text-left pl-1">+{dayEvents.length - 2} more</button>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-3">Upcoming Events</p>
          <div className="flex flex-col gap-2">
            {upcoming.map(ev => {
              const d = new Date(ev.date + "T12:00:00");
              return (
                <button key={ev.id} onClick={() => setSelectedEvent(ev)} className="w-full text-left p-3.5 rounded-xl bg-white/15 border border-white/20 hover:bg-white/25 transition-all duration-200">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${ev.membersOnly ? "bg-[#FFD84D]" : ev.category === "Meeting" ? "bg-[#FFD84D]" : ev.category === "Social" ? "bg-purple-400" : ev.category === "Event" ? "bg-white" : "bg-[#14CFC4]"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[12px] font-medium truncate">{ev.membersOnly && "🔒 "}{ev.title}</p>
                      <p className="text-white/50 text-[11px] mt-0.5">{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {ev.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedEvent && <CalEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ── APPAREL ──────────────────────────────────────────────────────────────────

const APPAREL = [
  { name: "Official Team Jersey", price: "$119.99", image: "/images/aangcc-jersey.png", url: "https://buy.stripe.com/3cI28jdPU1ID9tme5n5AQ0b", tag: "Most Popular" },
  { name: "AANGCC Signature Hoodie", price: "$79.99", image: "/images/aangcc-hoodie.png", url: "https://buy.stripe.com/8x28wH7rw871gVO0ex5AQ03", tag: "New" },
  { name: "Official Team Sock", price: "$17.99", image: "/images/aangcc-socks.png", url: "https://buy.stripe.com/28E14fcLQ0EzfRK5yR5AQ0a", tag: null },
  { name: "Long Sleeve T-Shirt", price: "$49.99", image: "/images/aangcc-long-tshirt.png", url: "https://buy.stripe.com/5kQ00baDI1ID5d61iB5AQ04", tag: null },
  { name: "Unisex T-Shirt", price: "$39.00", image: "/images/aangcc-unisex-tshirt.png", url: "https://buy.stripe.com/7sY00b8vA0EzfRK4uN5AQ05", tag: null },
  { name: "Women's Padded Cycling Shorts", price: "$89.99", image: "/images/women-cycling-shorts.png", url: "https://buy.stripe.com/6oUaEPh260EzgVO0ex5AQ06", tag: null },
  { name: "Men's Cycling Bib", price: "$119.99", image: "/images/men-cycling-bib.png", url: "https://buy.stripe.com/4gMdR127cbjd492f9r5AQ07", tag: null },
  { name: "Women's Leggings", price: "$59.99", image: "/images/women-leggins.png", url: "https://buy.stripe.com/28EfZ94fkbjdeNGe5n5AQ01", tag: null },
  { name: "Women's Cut T-Shirt", price: "$39.99", image: "/images/women-cut-tshirt.png", url: "https://buy.stripe.com/bJe14feTY4UPeNG6CV5AQ02", tag: null },
  { name: "Cycling Cap", price: "$29.99", image: "/images/cycling-cap.png", url: "https://buy.stripe.com/00w00b138drl20UaTb5AQ09", tag: null },
  { name: "Head Fleece", price: "$25.99", image: "/images/head-fleece.png", url: "https://buy.stripe.com/eVq00bbHMbjd6ha1iB5AQ08", tag: null },
  { name: "Travel Bag", price: "$24.99", image: "/images/travel-bag.png", url: "https://buy.stripe.com/cNifZ98vAevpeNGbXf5AQ00", tag: null },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function StatusBadge({ status, isActive }: { status: string | null; isActive: boolean | null }) {
  const active = isActive !== false && status !== "cancelled" && status !== "inactive";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />
      {status || "Active"}
    </span>
  );
}

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description: string }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#14CFC4]/30 transition-colors duration-200">
      <div onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 cursor-pointer ${checked ? "bg-[#14CFC4]" : "bg-gray-200"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${checked ? "left-6" : "left-1"}`} />
      </div>
      <div>
        <p className="text-[#111] text-[13px] font-semibold">{label}</p>
        <p className="text-[#888] text-[11px]">{description}</p>
      </div>
    </label>
  );
}

function InviteMemberCard({ member, currentUserName, currentUserEmail }: { member: Member; currentUserName: string; currentUserEmail: string }) {
  const supabase = createClient();
  const [inviteForm, setInviteForm] = useState({ name: "", email: "" });
  const [inviting, setInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [invites, setInvites] = useState<{ full_name: string; email: string; waiver_signed: boolean; invite_status: string }[]>([]);

  useEffect(() => {
    fetch(`/api/members/invite?inviter_id=${member.id}`)
      .then(r => r.json())
      .then(d => { if (d.invites) setInvites(d.invites); })
      .catch(err => console.error("Failed to fetch invites:", err));
  }, [member.id]);

  const maxInvites = member.membership_type === "Family" ? 1 : member.membership_type === "Small Business" ? 13 : 98;
  const canInvite = invites.length < maxInvites;

  const handleInvite = async () => {
    if (!inviteForm.name || !inviteForm.email) return;
    setInviting(true); setInviteError("");
    try {
      const response = await fetch("/api/members/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviter_id: member.id,
          inviter_name: currentUserName,
          inviter_email: currentUserEmail,
          invitee_name: inviteForm.name,
          invitee_email: inviteForm.email,
          membership_type: member.membership_type,
          stripe_customer_id: member.stripe_customer_id,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setInviteSuccess(true);
        setInviteForm({ name: "", email: "" });
        setInvites(prev => [...prev, { full_name: inviteForm.name, email: inviteForm.email, waiver_signed: false, invite_status: "pending" }]);
        setTimeout(() => setInviteSuccess(false), 4000);
      } else {
        setInviteError(data.error || "Failed to send invite.");
      }
    } catch {
      setInviteError("Something went wrong. Please try again.");
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="h-[4px] w-full bg-[#14CFC4]" />
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-[#111111] text-[20px] font-semibold">Invite a Member</h2>
          <p className="text-[#888] text-[12px] mt-0.5">{member.membership_type} plan · {invites.length}/{maxInvites} invite{maxInvites > 1 ? "s" : ""} used</p>
        </div>
        {invites.length > 0 && (
          <div className="flex flex-col gap-2">
            {invites.map(inv => (
              <div key={inv.email} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-[#14CFC4]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0FAFA5] text-[11px] font-bold">{inv.full_name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#111] text-[12px] font-semibold truncate">{inv.full_name}</p>
                  <p className="text-[#888] text-[11px] truncate">{inv.email}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${inv.waiver_signed ? "bg-emerald-100 text-emerald-600" : "bg-yellow-100 text-yellow-600"}`}>
                  {inv.waiver_signed ? "✓ Active" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
        {inviteSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13px] flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Invite sent successfully!
          </div>
        )}
        {inviteError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{inviteError}</div>}
        {canInvite ? (
          <div className="flex flex-col gap-3">
            <input type="text" value={inviteForm.name} onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Their full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
            <input type="email" value={inviteForm.email} onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
              placeholder="Their email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
            <button onClick={handleInvite} disabled={inviting || !inviteForm.name || !inviteForm.email}
              className={`w-full py-3 rounded-xl text-[12px] font-bold tracking-wide uppercase transition-colors duration-300 ${inviteForm.name && inviteForm.email && !inviting ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {inviting ? "Sending Invite..." : "Send Invite →"}
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-[#888] text-[13px]">You've used all available invites for your {member.membership_type} plan.</p>
          </div>
        )}
        <p className="text-[#aaa] text-[11px] leading-relaxed">They'll receive an email invitation to create their account and sign their waiver.</p>
      </div>
    </div>
  );
}

// ── MS 150 LEADERBOARD ───────────────────────────────────────────────────────

const MS150_FUNDRAISERS = [
  { name: "Wendell W.", amount: 8355 },
  { name: "Marcus J.", amount: 6306 },
  { name: "Akeem D.", amount: 20,583 },
  { name: "Melanie G.", amount: 10,444.75 },
  { name: "Gaurav P.", amount: 2330 },
  { name: "Frank J.", amount: 2135 },
  { name: "Kayla J.", amount: 2051 },
  { name: "David M.", amount: 1410 },
  { name: "Nadeem K.", amount: 4,531.38 },
  { name: "Anastasia M.", amount: 437 },
];

const MS150_TOTAL = MS150_FUNDRAISERS.reduce((s, f) => s + f.amount, 0);

function MS150Leaderboard() {
  const sorted = [...MS150_FUNDRAISERS].sort((a, b) => b.amount - a.amount);
  const top = sorted[0].amount;

  function getMedal(rank: number) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
            <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Members Only</span>
          </div>
          <h2 className="font-heading text-white text-[28px] lg:text-[36px] font-semibold leading-tight">
            MS 150 Lifetime <span className="text-gradient-gold">Leaderboard</span>
          </h2>
          <p className="text-white/60 text-[13px] mt-1">Cumulative fundraising totals for the National MS Society</p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center flex-shrink-0">
          <p className="text-white/60 text-[11px] uppercase tracking-wide font-medium mb-1">Team Total Raised</p>
          <p className="font-heading text-[#FFD84D] text-[32px] font-bold leading-none">${MS150_TOTAL.toLocaleString()}</p>
          <p className="text-white/50 text-[11px] mt-1">across {sorted.length} members</p>
        </div>
      </div>

      {/* MS Society badge */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFD84D]/10 border border-[#FFD84D]/25">
        <span className="text-2xl flex-shrink-0">🧡</span>
        <div>
          <p className="text-white text-[13px] font-semibold">Riding for a Cure</p>
          <p className="text-white/60 text-[12px]">Every dollar raised supports life-changing research and programs for people living with MS. Thank you for your dedication.</p>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {[sorted[1], sorted[0], sorted[2]].map((entry, podiumIdx) => {
          const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
          const heightClass = actualRank === 1 ? "pt-0" : "pt-6";
          const gradients = ["from-gray-200 to-gray-100", "from-[#FFD84D] to-[#f0c930]", "from-orange-300 to-orange-200"];
          const textColors = ["text-gray-600", "text-[#7a6500]", "text-orange-700"];
          const gradientIdx = actualRank === 1 ? 1 : actualRank === 2 ? 0 : 2;

          return (
            <div key={entry.name} className={`flex flex-col items-center ${heightClass}`}>
              <div className={`w-full rounded-2xl overflow-hidden bg-gradient-to-b ${gradients[gradientIdx]} p-4 text-center shadow-lg`}>
                <span className="text-[28px] block mb-2">{getMedal(actualRank)}</span>
                <div className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center mx-auto mb-2">
                  <span className={`font-heading text-[18px] font-bold ${textColors[gradientIdx]}`}>{entry.name.charAt(0)}</span>
                </div>
                <p className={`font-heading text-[14px] font-bold ${textColors[gradientIdx]} truncate`}>{entry.name}</p>
                <p className={`font-heading text-[20px] font-bold ${textColors[gradientIdx]} mt-1`}>${entry.amount.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full leaderboard */}
      <div className="flex flex-col gap-3">
        {sorted.map((entry, i) => {
          const rank = i + 1;
          const medal = getMedal(rank);
          const pct = (entry.amount / top) * 100;

          return (
            <motion.div key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-10 flex-shrink-0 text-center">
                    {medal ? (
                      <span className="text-[24px]">{medal}</span>
                    ) : (
                      <span className="font-heading text-[#bbb] text-[18px] font-bold">#{rank}</span>
                    )}
                  </div>

                  {/* Avatar initial */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white text-[16px] font-bold">{entry.name.charAt(0)}</span>
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-[#111] text-[16px] font-semibold">{entry.name}</p>
                    <p className="text-[#888] text-[11px]">Lifetime MS 150 fundraising</p>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-heading text-[#111] text-[22px] font-bold leading-none">${entry.amount.toLocaleString()}</p>
                    <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">raised</p>
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

      {/* Footer */}
      <div className="p-5 rounded-2xl bg-white/8 border border-white/10 text-center">
        <p className="text-white/40 text-[11px] leading-relaxed">
          Leaderboard reflects lifetime fundraising totals for the National MS Society through AANGCC rides and events.
          To update your fundraising total, contact <a href="mailto:info@allassnogascyclingclub.com" className="text-white/60 hover:text-[#FFD84D] transition-colors">info@allassnogascyclingclub.com</a>
        </p>
      </div>
    </div>
  );
}

type Tab = "dashboard" | "directory" | "calendar" | "shop" | "ms150";

export default function PortalPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [billingLoading, setBillingLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const [form, setForm] = useState({
    full_name: "", address_line_1: "", address_line_2: "", city: "", state: "",
    zip_code: "", phone: "", email: "", bio: "", state_location: "",
    show_phone: false, show_email: false, show_address: false,
  });

  useEffect(() => {
    async function loadMember() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/membership/members-only"); return; }
      const { data, error } = await supabase.from("members").select("*").eq("id", user.id).single();
      if (error || !data) {
        const stub: Member = { id: user.id, full_name: user.user_metadata?.full_name || null, address_line_1: null, address_line_2: null, city: null, state: null, zip_code: null, phone: null, email: user.email || null, membership_type: "Individual", membership_status: "active", renewal_date: null, joined_at: user.created_at, is_active: true, stripe_customer_id: null, waiver_signed: false, avatar_url: null, bio: null, show_phone: false, show_email: false, show_address: false, state_location: null };
        setMember(stub);
        setForm({ full_name: stub.full_name || "", address_line_1: "", address_line_2: "", city: "", state: "", zip_code: "", phone: "", email: stub.email || "", bio: "", state_location: "", show_phone: false, show_email: false, show_address: false });
      } else {
        setMember(data);
        setForm({ full_name: data.full_name || "", address_line_1: data.address_line_1 || "", address_line_2: data.address_line_2 || "", city: data.city || "", state: data.state || "", zip_code: data.zip_code || "", phone: data.phone || "", email: data.email || user.email || "", bio: data.bio || "", state_location: data.state_location || "", show_phone: data.show_phone || false, show_email: data.show_email || false, show_address: data.show_address || false });
        if (data.avatar_url) setPhotoPreview(data.avatar_url);
        if (!data.waiver_signed) { router.push("/waiver?redirect=/portal"); return; }
      }
      setLoading(false);
    }
    loadMember();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !member) return;
    if (file.size > 5 * 1024 * 1024) { setSaveError("Photo must be under 5MB."); return; }
    setUploadingPhoto(true); setSaveError("");
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${member.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      await supabase.from("members").update({ avatar_url: avatarUrl }).eq("id", member.id);
      setPhotoPreview(avatarUrl);
      setMember(prev => prev ? { ...prev, avatar_url: avatarUrl } : prev);
      setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) { console.error("Photo upload error:", err); setSaveError("Failed to upload photo. Please try again."); }
    finally { setUploadingPhoto(false); }
  };

  const handleSave = async () => {
    if (!member) return;
    const wordCount = form.bio?.split(/\s+/).filter(Boolean).length || 0;
    if (wordCount > 150) { setSaveError("Bio exceeds 150 words. Please shorten it before saving."); return; }
    setSaving(true); setSaveError(""); setSaveSuccess(false);
    const { error } = await supabase.from("members").update({ full_name: form.full_name, address_line_1: form.address_line_1, address_line_2: form.address_line_2, city: form.city, state: form.state, zip_code: form.zip_code, phone: form.phone, email: form.email, bio: form.bio, state_location: form.state_location, show_phone: form.show_phone, show_email: form.show_email, show_address: form.show_address, updated_at: new Date().toISOString() }).eq("id", member.id);
    setSaving(false);
    if (error) { setSaveError("Failed to save. Please try again."); }
    else { setSaveSuccess(true); setEditing(false); setMember(prev => prev ? { ...prev, ...form } : prev); setTimeout(() => setSaveSuccess(false), 3000); }
  };

  const handleBilling = async () => {
    setBillingLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch("/api/billing/portal", { method: "POST", headers: { "Authorization": `Bearer ${session?.access_token}` } });
      const data = await response.json();
      if (data.url) window.location.href = data.url; else setBillingLoading(false);
    } catch { setBillingLoading(false); }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/membership/members-only");
    router.refresh();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-400";
  const initials = (member?.full_name || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 text-[13px]">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex items-center justify-between py-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#FFD84D] ring-offset-2 ring-offset-transparent flex-shrink-0">
              {photoPreview ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" /> :
                <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                  <span className="font-heading text-white text-[18px] font-bold">{initials}</span>
                </div>}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Member Portal</span>
              </div>
              <h1 className="font-heading text-white text-[28px] lg:text-[36px] font-semibold leading-tight">
                Welcome back{member?.full_name ? `, ${member.full_name.split(" ")[0]}` : ""}.
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              {showProfile ? "Hide Profile" : "Edit Profile"}
            </button>
            <Link href="/" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Site</Link>
            <button onClick={handleSignOut} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-red-400/50 hover:text-red-400 transition-colors duration-200">Sign Out</button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="flex items-center gap-1 mb-8 border-b border-white/10 pb-0 overflow-x-auto">
          {([
            { id: "dashboard", label: "Dashboard", icon: "🏠" },
            { id: "directory", label: "Member Directory", icon: "🚴" },
            { id: "calendar", label: "Team Calendar", icon: "📅" },
            { id: "shop", label: "Club Shop", icon: "🛒" },
            { id: "ms150", label: "MS 150 Leaderboard", icon: "🧡" },
          ] as { id: Tab; label: string; icon: string }[]).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[12px] font-semibold border-b-2 transition-all duration-200 -mb-[1px] whitespace-nowrap ${activeTab === tab.id ? "border-[#FFD84D] text-white" : "border-transparent text-white/50 hover:text-white/80"}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-6">

            {/* Dashboard Widgets */}
            {member && <DashboardWidgets userId={member.id} />}

            {/* Profile section — collapsible */}
            <AnimatePresence>
              {showProfile && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                    {/* Profile Card */}
                    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg">
                      <div className="h-[4px] w-full bg-[#14CFC4]" />
                      <div className="p-7">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="font-heading text-[#111111] text-[22px] font-semibold">Profile Information</h2>
                            <p className="text-[#888] text-[12px] mt-0.5">Your personal details and directory settings.</p>
                          </div>
                          {!editing ? (
                            <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              Edit Profile
                            </button>
                          ) : (
                            <div className="flex gap-2">
                              <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-xl border border-gray-200 text-[#888] text-[12px] font-semibold hover:border-gray-400 transition-colors duration-200">Cancel</button>
                              <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-[#14CFC4] text-white text-[12px] font-semibold hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-200 disabled:opacity-50">
                                {saving ? "Saving..." : "Save Changes"}
                              </button>
                            </div>
                          )}
                        </div>
                        {saveSuccess && <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13px] flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Profile updated successfully.</div>}
                        {saveError && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{saveError}</div>}

                        {/* Photo */}
                        <div className="flex items-center gap-5 mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#FFD84D] ring-offset-2 ring-offset-white">
                              {photoPreview ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center"><span className="font-heading text-white text-[24px] font-bold">{initials}</span></div>}
                            </div>
                            {uploadingPhoto && <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}
                          </div>
                          <div className="flex-1">
                            <p className="text-[#111] text-[13px] font-semibold mb-0.5">Profile Photo</p>
                            <p className="text-[#888] text-[11px] mb-3">Required to appear in the member directory. Max 5MB.</p>
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto} className="px-4 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[11px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-200 disabled:opacity-50">
                              {uploadingPhoto ? "Uploading..." : photoPreview ? "Change Photo" : "Upload Photo"}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name</label><input type="text" value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Your full name" /></div>
                          <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Bio <span className="text-[#aaa] normal-case font-normal">(shown in directory)</span></label>
                            <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} disabled={!editing} placeholder="Tell fellow members a bit about yourself..." rows={3} className={`w-full px-4 py-3 rounded-xl border text-[#111] text-[14px] focus:outline-none transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-400 resize-none ${(form.bio?.split(/\s+/).filter(Boolean).length || 0) > 150 ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#14CFC4]"}`} />
                            <div className="flex items-center justify-between">
                              <p className="text-[#aaa] text-[11px]">Maximum 150 words</p>
                              <p className={`text-[11px] font-medium ${(form.bio?.split(/\s+/).filter(Boolean).length || 0) > 150 ? "text-red-500" : "text-[#aaa]"}`}>{form.bio?.split(/\s+/).filter(Boolean).length || 0} / 150 words</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} disabled={!editing} className={inputClass} placeholder="your@email.com" /></div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} disabled={!editing} className={inputClass} placeholder="(512) 000-0000" /></div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">City</label><input type="text" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Austin" /></div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">State</label><input type="text" value={form.state_location} onChange={e => setForm(p => ({ ...p, state_location: e.target.value }))} disabled={!editing} className={inputClass} placeholder="TX" /></div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Address Line 1</label><input type="text" value={form.address_line_1} onChange={e => setForm(p => ({ ...p, address_line_1: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Street address" /></div>
                          <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Zip Code</label><input type="text" value={form.zip_code} onChange={e => setForm(p => ({ ...p, zip_code: e.target.value }))} disabled={!editing} className={inputClass} placeholder="78701" /></div>
                        </div>

                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Directory Privacy</p>
                            <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-[#14CFC4] text-white text-[11px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-200 disabled:opacity-50">
                              {saving ? "Saving..." : "Save Settings"}
                            </button>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Toggle checked={form.show_phone} onChange={v => setForm(p => ({ ...p, show_phone: v }))} label="Show phone in directory" description="Other members can see your phone number" />
                            <Toggle checked={form.show_email} onChange={v => setForm(p => ({ ...p, show_email: v }))} label="Show email in directory" description="Other members can see your email" />
                            <Toggle checked={form.show_address} onChange={v => setForm(p => ({ ...p, show_address: v }))} label="Show address in directory" description="Other members can see your city and state" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-6">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="h-[4px] w-full bg-[#FFD84D]" />
                        <div className="p-6 flex flex-col gap-4">
                          <div><h2 className="font-heading text-[#111111] text-[20px] font-semibold">Membership</h2></div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Status</span><StatusBadge status={member?.membership_status || null} isActive={member?.is_active || null} /></div>
                            <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Plan</span><span className="text-[#111] text-[13px] font-semibold">{member?.membership_type || "Individual"}</span></div>
                            <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Renewal</span><span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.renewal_date || null)}</span></div>
                            <div className="flex items-center justify-between py-2.5"><span className="text-[#888] text-[12px]">Member Since</span><span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.joined_at || null)}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="h-[4px] w-full bg-[#14CFC4]" />
                        <div className="p-6 flex flex-col gap-4">
                          <div><h2 className="font-heading text-[#111111] text-[20px] font-semibold">Billing</h2></div>
                          <button onClick={handleBilling} disabled={billingLoading} className="w-full py-3.5 rounded-xl bg-[#111111] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                            {billingLoading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Loading...</>) : "Manage Billing"}
                          </button>
                          <p className="text-[#aaa] text-[11px] text-center">Secured by Stripe</p>
                        </div>
                      </div>

                      {(member?.membership_type === "Family" || member?.membership_type === "Small Business" || member?.membership_type === "Corporate") && (
                        <InviteMemberCard member={member} currentUserName={form.full_name} currentUserEmail={form.email} />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── CALENDAR TAB ── */}
        {activeTab === "calendar" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <MemberCalendar />
          </motion.div>
        )}

        {/* ── SHOP TAB ── */}
        {activeTab === "shop" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <div className="bg-white/15 border border-white/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div><h2 className="font-heading text-white text-[24px] font-semibold mb-1">Club Shop</h2><p className="text-white/65 text-[13px] leading-relaxed max-w-[480px]">Official AANGCC apparel and gear — exclusively for members.</p></div>
              <div className="bg-[#FFD84D]/20 border border-[#FFD84D]/40 rounded-xl px-4 py-3 flex-shrink-0">
                <p className="text-[#FFD84D] text-[11px] font-semibold tracking-wide uppercase mb-0.5">Apparel Deadline</p>
                <p className="text-white text-[13px] font-semibold">December 5th</p>
                <p className="text-white/50 text-[10px]">Orders placed after this date may be delayed</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPAREL.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    {item.tag && <div className="absolute top-3 left-3"><span className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-[#FFD84D] text-[#111111]">{item.tag}</span></div>}
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex-1"><h3 className="font-heading text-[#111111] text-[17px] font-semibold leading-snug group-hover:text-[#14CFC4] transition-colors duration-300">{item.name}</h3><p className="text-[#14CFC4] text-[12px] font-medium mt-1">{item.price}</p></div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-xl bg-[#111111] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 block">Order Now</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── DIRECTORY TAB ── */}
        {activeTab === "directory" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🚴</span>
              <h3 className="font-heading text-white text-[28px] font-semibold mb-3">Member Directory</h3>
              <p className="text-white/60 text-[14px] mb-8 max-w-[400px] mx-auto leading-relaxed">Connect with fellow AANGCC members.</p>
              <Link href="/portal/directory" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                View Member Directory →
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── MS 150 LEADERBOARD TAB ── */}
        {activeTab === "ms150" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <MS150Leaderboard />
          </motion.div>
        )}
      </div>
    </div>
  );
}
