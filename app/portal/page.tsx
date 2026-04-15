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

// ── CALENDAR TYPES & DATA ────────────────────────────────────────────────────

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
      {/* Members-only badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD84D]/15 border border-[#FFD84D]/30">
          <span className="text-[#FFD84D] text-[11px]">🔒</span>
          <span className="text-[#FFD84D] text-[11px] font-semibold">Members-only events included</span>
        </div>
        <p className="text-white/50 text-[12px]">This calendar is only visible to active AANGCC members.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-8">
          {/* Controls */}
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

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {[{ label: "Ride", color: "bg-[#14CFC4]" }, { label: "Meeting", color: "bg-[#FFD84D]" }, { label: "Event", color: "bg-white" }, { label: "Social 🔒", color: "bg-purple-400" }].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-white/55 text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
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

        {/* Upcoming sidebar */}
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

type Tab = "dashboard" | "shop" | "directory" | "calendar";

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
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Member Portal</span>
            </div>
            <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight">
              Welcome back{member?.full_name ? `, ${member.full_name.split(" ")[0]}` : ""}.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Back to Site</Link>
            <button onClick={handleSignOut} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-red-400/50 hover:text-red-400 transition-colors duration-200">Sign Out</button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="flex items-center gap-1 mb-8 border-b border-white/10 pb-0 overflow-x-auto">
          {([
            { id: "dashboard", label: "Dashboard", icon: "🏠" },
            { id: "calendar", label: "Team Calendar", icon: "📅" },
            { id: "shop", label: "Club Shop", icon: "🛒" },
            { id: "directory", label: "Directory", icon: "🚴" },
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg">
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
                      {(form.bio?.split(/\s+/).filter(Boolean).length || 0) > 150 && <p className="text-red-500 text-[12px]">Bio exceeds 150 words — please shorten before saving.</p>}
                    </div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} disabled={!editing} className={inputClass} placeholder="your@email.com" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} disabled={!editing} className={inputClass} placeholder="(512) 000-0000" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">City <span className="text-[#aaa] normal-case font-normal">(directory)</span></label><input type="text" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Austin" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">State <span className="text-[#aaa] normal-case font-normal">(directory)</span></label><input type="text" value={form.state_location} onChange={e => setForm(p => ({ ...p, state_location: e.target.value }))} disabled={!editing} className={inputClass} placeholder="TX" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Address Line 1</label><input type="text" value={form.address_line_1} onChange={e => setForm(p => ({ ...p, address_line_1: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Street address" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Address Line 2</label><input type="text" value={form.address_line_2} onChange={e => setForm(p => ({ ...p, address_line_2: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Apt, suite, etc." /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Zip Code</label><input type="text" value={form.zip_code} onChange={e => setForm(p => ({ ...p, zip_code: e.target.value }))} disabled={!editing} className={inputClass} placeholder="78701" /></div>
                  </div>

                  {/* Privacy Toggles */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Directory Privacy Settings</p>
                      <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-[#14CFC4] text-white text-[11px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-200 disabled:opacity-50">
                        {saving ? "Saving..." : "Save Privacy Settings"}
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Toggle checked={form.show_phone} onChange={v => setForm(p => ({ ...p, show_phone: v }))} label="Show phone number in directory" description="Other members can see and call your phone number" />
                      <Toggle checked={form.show_email} onChange={v => setForm(p => ({ ...p, show_email: v }))} label="Show email address in directory" description="Other members can see and email you directly" />
                      <Toggle checked={form.show_address} onChange={v => setForm(p => ({ ...p, show_address: v }))} label="Show address in directory" description="Other members can see your city, state, and zip code" />
                    </div>
                    <p className="text-[#aaa] text-[11px] mt-3 leading-relaxed">Even with contact info hidden, other members can still message you through the directory.</p>
                  </div>
                </div>
              </motion.div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-[4px] w-full bg-[#FFD84D]" />
                  <div className="p-6 flex flex-col gap-4">
                    <div><h2 className="font-heading text-[#111111] text-[20px] font-semibold">Membership</h2><p className="text-[#888] text-[12px] mt-0.5">Your current plan and status.</p></div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Status</span><StatusBadge status={member?.membership_status || null} isActive={member?.is_active || null} /></div>
                      <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Plan</span><span className="text-[#111] text-[13px] font-semibold">{member?.membership_type || "Individual"}</span></div>
                      <div className="flex items-center justify-between py-2.5 border-b border-gray-100"><span className="text-[#888] text-[12px]">Renewal Date</span><span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.renewal_date || null)}</span></div>
                      <div className="flex items-center justify-between py-2.5"><span className="text-[#888] text-[12px]">Member Since</span><span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.joined_at || null)}</span></div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-[4px] w-full bg-[#14CFC4]" />
                  <div className="p-6 flex flex-col gap-4">
                    <div><h2 className="font-heading text-[#111111] text-[20px] font-semibold">Billing</h2><p className="text-[#888] text-[12px] mt-0.5">Manage payment methods and invoices.</p></div>
                    <p className="text-[#555] text-[13px] leading-relaxed">Update your payment method, download invoices, or cancel your subscription through the secure Stripe billing portal.</p>
                    <button onClick={handleBilling} disabled={billingLoading} className="w-full py-3.5 rounded-xl bg-[#111111] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                      {billingLoading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Loading...</>) : (<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Manage Billing</>)}
                    </button>
                    <p className="text-[#aaa] text-[11px] text-center">Secured by Stripe · No card data stored by AANGCC</p>
                  </div>
                </motion.div>

                {(member?.membership_type === "Family" || member?.membership_type === "Small Business" || member?.membership_type === "Corporate") && (
                  <InviteMemberCard member={member} currentUserName={form.full_name} currentUserEmail={form.email} />
                )}

                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="bg-white/15 border border-white/20 rounded-2xl p-5">
                  <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-4">Quick Links</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Member Directory", href: "/portal/directory" },
                      { label: "Team Photos", href: "/rides/photos" },
                      { label: "MS 150 Team", href: "/rides/ms150" },
                      { label: "Support MS ALZ RR", href: "/donate" },
                      { label: "Contact Us", href: "/contact" },
                    ].map(link => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-white/70 text-[13px] hover:text-[#FFD84D] transition-colors duration-200">
                        <span className="w-1 h-1 rounded-full bg-[#FFD84D]" />{link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
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
            <div className="mt-10 text-center">
              <p className="text-white/45 text-[12px] leading-relaxed max-w-[480px] mx-auto">All purchases processed securely through Stripe. Custom apparel manufactured in Germany — allow 4–6 weeks for delivery. Questions? <a href="mailto:info@allassnogascyclingclub.com" className="text-white/65 hover:text-[#FFD84D] transition-colors">info@allassnogascyclingclub.com</a></p>
            </div>
          </motion.div>
        )}

        {/* ── DIRECTORY TAB ── */}
        {activeTab === "directory" && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🚴</span>
              <h3 className="font-heading text-white text-[28px] font-semibold mb-3">Member Directory</h3>
              <p className="text-white/60 text-[14px] mb-8 max-w-[400px] mx-auto leading-relaxed">Connect with fellow AANGCC members. Send messages, see contact info, and build community.</p>
              <Link href="/portal/directory" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                View Member Directory →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
