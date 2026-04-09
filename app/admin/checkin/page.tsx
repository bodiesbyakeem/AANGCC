"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ADMIN_PASSWORD = "AANGCC2026";
const SITE_URL = "https://www.allassnogascyclingclub.com";

interface CheckIn {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_member: boolean;
  waiver_verified: boolean;
  check_in_time: string;
}

function QRCodeDisplay({ url }: { url: string }) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // Use Google Charts API to generate QR code
    const encoded = encodeURIComponent(url);
    setQrUrl(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encoded}&choe=UTF-8`);
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-4">
      {qrUrl && (
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <img src={qrUrl} alt="Check-in QR Code" className="w-[200px] h-[200px]" />
        </div>
      )}
      <p className="text-white/60 text-[11px] text-center max-w-[200px] leading-relaxed">
        Riders scan this QR code to check in
      </p>
    </div>
  );
}

export default function AdminCheckinPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [eventName, setEventName] = useState("");
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [checkInUrl, setCheckInUrl] = useState("");
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingReport, setSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleCreateEvent = async () => {
    if (!eventName.trim()) return;
    const eventId = encodeURIComponent(eventName.trim().toLowerCase().replace(/\s+/g, "-"));
    const url = `${SITE_URL}/checkin/${eventId}`;
    setActiveEvent(eventName.trim());
    setCheckInUrl(url);
    setCheckIns([]);
    fetchCheckIns(eventId);

    // Auto-refresh every 15 seconds
    if (refreshInterval.current) clearInterval(refreshInterval.current);
    refreshInterval.current = setInterval(() => fetchCheckIns(eventId), 15000);

    // Send SMS blast to all members
    try {
      await fetch("/api/sms/fundraising", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: "event-day",
          bulk: true,
          eventName: eventName.trim(),
          location: "Govalle Neighborhood Park",
          campaign: "event-checkin",
        }),
      });
    } catch {
      console.error("SMS blast failed");
    }
  };

  const fetchCheckIns = async (eventId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/checkin?event_id=${encodeURIComponent(eventId)}`);
      const data = await response.json();
      if (data.checkins) setCheckIns(data.checkins);
    } catch {
      console.error("Failed to fetch check-ins");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReport = async () => {
    if (!activeEvent) return;
    setSendingReport(true);
    try {
      await fetch("/api/checkin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: activeEvent,
          checkins: checkIns,
          send_report: true,
        }),
      });
      setReportSent(true);
      setTimeout(() => setReportSent(false), 3000);
    } catch {
      console.error("Failed to send report");
    } finally {
      setSendingReport(false);
    }
  };

  useEffect(() => {
    return () => {
      if (refreshInterval.current) clearInterval(refreshInterval.current);
    };
  }, []);

  const members = checkIns.filter((c) => c.is_member);
  const guests = checkIns.filter((c) => !c.is_member);
  const waiverVerified = checkIns.filter((c) => c.waiver_verified);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <Link href="/">
              <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-3" />
            </Link>
            <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase">Admin · Check-In Dashboard</p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#FFD84D]" />
            <div className="p-7">
              <h1 className="font-heading text-[#111111] text-[24px] font-semibold mb-1">Admin Access</h1>
              <p className="text-[#888] text-[13px] mb-6">Enter the admin password to continue.</p>
              {passwordError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">Incorrect password.</div>
              )}
              <div className="flex flex-col gap-4">
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                  placeholder="Admin password" autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                <button onClick={handleLogin} className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                  Enter Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex items-center justify-between py-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Admin Dashboard</span>
            </div>
            <h1 className="font-heading text-white text-[32px] font-semibold">QR Check-In System</h1>
          </div>
          <Link href="/" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
            ← Back to Site
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Create Event + QR Code */}
          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-6">
                <h2 className="font-heading text-[#111111] text-[20px] font-semibold mb-4">Create Event</h2>
                <div className="flex flex-col gap-3">
                  <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleCreateEvent(); }}
                    placeholder="e.g. Saturday Morning Ride"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                  <button onClick={handleCreateEvent} disabled={!eventName.trim()}
                    className={`w-full py-3 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${eventName.trim() ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                    Generate QR Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* QR Code */}
            {checkInUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[4px] w-full bg-[#14CFC4]" />
                <div className="p-6 flex flex-col items-center gap-4">
                  <h3 className="font-heading text-[#111111] text-[18px] font-semibold">{activeEvent}</h3>
                  <QRCodeDisplay url={checkInUrl} />
                  <div className="w-full">
                    <p className="text-[#888] text-[11px] uppercase tracking-wide mb-2">Check-In URL</p>
                    <div className="bg-gray-50 rounded-xl p-3 break-all">
                      <p className="text-[#555] text-[11px] leading-relaxed">{checkInUrl}</p>
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(checkInUrl); }}
                    className="w-full py-2.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                    Copy URL
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Check-In List */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Stats */}
            {activeEvent && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Check-Ins", value: checkIns.length, color: "teal" },
                  { label: "Members", value: members.length, color: "gold" },
                  { label: "Guests", value: guests.length, color: "teal" },
                  { label: "Waiver Verified", value: waiverVerified.length, color: "gold" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-md">
                    <div className={`font-heading text-[32px] font-bold leading-none mb-1 ${stat.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`} style={{ WebkitTextStroke: stat.color === "gold" ? "1px #e6c235" : "1px #0FAFA5" }}>
                      {stat.value}
                    </div>
                    <div className="text-[#888] text-[10px] uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Attendee List */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-lg flex-1">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div>
                    <h2 className="font-heading text-[#111111] text-[20px] font-semibold">
                      {activeEvent ? `${activeEvent} — Attendees` : "No Active Event"}
                    </h2>
                    {activeEvent && <p className="text-[#888] text-[12px]">Auto-refreshes every 15 seconds</p>}
                  </div>
                  {activeEvent && (
                    <div className="flex gap-2">
                      <button onClick={() => { const eventId = encodeURIComponent(activeEvent.toLowerCase().replace(/\s+/g, "-")); fetchCheckIns(eventId); }}
                        className="px-4 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                        Refresh
                      </button>
                      <button onClick={handleSendReport} disabled={sendingReport || checkIns.length === 0}
                        className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-colors duration-200 ${checkIns.length > 0 && !sendingReport ? "bg-[#FFD84D] text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                        {reportSent ? "✓ Sent!" : sendingReport ? "Sending..." : "Email Report"}
                      </button>
                    </div>
                  )}
                </div>

                {!activeEvent ? (
                  <div className="text-center py-16">
                    <span className="text-4xl mb-4 block">📋</span>
                    <p className="text-[#888] text-[14px]">Create an event to start tracking check-ins</p>
                  </div>
                ) : loading && checkIns.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-[#14CFC4] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#888] text-[13px]">Loading check-ins...</p>
                  </div>
                ) : checkIns.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-4xl mb-4 block">🚴</span>
                    <p className="text-[#888] text-[14px]">No check-ins yet — share the QR code!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {checkIns.map((checkin, i) => (
                      <motion.div key={checkin.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-[14px] flex-shrink-0 ${checkin.is_member ? "bg-[#14CFC4]/20 text-[#0FAFA5]" : "bg-[#FFD84D]/20 text-[#b8960a]"}`}>
                          {checkin.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[#111] font-semibold text-[14px]">{checkin.name}</span>
                            <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${checkin.is_member ? "bg-[#14CFC4]/10 text-[#0FAFA5]" : "bg-[#FFD84D]/20 text-[#b8960a]"}`}>
                              {checkin.is_member ? "Member" : "Guest"}
                            </span>
                            {checkin.waiver_verified && (
                              <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
                                ✓ Waiver
                              </span>
                            )}
                          </div>
                          <div className="text-[#888] text-[11px] mt-0.5">{checkin.email}</div>
                        </div>
                        <div className="text-[#aaa] text-[11px] flex-shrink-0">
                          {new Date(checkin.check_in_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

