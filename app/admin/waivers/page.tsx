"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const ADMIN_PASSWORD = "AANGCC2026";

interface Waiver {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  signed_at: string;
  ip_address: string | null;
  version: string;
  signature: string | null;
  user_id: string | null;
  agreed_to_terms: boolean;
}

function PrintableWaiver({ waiver, onClose }: { waiver: Waiver; onClose: () => void }) {
  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto p-6">
      <div className="bg-white rounded-2xl max-w-[800px] w-full my-8 overflow-hidden shadow-2xl">
        {/* Print controls - hidden when printing */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 print:hidden">
          <h3 className="font-heading text-[#111] text-[18px] font-semibold">Waiver Preview</h3>
          <div className="flex gap-3">
            <button onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-200">
              Print / Save PDF
            </button>
            <button onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-[#888] text-[13px] font-semibold hover:border-gray-400 transition-colors duration-200">
              Close
            </button>
          </div>
        </div>

        {/* Printable content */}
        <div className="p-10" id="printable-waiver">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111111", marginBottom: "4px" }}>
              All Ass No Gas Cycling Club
            </h1>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "4px" }}>
              Waiver of Liability, Assumption of Risk, and Indemnification Agreement
            </p>
            <p style={{ fontSize: "12px", color: "#aaa" }}>Version {waiver.version}</p>
          </div>

          {/* Signer Info */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              Signer Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Legal Name", value: waiver.full_name },
                { label: "Email Address", value: waiver.email },
                { label: "Date Signed", value: new Date(waiver.signed_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                { label: "Time Signed", value: new Date(waiver.signed_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" }) },
                { label: "IP Address", value: waiver.ip_address || "Not recorded" },
                { label: "Waiver Version", value: waiver.version },
                { label: "Member Account", value: waiver.user_id ? "Yes — linked to member record" : "Guest — no member account" },
                { label: "Terms Agreed", value: waiver.agreed_to_terms ? "Yes — explicitly agreed" : "No" },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: "#111", fontWeight: "500" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waiver Text Summary */}
          <div className="mb-8">
            <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              Waiver Provisions Agreed To
            </h2>
            <div style={{ fontSize: "12px", color: "#555", lineHeight: "1.8" }}>
              <p style={{ marginBottom: "8px" }}><strong>01 — Acknowledgment of Risk:</strong> Signer acknowledged all inherent risks of cycling including collision, falls, injury, death, and property damage.</p>
              <p style={{ marginBottom: "8px" }}><strong>02 — Assumption of Risk:</strong> Signer voluntarily assumed all known and unknown risks associated with AANGCC activities.</p>
              <p style={{ marginBottom: "8px" }}><strong>03 — Release of Liability:</strong> Signer released AANGCC, its officers, directors, employees, volunteers, agents, and sponsors from all claims arising from participation.</p>
              <p style={{ marginBottom: "8px" }}><strong>04 — Indemnification:</strong> Signer agreed to indemnify and hold harmless all Released Parties from claims arising from their participation or conduct.</p>
              <p style={{ marginBottom: "8px" }}><strong>05 — Equipment and Safety:</strong> Signer warranted bicycle is in safe condition and agreed to wear a helmet and comply with traffic laws.</p>
              <p style={{ marginBottom: "8px" }}><strong>06 — Medical Authorization:</strong> Signer authorized emergency medical treatment if incapacitated during AANGCC activities.</p>
              <p style={{ marginBottom: "8px" }}><strong>07 — Arbitration & Class Action Waiver:</strong> Signer agreed to binding individual arbitration in Travis County, Texas, and waived right to class action participation.</p>
              <p style={{ marginBottom: "8px" }}><strong>08 — Governing Law:</strong> Waiver governed by Texas law with venue in Travis County, Texas.</p>
              <p style={{ marginBottom: "8px" }}><strong>09 — Photography and Media:</strong> Signer granted AANGCC right to photograph and record during club activities for promotional use.</p>
            </div>
          </div>

          {/* Signature */}
          <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl">
            <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              Electronic Signature
            </h2>
            {waiver.signature ? (
              <div>
                <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "12px", backgroundColor: "#fafafa", marginBottom: "12px" }}>
                  <img src={waiver.signature} alt="Electronic Signature" style={{ maxWidth: "400px", maxHeight: "120px", objectFit: "contain" }} />
                </div>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  Electronic signature captured on {new Date(waiver.signed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} at {new Date(waiver.signed_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} from IP {waiver.ip_address || "unknown"}. This signature is legally binding under the E-SIGN Act (15 U.S.C. § 7001 et seq.).
                </p>
              </div>
            ) : (
              <p style={{ fontSize: "13px", color: "#888" }}>Signature image not available</p>
            )}
          </div>

          {/* Legal Footer */}
          <div style={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #14CFC4" }}>
            <p style={{ fontSize: "11px", color: "#888", lineHeight: "1.7" }}>
              <strong>Legal Notice:</strong> This document was executed electronically pursuant to the Electronic Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. § 7001 et seq., and the Texas Uniform Electronic Transactions Act (TUETA), Tex. Bus. & Com. Code § 322.001 et seq. The electronic signature, IP address, timestamp, and signer information recorded above constitute a legally binding agreement. This record is permanently stored in the AANGCC compliance database. Document ID: {waiver.id}
            </p>
          </div>

          {/* Print footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <p style={{ fontSize: "11px", color: "#aaa" }}>All Ass No Gas Cycling Club · Austin, Texas · allassnogascyclingclub.com</p>
            <p style={{ fontSize: "11px", color: "#aaa" }}>Document ID: {waiver.id.slice(-12).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminWaiversPage() {
  const supabase = createClient();
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [waivers, setWaivers] = useState<Waiver[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
      fetchWaivers();
    } else {
      setPasswordError(true);
    }
  };

  const fetchWaivers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waivers")
      .select("*")
      .order("signed_at", { ascending: false });

    if (!error && data) setWaivers(data);
    setLoading(false);
  };

  const filtered = waivers.filter((w) =>
    w.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    w.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <Link href="/">
              <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-3" />
            </Link>
            <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase">Admin · Waiver Records</p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-[4px] w-full bg-[#FFD84D]" />
            <div className="p-7">
              <h1 className="font-heading text-[#111111] text-[24px] font-semibold mb-1">Admin Access</h1>
              <p className="text-[#888] text-[13px] mb-6">Enter the admin password to view waiver records.</p>
              {passwordError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">Incorrect password.</div>
              )}
              <div className="flex flex-col gap-4">
                <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                  placeholder="Admin password" autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200" />
                <button onClick={handleLogin} className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                  View Waiver Records
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
      {selectedWaiver && (
        <PrintableWaiver waiver={selectedWaiver} onClose={() => setSelectedWaiver(null)} />
      )}

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex items-center justify-between py-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Admin Dashboard</span>
            </div>
            <h1 className="font-heading text-white text-[32px] font-semibold">Waiver Records</h1>
            <p className="text-white/60 text-[13px] mt-1">{waivers.length} total signed waivers</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/checkin" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              Check-In Dashboard
            </Link>
            <Link href="/" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full max-w-[400px] px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white/50 transition-colors duration-200" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Waivers", value: waivers.length, color: "teal" },
            { label: "Members", value: waivers.filter((w) => w.user_id).length, color: "gold" },
            { label: "Guests", value: waivers.filter((w) => !w.user_id).length, color: "teal" },
            { label: "This Month", value: waivers.filter((w) => new Date(w.signed_at) > new Date(new Date().setDate(1))).length, color: "gold" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className={`font-heading text-[32px] font-bold leading-none mb-1 ${stat.color === "gold" ? "text-[#FFD84D]" : "text-[#14CFC4]"}`}
                style={{ WebkitTextStroke: stat.color === "gold" ? "1px #e6c235" : "1px #0FAFA5" }}>
                {stat.value}
              </div>
              <div className="text-[#888] text-[10px] uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Waiver List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[4px] w-full bg-[#FFD84D]" />
          <div className="p-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#14CFC4] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#888] text-[13px]">Loading waiver records...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-4xl mb-4 block">📋</span>
                <p className="text-[#888] text-[14px]">{search ? "No waivers match your search" : "No waivers signed yet"}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((waiver, i) => (
                  <motion.div key={waiver.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#14CFC4]/30 transition-colors duration-200">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-[14px] flex-shrink-0 ${waiver.user_id ? "bg-[#14CFC4]/20 text-[#0FAFA5]" : "bg-[#FFD84D]/20 text-[#b8960a]"}`}>
                      {waiver.full_name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[#111] font-semibold text-[14px]">{waiver.full_name}</span>
                        <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${waiver.user_id ? "bg-[#14CFC4]/10 text-[#0FAFA5]" : "bg-[#FFD84D]/20 text-[#b8960a]"}`}>
                          {waiver.user_id ? "Member" : "Guest"}
                        </span>
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
                          v{waiver.version}
                        </span>
                      </div>
                      <div className="text-[#888] text-[11px] mt-0.5">{waiver.email}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[#555] text-[12px] font-medium">
                        {new Date(waiver.signed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="text-[#aaa] text-[11px]">
                        {new Date(waiver.signed_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    <button onClick={() => setSelectedWaiver(waiver)}
                      className="px-4 py-2 rounded-xl bg-[#14CFC4] text-white text-[11px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-200 flex-shrink-0">
                      View & Print
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
