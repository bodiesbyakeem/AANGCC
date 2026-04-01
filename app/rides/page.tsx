"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "Ride" | "Meeting" | "Event";

interface RideEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: Category;
  description: string;
  meetAt?: string;
  postRide?: string;
  miles?: string;
  elevation?: string;
}

// ─── Event Data ───────────────────────────────────────────────────────────────

const INITIAL_EVENTS: RideEvent[] = [
  // April 2026
  {
    id: "1",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-04-04",
    time: "8:00 a.m.",
    category: "Ride",
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721",
    postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757",
  },
  {
    id: "2",
    title: "Group Ride — Govalle Neighborhood Park",
    date: "2026-04-11",
    time: "8:00 a.m.",
    category: "Ride",
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721",
    postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757",
  },
  {
    id: "3",
    title: "Group Ride — Buescher State Park",
    date: "2026-04-18",
    time: "9:00 a.m.",
    category: "Ride",
    miles: "22 Miles",
    elevation: "1,584 Feet Elev.",
    description: "Route: Buescher State Park",
    meetAt: "100 Park Road C\nSmithville, Texas 78957",
    postRide: "Comfort Cafe\n111 NW 1st Street\nSmithville, TX 78957",
  },
  {
    id: "4",
    title: "Mandatory Team Meeting",
    date: "2026-04-24",
    time: "5:30 - 6:30 p.m.",
    category: "Meeting",
    description: "Mandatory team meeting for all AANGCC members.",
    meetAt: "8140 Ceberry Drive #B\nAustin, Texas 78759",
  },
  {
    id: "5",
    title: "2026 Texas Bike MS-150 — Day 1 | AUS-LG",
    date: "2026-04-25",
    time: "6:15 a.m.",
    category: "Event",
    description: "2026 Texas Bike MS-150 · Day 1 from Austin to La Grange.",
    meetAt: "San Jacinto Parking Garage\n2400 San Jacinto Blvd.\nAustin, Texas 78701",
  },
  {
    id: "6",
    title: "2026 Texas Bike MS-150 — Day 2 | LG-CST",
    date: "2026-04-26",
    time: "6:15 a.m.",
    category: "Event",
    description: "2026 Texas Bike MS-150 · Day 2 from La Grange to the coast.",
    meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945",
  },
  // Recurring Saturday rides May 9 – Oct 10, 2026
  ...([
    "2026-05-09","2026-05-16","2026-05-23","2026-05-30",
    "2026-06-06","2026-06-13","2026-06-20","2026-06-27",
    "2026-07-04","2026-07-11","2026-07-18","2026-07-25",
    "2026-08-01","2026-08-08","2026-08-15","2026-08-22","2026-08-29",
    "2026-09-05","2026-09-12","2026-09-19","2026-09-26",
    "2026-10-03","2026-10-10",
  ].map((date, i) => ({
    id: `sat-${i + 1}`,
    title: "Group Ride — Govalle Neighborhood Park",
    date,
    time: "8:00 a.m.",
    category: "Ride" as Category,
    miles: "26 Miles",
    elevation: "866 Feet Elev.",
    description: "Route: Govalle Neighborhood Park",
    meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721",
    postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757",
  }))),
  // October 2026
  {
    id: "alz-2026",
    title: "Ride to End ALZ",
    date: "2026-10-17",
    time: "8:00 a.m.",
    category: "Event",
    miles: "40 Miles",
    elevation: "2,434 Feet Elev.",
    description: "Ride to End ALZ — Annual charity ride supporting the Alzheimer's Association.",
    meetAt: "Speeding Springs\n7100 Creek Road\nDripping Springs, Texas 78620",
    postRide: "Onsite — Sponsored by H.E.B.\n7100 Creek Road\nDripping Springs, Texas 78620",
  },
  // 2027 MS 150
  {
    id: "ms150-2027-day1",
    title: "2027 Texas Bike MS-150 — Day 1 | AUS-LG",
    date: "2027-04-24",
    time: "6:15 a.m.",
    category: "Event",
    description: "2027 Texas Bike MS-150 · Day 1 from Austin to La Grange.",
    meetAt: "San Jacinto Parking Garage\n2400 San Jacinto Blvd.\nAustin, Texas 78701",
  },
  {
    id: "ms150-2027-day2",
    title: "2027 Texas Bike MS-150 — Day 2 | LG-CST",
    date: "2027-04-25",
    time: "6:15 a.m.",
    category: "Event",
    description: "2027 Texas Bike MS-150 · Day 2 from La Grange to the coast.",
    meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  Ride:    { bg: "bg-[#2A9D9E]/20", text: "text-[#2A9D9E]", dot: "bg-[#2A9D9E]" },
  Meeting: { bg: "bg-[#FFD84D]/20", text: "text-[#FFD84D]", dot: "bg-[#FFD84D]" },
  Event:   { bg: "bg-white/10",     text: "text-white",     dot: "bg-white" },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ─── Admin Password ───────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "AANGCC2026";

// ─── Event Detail Modal ───────────────────────────────────────────────────────

function EventModal({ event, onClose }: { event: RideEvent; onClose: () => void }) {
  const colors = CATEGORY_COLORS[event.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-2xl max-w-[520px] w-full overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className={`h-[3px] w-full ${event.category === "Ride" ? "bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" : event.category === "Meeting" ? "bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" : "bg-gradient-to-r from-transparent via-white/40 to-transparent"}`} />

        <div className="p-8">
          {/* Close */}
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {/* Category badge */}
          <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {event.category}
          </span>

          {/* Title */}
          <h3 className="font-heading text-white text-[24px] font-semibold mt-4 mb-2 leading-tight">{event.title}</h3>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-white/40 text-[13px] mb-6">
            <span>{new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span>
            <span>{event.time}</span>
          </div>

          {/* Stats row */}
          {(event.miles || event.elevation) && (
            <div className="flex gap-3 mb-6">
              {event.miles && (
                <div className="px-4 py-2 rounded-xl bg-[#2A9D9E]/10 border border-[#2A9D9E]/20 text-[#2A9D9E] text-[13px] font-semibold">
                  🚴 {event.miles}
                </div>
              )}
              {event.elevation && (
                <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 text-[13px] font-semibold">
                  ⛰️ {event.elevation}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {event.description && (
            <p className="text-white/50 text-[14px] leading-relaxed mb-5">{event.description}</p>
          )}

          {/* Meet At */}
          {event.meetAt && (
            <div className="mb-4">
              <div className="text-white/30 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Meet At</div>
              <p className="text-white/60 text-[13px] leading-relaxed whitespace-pre-line">{event.meetAt}</p>
            </div>
          )}

          {/* Post Ride */}
          {event.postRide && (
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="text-[#FFD84D] text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Post Ride Social</div>
              <p className="text-white/60 text-[13px] leading-relaxed whitespace-pre-line">{event.postRide}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Admin Form ───────────────────────────────────────────────────────────────

function AdminForm({ onAdd, onClose }: { onAdd: (e: RideEvent) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: "", date: "", time: "", category: "Ride" as Category, description: "", meetAt: "", postRide: "", miles: "", elevation: "" });

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[#2A9D9E]/50 transition-colors duration-200";

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.time) return;
    onAdd({ ...form, id: Date.now().toString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#0d0d0d] border border-white/[0.08] rounded-2xl max-w-[560px] w-full overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#2A9D9E] to-transparent" />
        <div className="p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-white text-[22px] font-semibold">Add New Event</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Event Title *</label>
              <input className={inputClass} placeholder="Group Ride — Govalle Park" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Date *</label>
              <input type="date" className={inputClass} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Time *</label>
              <input className={inputClass} placeholder="8:00 a.m." value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Category</label>
              <select className={inputClass + " cursor-pointer"} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as Category }))}>
                <option value="Ride" className="bg-[#0d0d0d]">Ride</option>
                <option value="Meeting" className="bg-[#0d0d0d]">Meeting</option>
                <option value="Event" className="bg-[#0d0d0d]">Event</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Miles</label>
              <input className={inputClass} placeholder="26 Miles" value={form.miles} onChange={e => setForm(p => ({ ...p, miles: e.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Elevation</label>
              <input className={inputClass} placeholder="866 Feet Elev." value={form.elevation} onChange={e => setForm(p => ({ ...p, elevation: e.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Description</label>
              <textarea className={inputClass + " resize-none"} rows={2} placeholder="Route details..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Meet At</label>
              <textarea className={inputClass + " resize-none"} rows={3} placeholder="Location name&#10;Address&#10;City, State ZIP" value={form.meetAt} onChange={e => setForm(p => ({ ...p, meetAt: e.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-white/40 text-[11px] tracking-wide uppercase font-medium">Post Ride Social</label>
              <textarea className={inputClass + " resize-none"} rows={3} placeholder="Venue name&#10;Address&#10;City, State ZIP" value={form.postRide} onChange={e => setForm(p => ({ ...p, postRide: e.target.value }))} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSubmit} disabled={!form.title || !form.date || !form.time} className={`flex-1 py-3 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${form.title && form.date && form.time ? "bg-[#2A9D9E] text-black hover:bg-[#FFD84D]" : "bg-white/[0.05] text-white/20 cursor-not-allowed"}`}>
              Add Event
            </button>
            <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/[0.08] text-white/40 text-[13px] hover:text-white hover:border-white/20 transition-all duration-200">
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (pw === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl max-w-[380px] w-full overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />
        <div className="p-8 flex flex-col gap-5">
          <h3 className="font-heading text-white text-[22px] font-semibold">Admin Access</h3>
          <p className="text-white/40 text-[13px]">Enter the admin password to add events.</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-[#2A9D9E]/50 transition-colors duration-200"
          />
          {error && <p className="text-red-400 text-[13px]">Incorrect password. Please try again.</p>}
          <button onClick={handleSubmit} className="w-full py-3 rounded-xl bg-[#FFD84D] text-black text-[13px] font-semibold tracking-[0.08em] uppercase hover:bg-white transition-colors duration-300">
            Unlock
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Calendar Grid ────────────────────────────────────────────────────────────

function CalendarGrid({ year, month, events, onSelectEvent }: {
  year: number;
  month: number;
  events: RideEvent[];
  onSelectEvent: (e: RideEvent) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const eventsByDate = useMemo(() => {
    const map: Record<string, RideEvent[]> = {};
    events.forEach(ev => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, [events]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-white/[0.07]">
        {DAYS.map(d => (
          <div key={d} className="py-3 text-center text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - firstDay + 1;
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
          const dateStr = isCurrentMonth ? formatDate(year, month, dayNum) : "";
          const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
          const isToday = dateStr === today;

          return (
            <div
              key={i}
              className={`
                min-h-[100px] p-2 border-b border-r border-white/[0.05]
                ${!isCurrentMonth ? "bg-transparent" : ""}
                ${i % 7 === 6 ? "border-r-0" : ""}
              `}
            >
              {isCurrentMonth && (
                <>
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium mb-1 ml-auto
                    ${isToday ? "bg-[#2A9D9E] text-black font-bold" : "text-white/40"}
                  `}>
                    {dayNum}
                  </div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map(ev => {
                      const colors = CATEGORY_COLORS[ev.category];
                      return (
                        <button
                          key={ev.id}
                          onClick={() => onSelectEvent(ev)}
                          className={`
                            w-full text-left px-2 py-1 rounded-lg text-[10px] font-medium truncate
                            ${colors.bg} ${colors.text}
                            hover:opacity-80 transition-opacity duration-150
                          `}
                        >
                          {ev.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <button onClick={() => onSelectEvent(dayEvents[3])} className="text-[10px] text-white/30 hover:text-white/50 text-left pl-2">
                        +{dayEvents.length - 3} more
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Upcoming Events List ─────────────────────────────────────────────────────

function UpcomingEvents({ events, onSelectEvent }: { events: RideEvent[]; onSelectEvent: (e: RideEvent) => void }) {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white/30 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Upcoming</h3>
      {upcoming.map(ev => {
        const colors = CATEGORY_COLORS[ev.category];
        const d = new Date(ev.date + "T12:00:00");
        return (
          <button
            key={ev.id}
            onClick={() => onSelectEvent(ev)}
            className="w-full text-left p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${colors.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-[13px] font-medium truncate group-hover:text-white transition-colors duration-200">
                  {ev.title}
                </div>
                <div className="text-white/30 text-[11px] mt-0.5">
                  {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {ev.time}
                </div>
              </div>
              <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${colors.bg} ${colors.text}`}>
                {ev.category}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Calendar Page ───────────────────────────────────────────────────────

export default function RidesPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<RideEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<RideEvent | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  const filteredEvents = filterCategory === "All"
    ? events
    : events.filter(e => e.category === filterCategory);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleAdminUnlock = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setShowAdminForm(true);
  };

  const handleAddEvent = (ev: RideEvent) => {
    setEvents(prev => [...prev, ev]);
  };

  return (
    <div className="min-h-screen bg-black pt-[72px]">

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(42,157,158,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(42,157,158,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2A9D9E]/[0.06] blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-[#2A9D9E]" />
              <span className="text-[#2A9D9E] text-[11px] font-semibold tracking-[0.25em] uppercase">Get Out & Ride</span>
              <span className="h-[1px] w-10 bg-[#2A9D9E]" />
            </div>
            <h1 className="font-heading text-white leading-tight mb-4" style={{ fontSize: "clamp(42px, 7vw, 96px)" }}>
              Ride <span className="text-gradient-teal">Calendar</span>
            </h1>
            <p className="text-white/50 text-[16px] max-w-[500px] mx-auto leading-relaxed">
              From weekly group rides to major charity events — find your next ride and show up ready to roll.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Calendar Section ── */}
      <section className="relative bg-[#0a0a0a] py-12 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── Main Calendar ── */}
            <div className="lg:col-span-9">

              {/* Controls */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                {/* Month nav */}
                <div className="flex items-center gap-4">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <h2 className="font-heading text-white text-[24px] font-semibold min-w-[220px] text-center">
                    {MONTHS[month]} {year}
                  </h2>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>

                {/* Filter + Admin */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Category filter */}
                  {(["All", "Ride", "Meeting", "Event"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all duration-200 ${filterCategory === cat ? "bg-[#2A9D9E] text-black border-[#2A9D9E]" : "bg-transparent text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/70"}`}
                    >
                      {cat}
                    </button>
                  ))}

                  {/* Admin button */}
                  <button
                    onClick={() => isAdmin ? setShowAdminForm(true) : setShowAdminLogin(true)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-[#FFD84D]/30 bg-[#FFD84D]/[0.05] text-[#FFD84D] text-[11px] font-semibold tracking-wide hover:border-[#FFD84D]/60 transition-all duration-200"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    {isAdmin ? "Add Event" : "Admin"}
                  </button>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mb-5">
                {(["Ride", "Meeting", "Event"] as Category[]).map(cat => (
                  <div key={cat} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${CATEGORY_COLORS[cat].dot}`} />
                    <span className="text-white/40 text-[12px]">{cat}</span>
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <CalendarGrid
                year={year}
                month={month}
                events={filteredEvents}
                onSelectEvent={setSelectedEvent}
              />
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-3">
              <UpcomingEvents events={filteredEvents} onSelectEvent={setSelectedEvent} />

              {/* Quick links */}
              <div className="mt-8 flex flex-col gap-3">
                <h3 className="text-white/30 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Quick Links</h3>
                <Link href="/rides/ms150" className="flex items-center gap-3 p-4 rounded-xl border border-[#FFD84D]/15 bg-[#FFD84D]/[0.02] hover:border-[#FFD84D]/30 transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                  <span className="text-white/50 text-[13px] hover:text-white/70">MS 150 Team</span>
                </Link>
                <Link href="/rides/alz" className="flex items-center gap-3 p-4 rounded-xl border border-[#2A9D9E]/15 bg-[#2A9D9E]/[0.02] hover:border-[#2A9D9E]/30 transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-[#2A9D9E]" />
                  <span className="text-white/50 text-[13px] hover:text-white/70">Ride to End ALZ</span>
                </Link>
                <Link href="/rides/rosedale" className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/50 text-[13px] hover:text-white/70">Rosedale Ride</span>
                </Link>
                <Link href="/rides/levels" className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/50 text-[13px] hover:text-white/70">Ride Levels</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
        {showAdminLogin && (
          <AdminLogin onSuccess={handleAdminUnlock} />
        )}
        {showAdminForm && isAdmin && (
          <AdminForm onAdd={handleAddEvent} onClose={() => setShowAdminForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
