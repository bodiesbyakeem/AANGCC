"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = "AANGCC2026";

interface Member {
  id: string;
  full_name: string | null;
  email: string | null;
  membership_type: string | null;
  membership_status: string | null;
  is_active: boolean | null;
  waiver_signed: boolean | null;
  joined_at: string | null;
  renewal_date: string | null;
  invite_status: string | null;
  invited_by: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  trialing: "bg-[#14CFC4]/15 text-[#0FAFA5]",
  pending: "bg-yellow-100 text-yellow-700",
  past_due: "bg-orange-100 text-orange-700",
  cancelled: "bg-red-100 text-red-600",
  inactive: "bg-gray-100 text-gray-500",
};

const TIER_COLORS: Record<string, string> = {
  Individual: "bg-blue-100 text-blue-700",
  Family: "bg-purple-100 text-purple-700",
  "Small Business": "bg-[#FFD84D]/20 text-[#8a7000]",
  Corporate: "bg-gray-800 text-white",
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ConfirmModal({ title, message, onConfirm, onCancel, danger = true }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[420px]">
        <div className={`h-[4px] w-full ${danger ? "bg-red-500" : "bg-[#14CFC4]"}`} />
        <div className="p-7">
          <h3 className="font-heading text-[#111] text-[20px] font-semibold mb-2">{title}</h3>
          <p className="text-[#666] text-[14px] leading-relaxed mb-6">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-[#888] text-[13px] font-semibold hover:border-gray-400 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm}
              className={`flex-1 py-3 rounded-xl text-white text-[13px] font-semibold transition-colors ${danger ? "bg-red-500 hover:bg-red-600" : "bg-[#14CFC4] hover:bg-[#FFD84D] hover:text-[#111]"}`}>
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EditMemberModal({ member, onClose, onSaved }: {
  member: Member; onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState({
    full_name: member.full_name || "",
    email: member.email || "",
    membership_type: member.membership_type || "Individual",
    membership_status: member.membership_status || "active",
    is_active: member.is_active ?? true,
    waiver_signed: member.waiver_signed ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const { error: err } = await supabaseAdmin.from("members").update({
      full_name: form.full_name,
      email: form.email,
      membership_type: form.membership_type,
      membership_status: form.membership_status,
      is_active: form.is_active,
      waiver_signed: form.waiver_signed,
      updated_at: new Date().toISOString(),
    }).eq("id", member.id);
    setSaving(false);
    if (err) { setError("Failed to save. Please try again."); return; }
    onSaved();
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto">
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-[#111] text-[22px] font-semibold">Edit Member</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name</label>
              <input type="text" value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Membership Type</label>
              <select value={form.membership_type} onChange={e => setForm(p => ({ ...p, membership_type: e.target.value }))} className={inputClass}>
                <option>Individual</option>
                <option>Family</option>
                <option>Small Business</option>
                <option>Corporate</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Membership Status</label>
              <select value={form.membership_status} onChange={e => setForm(p => ({ ...p, membership_status: e.target.value }))} className={inputClass}>
                <option value="active">Active</option>
                <option value="trialing">Trialing</option>
                <option value="pending">Pending</option>
                <option value="past_due">Past Due</option>
                <option value="cancelled">Cancelled</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="w-4 h-4" />
                <div>
                  <p className="text-[#111] text-[13px] font-semibold">Active</p>
                  <p className="text-[#888] text-[11px]">Can access portal</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <input type="checkbox" checked={form.waiver_signed} onChange={e => setForm(p => ({ ...p, waiver_signed: e.target.checked }))} className="w-4 h-4" />
                <div>
                  <p className="text-[#111] text-[13px] font-semibold">Waiver Signed</p>
                  <p className="text-[#888] text-[11px]">Version 3.0</p>
                </div>
              </label>
            </div>
            <button onClick={handleSave} disabled={saving}
              className={`w-full py-3.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${!saving ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {saving ? "Saving..." : "Save Changes →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminMembersPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "pending" | "inactive">("all");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: string; member: Member } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("aangcc_admin_auth");
    if (saved === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchMembers();
  }, [authed]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabaseAdmin.from("members").select("*").order("joined_at", { ascending: false });
    setMembers(data || []);
    setLoading(false);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("aangcc_admin_auth", "true");
    } else {
      setPwError("Incorrect password.");
    }
  };

  const handleToggleActive = async (member: Member) => {
    setActionLoading(member.id);
    const newActive = !member.is_active;
    const newStatus = newActive ? "active" : "inactive";
    const { error } = await supabaseAdmin.from("members").update({
      is_active: newActive,
      membership_status: newStatus,
      updated_at: new Date().toISOString(),
    }).eq("id", member.id);
    if (!error) {
      setMembers(prev => prev.map(m => m.id === member.id ? { ...m, is_active: newActive, membership_status: newStatus } : m));
      showToast(`${member.full_name} has been ${newActive ? "activated" : "deactivated"}.`);
    } else {
      showToast("Failed to update member status.", "error");
    }
    setActionLoading(null);
    setConfirmAction(null);
  };

  const handleDelete = async (member: Member) => {
    setActionLoading(member.id);
    const { error } = await supabaseAdmin.from("members").delete().eq("id", member.id);
    if (!error) {
      setMembers(prev => prev.filter(m => m.id !== member.id));
      showToast(`${member.full_name} has been permanently deleted.`);
    } else {
      showToast("Failed to delete member.", "error");
    }
    setActionLoading(null);
    setConfirmAction(null);
  };

  const handleResendInvite = async (member: Member) => {
    if (!member.email) return;
    setActionLoading(member.id);
    try {
      const res = await fetch("/api/members/invite/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member_id: member.id, email: member.email, full_name: member.full_name }),
      });
      if (res.ok) {
        showToast(`Invite resent to ${member.email}`);
      } else {
        showToast("Failed to resend invite.", "error");
      }
    } catch {
      showToast("Failed to resend invite.", "error");
    }
    setActionLoading(null);
  };

  const filtered = members.filter(m => {
    const matchSearch = !search ||
      m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "active" && m.is_active) ||
      (filter === "pending" && m.invite_status === "pending") ||
      (filter === "inactive" && !m.is_active);
    return matchSearch && matchFilter;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.is_active).length,
    pending: members.filter(m => m.invite_status === "pending" && !m.is_active).length,
    inactive: members.filter(m => !m.is_active && m.invite_status !== "pending").length,
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[400px]">
          <div className="h-[4px] w-full bg-[#14CFC4]" />
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#14CFC4]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h1 className="font-heading text-[#111] text-[24px] font-semibold">Admin Access</h1>
              <p className="text-[#888] text-[13px] mt-1">Member Management Panel</p>
            </div>
            {pwError && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{pwError}</div>}
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 mb-4" />
            <button onClick={handleLogin}
              className="w-full py-3.5 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Access Panel →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── MAIN PANEL ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {editingMember && (
          <EditMemberModal member={editingMember} onClose={() => setEditingMember(null)} onSaved={fetchMembers} />
        )}
        {confirmAction && (
          <ConfirmModal
            title={confirmAction.type === "delete" ? "Delete Member?" : confirmAction.type === "deactivate" ? "Deactivate Member?" : "Activate Member?"}
            message={
              confirmAction.type === "delete"
                ? `This will permanently delete ${confirmAction.member.full_name}'s account and all associated data. This cannot be undone.`
                : confirmAction.type === "deactivate"
                ? `${confirmAction.member.full_name} will lose access to the member portal immediately.`
                : `${confirmAction.member.full_name} will regain full access to the member portal.`
            }
            danger={confirmAction.type === "delete" || confirmAction.type === "deactivate"}
            onConfirm={() => {
              if (confirmAction.type === "delete") handleDelete(confirmAction.member);
              else handleToggleActive(confirmAction.member);
            }}
            onCancel={() => setConfirmAction(null)}
          />
        )}
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl text-[13px] font-semibold ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#FFD84D] text-[11px]">🛡️</span>
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-medium">Admin Panel</span>
            </div>
            <h1 className="font-heading text-white text-[32px] lg:text-[42px] font-semibold leading-tight">
              Member <span className="text-gradient-gold">Management</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchMembers} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              ↻ Refresh
            </button>
            <button onClick={() => { sessionStorage.removeItem("aangcc_admin_auth"); setAuthed(false); }}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-red-400/50 hover:text-red-400 transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Members", value: stats.total, icon: "👥", color: "bg-[#14CFC4]" },
            { label: "Active", value: stats.active, icon: "✅", color: "bg-emerald-400" },
            { label: "Pending Invites", value: stats.pending, icon: "⏳", color: "bg-[#FFD84D]" },
            { label: "Inactive / Banned", value: stats.inactive, icon: "🚫", color: "bg-red-400" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className={`h-[4px] w-full ${stat.color}`} />
              <div className="p-5 flex items-center gap-4">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="font-heading text-[#111] text-[28px] font-bold leading-none">{stat.value}</p>
                  <p className="text-[#888] text-[11px] uppercase tracking-wide mt-0.5">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200" />
          <div className="flex gap-2">
            {(["all", "active", "pending", "inactive"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold border transition-all duration-200 capitalize ${filter === f ? "bg-[#FFD84D] text-[#111] border-[#FFD84D]" : "bg-white/10 text-white/70 border-white/20 hover:border-white/40 hover:text-white"}`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Members Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading members...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">👥</span>
            <p className="text-white/60 text-[15px]">No members found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((member, i) => (
              <motion.div key={member.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg ${!member.is_active ? "opacity-75" : ""}`}>
                <div className={`h-[3px] w-full ${member.is_active ? "bg-[#14CFC4]" : "bg-gray-200"}`} />
                <div className="p-5">
                  <div className="flex items-start gap-4 flex-wrap">

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {member.avatar_url ? <img src={member.avatar_url} alt="" className="w-full h-full object-cover" /> :
                        <div className={`w-full h-full flex items-center justify-center ${member.is_active ? "bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5]" : "bg-gray-200"}`}>
                          <span className={`text-[16px] font-bold ${member.is_active ? "text-white" : "text-gray-400"}`}>
                            {(member.full_name || "?").charAt(0).toUpperCase()}
                          </span>
                        </div>}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-heading text-[#111] text-[16px] font-semibold">{member.full_name || "Unknown"}</p>
                        {!member.is_active && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">INACTIVE</span>}
                        {member.invite_status === "pending" && !member.is_active && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">INVITE PENDING</span>}
                      </div>
                      <p className="text-[#888] text-[12px] mb-2">{member.email || "—"}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {member.membership_type && (
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${TIER_COLORS[member.membership_type] || "bg-gray-100 text-gray-600"}`}>
                            {member.membership_type}
                          </span>
                        )}
                        {member.membership_status && (
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[member.membership_status] || "bg-gray-100 text-gray-600"}`}>
                            {member.membership_status}
                          </span>
                        )}
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${member.waiver_signed ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
                          {member.waiver_signed ? "✓ Waiver" : "✗ No Waiver"}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-right flex-shrink-0 hidden sm:block">
                      <p className="text-[#888] text-[11px]">Joined {formatDate(member.joined_at)}</p>
                      {member.renewal_date && <p className="text-[#bbb] text-[10px] mt-0.5">Renews {formatDate(member.renewal_date)}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      {/* Edit */}
                      <button onClick={() => setEditingMember(member)}
                        className="px-3 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[11px] font-bold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                        Edit
                      </button>

                      {/* Activate / Deactivate */}
                      {member.is_active ? (
                        <button
                          onClick={() => setConfirmAction({ type: "deactivate", member })}
                          disabled={actionLoading === member.id}
                          className="px-3 py-2 rounded-xl border border-orange-300 text-orange-500 text-[11px] font-bold hover:bg-orange-50 transition-colors duration-200 disabled:opacity-50">
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmAction({ type: "activate", member })}
                          disabled={actionLoading === member.id}
                          className="px-3 py-2 rounded-xl border border-emerald-300 text-emerald-600 text-[11px] font-bold hover:bg-emerald-50 transition-colors duration-200 disabled:opacity-50">
                          Activate
                        </button>
                      )}

                      {/* Resend Invite */}
                      {member.invite_status === "pending" && !member.is_active && (
                        <button
                          onClick={() => handleResendInvite(member)}
                          disabled={actionLoading === member.id}
                          className="px-3 py-2 rounded-xl border border-[#FFD84D] text-[#8a7000] text-[11px] font-bold hover:bg-[#FFD84D]/20 transition-colors duration-200 disabled:opacity-50">
                          {actionLoading === member.id ? "..." : "Resend Invite"}
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => setConfirmAction({ type: "delete", member })}
                        disabled={actionLoading === member.id}
                        className="px-3 py-2 rounded-xl border border-red-200 text-red-400 text-[11px] font-bold hover:bg-red-50 hover:border-red-400 transition-colors duration-200 disabled:opacity-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 p-4 rounded-2xl bg-white/8 border border-white/10 text-center">
          <p className="text-white/40 text-[11px]">
            Admin panel — {filtered.length} of {members.length} members shown · AANGCC Member Management System
          </p>
        </div>
      </div>
    </div>
  );
}
