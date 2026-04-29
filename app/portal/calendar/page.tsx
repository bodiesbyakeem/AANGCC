"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Category = "Ride" | "Meeting" | "Event" | "Social";

interface RideEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: Category;
  description: string;
  meetAt?: string;
  postRide?: string;
  miles?: string;
  elevation?: string;
  membersOnly?: boolean;
}

const MEMBER_EVENTS: RideEvent[] = [
  // ── Public events (duplicated from rides page) ──
  { id: "1", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-04", time: "8:00 a.m.", category: "Ride", miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" },
  { id: "2", title: "Group Ride — Govalle Neighborhood Park", date: "2026-04-11", time: "8:00 a.m.", category: "Ride", miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" },
  { id: "3", title: "Group Ride — Buescher State Park", date: "2026-04-18", time: "9:00 a.m.", category: "Ride", miles: "22 Miles", elevation: "1,584 Feet Elev.", description: "Route: Buescher State Park", meetAt: "100 Park Road C\nSmithville, Texas 78957", postRide: "Comfort Cafe\n111 NW 1st Street\nSmithville, TX 78957" },
  { id: "4", title: "Mandatory Team Meeting", date: "2026-04-24", time: "5:30 - 6:30 p.m.", category: "Meeting", description: "Mandatory team meeting for all AANGCC members.", meetAt: "8140 Ceberry Drive #B\nAustin, Texas 78759" },
  { id: "5", title: "2026 Texas Bike MS-150 — Day 1 | AUS-LG", date: "2026-04-25", time: "6:15 a.m.", category: "Event", description: "2026 Texas Bike MS-150 · Day 1 from Austin to La Grange.", meetAt: "San Jacinto Parking Garage\n2401 San Jacinto Blvd.\nAustin, Texas 78701" },
  { id: "6", title: "2026 Texas Bike MS-150 — Day 2 | LG-CST", date: "2026-04-26", time: "6:15 a.m.", category: "Event", description: "2026 Texas Bike MS-150 · Day 2 from La Grange to the coast.", meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945" },

  // ── Members-only event ──
  { id: "celebration-2026", title: "Team Celebration Party 🎉", date: "2026-05-16", time: "3:00 p.m.", category: "Social", description: "Join us for our annual team celebration party! Food, drinks, and great company with your AANGCC family. Members and their guests only.", meetAt: "Rose Kirk Home\n4901 Interlachen Lane\nAustin, Texas 78747", membersOnly: true },

  // ── Recurring Saturday rides ──
  ...([
    "2026-05-09","2026-05-23","2026-05-30",
    "2026-06-06","2026-06-13","2026-06-20","2026-06-27",
    "2026-07-04","2026-07-11","2026-07-18","2026-07-25",
    "2026-08-01","2026-08-08","2026-08-15","2026-08-22","2026-08-29",
    "2026-09-05","2026-09-12","2026-09-19","2026-09-26",
    "2026-10-03","2026-10-10",
  ].map((date, i) => ({ id: `sat-${i + 1}`, title: "Group Ride — Govalle Neighborhood Park", date, time: "8:00 a.m.", category: "Ride" as Category, miles: "26 Miles", elevation: "866 Feet Elev.", description: "Route: Govalle Neighborhood Park", meetAt: "Govalle Neighborhood Park\n5200 Bolm Road\nAustin, Texas 78721", postRide: "Monkey Nest Coffee\n5353 Burnet Road\nAustin, Texas 78757" }))),

  { id: "alz-2026", title: "Ride to End ALZ", date: "2026-10-17", time: "8:00 a.m.", category: "Event", miles: "40 Miles", elevation: "2,434 Feet Elev.", description: "Ride to End ALZ — Annual charity ride supporting the Alzheimer's Association.", meetAt: "Speeding Springs\n7100 Creek Road\nDripping Springs, Texas 78620", postRide: "Onsite — Sponsored by H.E.B.\n7100 Creek Road\nDripping Springs, Texas 78620" },
  { id: "ms150-2027-day1", title: "2027 Texas Bike MS-150 — Day 1 | AUS-LG", date: "2027-04-24", time: "6:15 a.m.", category: "Event", description: "2027 Texas Bike MS-150 · Day 1 from Austin to La Grange.", meetAt: "San Jacinto Parking Garage\n2400 San Jacinto Blvd.\nAustin, Texas 78701" },
  { id: "ms150-2027-day2", title: "2027 Texas Bike MS-150 — Day 2 | LG-CST", date: "2027-04-25", time: "6:15 a.m.", category: "Event", description: "2027 Texas Bike MS-150 · Day 2 from La Grange to the coast.", meetAt: "Fayette County Fairgrounds\n1899 N. Jefferson Street\nLa Grange, Texas 78945" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function formatDate(year: number, month: number, day: number) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

function EventModal({ event, onClose }: { event: RideEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl max-w-[520px] w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className={`h-[4px] w-full ${event.membersOnly ? "bg-[#FFD84D]" : "bg-[#14CFC4]"}`} />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#14CFC4]/10 text-[#0FAFA5]">{event.category}</span>
            {event.membersOnly && (
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#FFD84D]/20 text-[#b8960a]">🔒 Members Only</span>
            )}
          </div>
          <h3 className="font-heading text-[#111111] text-[22px] font-semibold mt-2 mb-2 leading-tight">{event.title}</h3>
          <div className="flex items-center gap-3 text-[#888] text-[13px] mb-5">
            <span>{new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span><span>{event.time}</span>
          </div>
          {(event.miles || event.elevation) && (
            <div className="flex gap-3 mb-5">
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

function CalendarGrid({ year, month, events, onSelectEvent }: { year: number; month: number; events: RideEvent[]; onSelectEvent: (e: RideEvent) => void }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const eventsByDate = useMemo(() => {
    const map: Record<string, RideEvent[]> = {};
    events.forEach(ev => { if (!map[ev.date]) map[ev.date] = []; map[ev.date].push(ev); });
    return map;
  }, [events]);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="grid grid-cols-7 bg-[#0FAFA5]">
        {DAYS.map(d => <div key={d} className="py-3 text-center text-[11px] font-semibold tracking-[0.1em] uppercase text-white/80">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - firstDay + 1;
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
          const dateStr = isCurrentMonth ? formatDate(year, month, dayNum) : "";
          const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
          const isToday = dateStr === today;
          return (
            <div key={i} className={`min-h-[90px] p-2 border-b border-r border-gray-100 ${!isCurrentMonth ? "bg-gray-50/50" : "bg-white"} ${i % 7 === 6 ? "border-r-0" : ""}`}>
              {isCurrentMonth && (
                <>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium mb-1 ml-auto ${isToday ? "bg-[#14CFC4] text-white font-bold" : "text-[#999]"}`}>{dayNum}</div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map(ev => (
                      <button key={ev.id} onClick={() => onSelectEvent(ev)}
                        className={`w-full text-left px-2 py-1 rounded-lg text-[10px] font-medium truncate hover:opacity-80 transition-opacity ${ev.membersOnly ? "bg-[#FFD84D]/25 text-[#8a7000]" : ev.category === "Meeting" ? "bg-[#FFD84D]/20 text-[#8a7000]" : ev.category === "Social" ? "bg-purple-100 text-purple-700" : "bg-[#14CFC4]/15 text-[#0FAFA5]"}`}>
                        {ev.membersOnly && "🔒 "}{ev.title}
                      </button>
                    ))}
                    {dayEvents.length > 3 && <button onClick={() => onSelectEvent(dayEvents[3])} className="text-[10px] text-[#aaa] hover:text-[#666] text-left pl-2">+{dayEvents.length - 3} more</button>}
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

function UpcomingEvents({ events, onSelectEvent }: { events: RideEvent[]; onSelectEvent: (e: RideEvent) => void }) {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Upcoming</h3>
      {upcoming.map(ev => {
        const d = new Date(ev.date + "T12:00:00");
        return (
          <button key={ev.id} onClick={() => onSelectEvent(ev)} className="w-full text-left p-4 rounded-xl bg-white/15 border border-white/20 hover:bg-white/25 transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${ev.membersOnly ? "bg-[#FFD84D]" : ev.category === "Meeting" ? "bg-[#FFD84D]" : ev.category === "Social" ? "bg-purple-400" : "bg-white"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] font-medium truncate">{ev.membersOnly && "🔒 "}{ev.title}</div>
                <div className="text-white/55 text-[11px] mt-0.5">{d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {ev.time}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function MemberCalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<RideEvent | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  const filteredEvents = filterCategory === "All" ? MEMBER_EVENTS : MEMBER_EVENTS.filter(e => e.category === filterCategory);
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="min-h-screen pt-[80px]">

      {/* Hero */}
      <section className="relative py-16">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Members Only</span>
              </div>
              <h1 className="font-heading text-white leading-tight" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
                Member <span className="text-gradient-gold">Calendar</span>
              </h1>
              <p className="text-white/65 text-[14px] mt-2 max-w-[480px] leading-relaxed">
                Your full team calendar — group rides, mandatory meetings, charity events, and members-only social events.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD84D]/15 border border-[#FFD84D]/30">
                <span className="text-[#FFD84D] text-[11px]">🔒</span>
                <span className="text-[#FFD84D] text-[11px] font-semibold">Members-only events shown</span>
              </div>
              <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
                ← Back to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="relative py-8 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Calendar */}
            <div className="lg:col-span-9">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <h2 className="font-heading text-white text-[22px] font-semibold min-w-[200px] text-center">{MONTHS[month]} {year}</h2>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {(["All", "Ride", "Meeting", "Event", "Social"] as const).map(cat => (
                    <button key={cat} onClick={() => setFilterCategory(cat as Category | "All")}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all duration-200 ${filterCategory === cat ? "bg-[#FFD84D] text-[#111111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mb-5 flex-wrap">
                {[
                  { label: "Ride", color: "bg-[#14CFC4]" },
                  { label: "Meeting", color: "bg-[#FFD84D]" },
                  { label: "Event", color: "bg-white" },
                  { label: "Social (Members Only)", color: "bg-purple-400" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-white/60 text-[12px]">{item.label}</span>
                  </div>
                ))}
              </div>

              <CalendarGrid year={year} month={month} events={filteredEvents} onSelectEvent={setSelectedEvent} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <UpcomingEvents events={filteredEvents} onSelectEvent={setSelectedEvent} />
              <div className="mt-8 flex flex-col gap-3">
                <h3 className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-2">Quick Links</h3>
                {[
                  { label: "Member Portal", href: "/portal" },
                  { label: "MS 150 Team", href: "/rides/ms150" },
                  { label: "Ride to End ALZ", href: "/rides/alz" },
                  { label: "Ride Levels", href: "/rides/levels" },
                  { label: "Member Directory", href: "/portal/directory" },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/15 border border-white/20 hover:bg-white/25 transition-colors duration-200">
                    <div className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                    <span className="text-white/80 text-[13px] hover:text-white transition-colors duration-200">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>
    </div>
  );
}
