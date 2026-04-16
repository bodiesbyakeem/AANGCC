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
  notes: string | null;
  created_at: string;
}

const emptyForm = {
  title: "",
  ride_date: new Date().toISOString().split("T")[0],
  distance_miles: "",
  duration_minutes: "",
  avg_speed: "",
  elevation_feet: "",
  calories: "",
  avg_heart_rate: "",
  notes: "",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}

function RideCard({ ride, onDelete }: { ride: Ride; onDelete: (id: string) => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading text-[#111111] text-[18px] font-semibold leading-tight">
              {ride.title || "Untitled Ride"}
            </h3>
            <p className="text-[#888] text-[12px] mt-1">{formatDate(ride.ride_date)}</p>
          </div>
          <div className="flex items-center gap-2">
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-400 transition-colors duration-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => onDelete(ride.id)}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white text-[11px] font-semibold hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <button onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1 rounded-lg bg-gray-100 text-[#888] text-[11px] font-semibold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#14CFC4]/8 rounded-xl p-3 text-center">
            <p className="font-heading text-[#111] text-[20px] font-bold">{ride.distance_miles}</p>
            <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Miles</p>
          </div>
          <div className="bg-[#FFD84D]/10 rounded-xl p-3 text-center">
            <p className="font-heading text-[#111] text-[20px] font-bold">{formatDuration(ride.duration_minutes)}</p>
            <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Duration</p>
          </div>
          {ride.avg_speed && (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="font-heading text-[#111] text-[20px] font-bold">{ride.avg_speed}</p>
              <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Avg MPH</p>
            </div>
          )}
          {ride.elevation_feet ? (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="font-heading text-[#111] text-[20px] font-bold">{ride.elevation_feet.toLocaleString()}</p>
              <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Elev Ft</p>
            </div>
          ) : null}
        </div>

        {(ride.calories || ride.avg_heart_rate) && (
          <div className="flex gap-3 mt-3">
            {ride.calories ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600">
                <span className="text-[12px]">🔥</span>
                <span className="text-[12px] font-semibold">{ride.calories} cal</span>
              </div>
            ) : null}
            {ride.avg_heart_rate ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500">
                <span className="text-[12px]">❤️</span>
                <span className="text-[12px] font-semibold">{ride.avg_heart_rate} bpm</span>
              </div>
            ) : null}
          </div>
        )}

        {ride.notes && (
          <p className="mt-3 text-[#666] text-[13px] leading-relaxed border-t border-gray-100 pt-3">{ride.notes}</p>
        )}
      </div>
    </motion.div>
  );
}

function LogRideModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const supabase = createClient();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!form.ride_date || !form.distance_miles || !form.duration_minutes) {
      setError("Date, distance, and duration are required.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: insertError } = await supabase.from("rides").insert({
        user_id: user.id,
        title: form.title || null,
        ride_date: form.ride_date,
        distance_miles: parseFloat(form.distance_miles),
        duration_minutes: parseInt(form.duration_minutes),
        avg_speed: form.avg_speed ? parseFloat(form.avg_speed) : null,
        elevation_feet: form.elevation_feet ? parseInt(form.elevation_feet) : null,
        calories: form.calories ? parseInt(form.calories) : null,
        avg_heart_rate: form.avg_heart_rate ? parseInt(form.avg_heart_rate) : null,
        notes: form.notes || null,
        updated_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save ride. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-[#111111] text-[22px] font-semibold">Log a Ride</h2>
              <p className="text-[#888] text-[12px] mt-0.5">Record your ride details manually</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Ride Title</label>
              <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Saturday Morning Ride" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Date *</label>
              <input type="date" value={form.ride_date} onChange={e => setForm(p => ({ ...p, ride_date: e.target.value }))} className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Distance (miles) *</label>
                <input type="number" step="0.1" value={form.distance_miles} onChange={e => setForm(p => ({ ...p, distance_miles: e.target.value }))}
                  placeholder="26.0" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Duration (minutes) *</label>
                <input type="number" value={form.duration_minutes} onChange={e => setForm(p => ({ ...p, duration_minutes: e.target.value }))}
                  placeholder="90" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Avg Speed (mph)</label>
                <input type="number" step="0.1" value={form.avg_speed} onChange={e => setForm(p => ({ ...p, avg_speed: e.target.value }))}
                  placeholder="17.0" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Elevation (feet)</label>
                <input type="number" value={form.elevation_feet} onChange={e => setForm(p => ({ ...p, elevation_feet: e.target.value }))}
                  placeholder="866" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Calories</label>
                <input type="number" value={form.calories} onChange={e => setForm(p => ({ ...p, calories: e.target.value }))}
                  placeholder="800" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Avg Heart Rate (bpm)</label>
                <input type="number" value={form.avg_heart_rate} onChange={e => setForm(p => ({ ...p, avg_heart_rate: e.target.value }))}
                  placeholder="145" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="How did the ride feel? Any highlights?" rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 resize-none" />
            </div>

            <button onClick={handleSave} disabled={saving || !form.ride_date || !form.distance_miles || !form.duration_minutes}
              className={`w-full py-3.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${!saving && form.ride_date && form.distance_miles && form.duration_minutes ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {saving ? "Saving..." : "Save Ride →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function MyRidesPage() {
  const supabase = createClient();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/membership/members-only"; return; }
      setUserId(user.id);
      await fetchRides(user.id);
    }
    load();
  }, []);

  const fetchRides = async (uid: string) => {
    setLoading(true);
    const { data } = await supabase.from("rides").select("*").eq("user_id", uid).order("ride_date", { ascending: false });
    setRides(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("rides").delete().eq("id", id);
    setRides(prev => prev.filter(r => r.id !== id));
  };

  const totalMiles = rides.reduce((sum, r) => sum + r.distance_miles, 0);
  const totalRides = rides.length;
  const totalElevation = rides.reduce((sum, r) => sum + (r.elevation_feet || 0), 0);

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {showModal && <LogRideModal onClose={() => setShowModal(false)} onSaved={() => fetchRides(userId)} />}
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
              My <span className="text-gradient-gold">Rides</span>
            </h1>
            <p className="text-white/60 text-[14px] mt-1">{totalRides} rides logged · {totalMiles.toFixed(1)} total miles</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
            <button onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              + Log Ride
            </button>
          </div>
        </motion.div>

        {/* Stats summary */}
        {rides.length > 0 && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Miles", value: totalMiles.toFixed(1), icon: "🚴" },
              { label: "Total Rides", value: totalRides, icon: "📅" },
              { label: "Total Elevation", value: `${totalElevation.toLocaleString()} ft`, icon: "⛰️" },
            ].map(stat => (
              <div key={stat.label} className="bg-white/15 border border-white/20 rounded-2xl p-5 text-center">
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className="font-heading text-white text-[24px] font-bold">{stat.value}</p>
                <p className="text-white/55 text-[11px] uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Rides list */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading your rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-center py-20">
            <span className="text-6xl mb-4 block">🚴</span>
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">No rides logged yet</h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">Start tracking your rides to see your progress, earn leaderboard spots, and unlock personal bests.</p>
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log Your First Ride →
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {rides.map(ride => (
                <RideCard key={ride.id} ride={ride} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
