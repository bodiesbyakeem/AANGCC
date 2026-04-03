"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
}

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

export default function PortalPage() {
  const router = useRouter();
  const supabase = createClient();

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [billingLoading, setBillingLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function loadMember() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/membership/members-only"); return; }

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        // Member record doesn't exist yet — create a stub
        const stub: Member = {
          id: user.id,
          full_name: user.user_metadata?.full_name || null,
          address_line_1: null,
          address_line_2: null,
          city: null,
          state: null,
          zip_code: null,
          phone: null,
          email: user.email || null,
          membership_type: "Individual",
          membership_status: "active",
          renewal_date: null,
          joined_at: user.created_at,
          is_active: true,
          stripe_customer_id: null,
        };
        setMember(stub);
        setForm({
          full_name: stub.full_name || "",
          address_line_1: stub.address_line_1 || "",
          address_line_2: stub.address_line_2 || "",
          city: stub.city || "",
          state: stub.state || "",
          zip_code: stub.zip_code || "",
          phone: stub.phone || "",
          email: stub.email || "",
        });
      } else {
        setMember(data);
        setForm({
          full_name: data.full_name || "",
          address_line_1: data.address_line_1 || "",
          address_line_2: data.address_line_2 || "",
          city: data.city || "",
          state: data.state || "",
          zip_code: data.zip_code || "",
          phone: data.phone || "",
          email: data.email || user.email || "",
        });
      }
      setLoading(false);
    }
    loadMember();
  }, []);

  const handleSave = async () => {
    if (!member) return;
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    const { error } = await supabase
      .from("members")
      .upsert({ id: member.id, ...form, updated_at: new Date().toISOString() });

    setSaving(false);
    if (error) {
      setSaveError("Failed to save. Please try again.");
    } else {
      setSaveSuccess(true);
      setEditing(false);
      setMember((prev) => prev ? { ...prev, ...form } : prev);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleBilling = async () => {
    setBillingLoading(true);
    try {
      const response = await fetch("/api/billing/portal", { method: "POST" });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else setBillingLoading(false);
    } catch {
      setBillingLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/membership/members-only");
    router.refresh();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-400";

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
            <Link href="/" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">
              ← Back to Site
            </Link>
            <button onClick={handleSignOut} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-red-400/50 hover:text-red-400 transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Profile Card ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[4px] w-full bg-[#14CFC4]" />
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-[#111111] text-[22px] font-semibold">Profile Information</h2>
                  <p className="text-[#888] text-[12px] mt-0.5">Your personal details on file with AANGCC.</p>
                </div>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[12px] font-semibold hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
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

              {saveSuccess && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13px] flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Profile updated successfully.
                </div>
              )}

              {saveError && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{saveError}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name</label>
                  <input type="text" value={form.full_name} onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Your full name" />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} disabled={!editing} className={inputClass} placeholder="your@email.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} disabled={!editing} className={inputClass} placeholder="(512) 000-0000" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Address Line 1</label>
                  <input type="text" value={form.address_line_1} onChange={(e) => setForm(p => ({ ...p, address_line_1: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Street address" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Address Line 2</label>
                  <input type="text" value={form.address_line_2} onChange={(e) => setForm(p => ({ ...p, address_line_2: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Apt, suite, etc." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">City</label>
                  <input type="text" value={form.city} onChange={(e) => setForm(p => ({ ...p, city: e.target.value }))} disabled={!editing} className={inputClass} placeholder="Austin" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">State</label>
                  <input type="text" value={form.state} onChange={(e) => setForm(p => ({ ...p, state: e.target.value }))} disabled={!editing} className={inputClass} placeholder="TX" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Zip Code</label>
                  <input type="text" value={form.zip_code} onChange={(e) => setForm(p => ({ ...p, zip_code: e.target.value }))} disabled={!editing} className={inputClass} placeholder="78701" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-6">

            {/* Membership Card */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#FFD84D]" />
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h2 className="font-heading text-[#111111] text-[20px] font-semibold">Membership</h2>
                  <p className="text-[#888] text-[12px] mt-0.5">Your current plan and status.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-[#888] text-[12px]">Status</span>
                    <StatusBadge status={member?.membership_status || null} isActive={member?.is_active || null} />
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-[#888] text-[12px]">Plan</span>
                    <span className="text-[#111] text-[13px] font-semibold">{member?.membership_type || "Individual"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-[#888] text-[12px]">Renewal Date</span>
                    <span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.renewal_date || null)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[#888] text-[12px]">Member Since</span>
                    <span className="text-[#111] text-[13px] font-semibold">{formatDate(member?.joined_at || null)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Billing Card */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h2 className="font-heading text-[#111111] text-[20px] font-semibold">Billing</h2>
                  <p className="text-[#888] text-[12px] mt-0.5">Manage payment methods and invoices.</p>
                </div>
                <p className="text-[#555] text-[13px] leading-relaxed">
                  Update your payment method, download invoices, or cancel your subscription through the secure Stripe billing portal.
                </p>
                <button
                  onClick={handleBilling}
                  disabled={billingLoading}
                  className="w-full py-3.5 rounded-xl bg-[#111111] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#14CFC4] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {billingLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      Manage Billing
                    </>
                  )}
                </button>
                <p className="text-[#aaa] text-[11px] text-center">Secured by Stripe · No card data stored by AANGCC</p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="bg-white/15 border border-white/20 rounded-2xl p-5">
              <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-medium mb-4">Quick Links</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Ride Calendar", href: "/rides" },
                  { label: "Team Photos", href: "/rides/photos" },
                  { label: "MS 150 Team", href: "/rides/ms150" },
                  { label: "Donate", href: "/more/donate" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-2 text-white/70 text-[13px] hover:text-[#FFD84D] transition-colors duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#FFD84D]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
