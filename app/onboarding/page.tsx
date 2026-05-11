"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ONBOARDING_KEY = "aangcc_onboarding_complete";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Form state
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line_1: "",
    city: "",
    state_location: "",
    zip_code: "",
    bio: "",
  });

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/membership/members-only"); return; }
      setUserId(user.id);

      // Load existing member data
      const { data: member } = await supabase.from("members").select("*").eq("id", user.id).single();
      if (member) {
        setForm({
          full_name: member.full_name || "",
          phone: member.phone || "",
          address_line_1: member.address_line_1 || "",
          city: member.city || "",
          state_location: member.state_location || "",
          zip_code: member.zip_code || "",
          bio: member.bio || "",
        });
        if (member.avatar_url) setPhotoPreview(member.avatar_url);
      }

      // Check if already onboarded
      const done = localStorage.getItem(ONBOARDING_KEY);
      if (done === user.id) {
        router.push("/portal");
      }
    }
    init();
  }, []);

  const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "photo", label: "Photo" },
    { id: "info", label: "Info" },
    { id: "bio", label: "Bio" },
    { id: "done", label: "Done" },
  ];

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Photo must be under 5MB."); return; }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoConfirmed(false);
    setError("");
  };

  const handleNext = async () => {
    setError("");

    // Validate current step
    if (step === 1) {
      if (!photoPreview) { setError("Please upload a profile photo."); return; }
      if (photoFile && !photoConfirmed) { setError("Please confirm this is a headshot photo of you."); return; }
    }

    if (step === 2) {
      if (!form.full_name || form.full_name.trim().split(" ").length < 2) {
        setError("Please enter your first and last name."); return;
      }
      if (!form.phone) { setError("Please enter your phone number."); return; }
      if (!form.address_line_1) { setError("Please enter your street address."); return; }
      if (!form.city) { setError("Please enter your city."); return; }
      if (!form.state_location) { setError("Please enter your state."); return; }
      if (!form.zip_code) { setError("Please enter your zip code."); return; }
    }

    if (step === 3) {
      const wordCount = form.bio.trim().split(/\s+/).filter(Boolean).length;
      if (!form.bio || form.bio.trim().length < 10) {
        setError("Please write a bio (at least 10 characters)."); return;
      }
      if (wordCount > 150) {
        setError("Bio must be 150 words or less."); return;
      }
    }

    // Save on last content step (step 3 → 4)
    if (step === 3) {
      await saveProfile();
      return;
    }

    setStep(s => s + 1);
  };

  const saveProfile = async () => {
    if (!userId) return;
    setSaving(true);

    try {
      let avatarUrl: string | null = null;

      // Upload photo if new
      if (photoFile) {
        setUploadingPhoto(true);
        const ext = photoFile.name.split(".").pop();
        const fileName = `${userId}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, photoFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
        avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
        setUploadingPhoto(false);
      }

      const updateData: Record<string, unknown> = {
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        address_line_1: form.address_line_1.trim(),
        city: form.city.trim(),
        state_location: form.state_location.trim(),
        zip_code: form.zip_code.trim(),
        bio: form.bio.trim(),
        updated_at: new Date().toISOString(),
      };

      if (avatarUrl) updateData.avatar_url = avatarUrl;

      const { error: updateError } = await supabase.from("members").update(updateData).eq("id", userId);
      if (updateError) throw updateError;

      // Mark onboarding complete
      localStorage.setItem(ONBOARDING_KEY, userId);
      setStep(4);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
      setUploadingPhoto(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";
  const wordCount = form.bio.trim().split(/\s+/).filter(Boolean).length;
  const initials = form.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[80px] pb-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#14CFC4]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[520px]">

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/">
            <img src="/images/club-logo.png" alt="AANGCC" className="w-16 h-16 object-contain mx-auto mb-3" />
          </Link>
          <p className="text-white/40 text-[11px] tracking-[0.25em] uppercase">Member Onboarding</p>
        </motion.div>

        {/* Progress bar */}
        {step < 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.slice(1, 4).map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 flex-shrink-0 ${step > i + 1 ? "bg-[#14CFC4] text-white" : step === i + 1 ? "bg-[#FFD84D] text-[#111]" : "bg-white/10 text-white/30"}`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`text-[11px] font-medium hidden sm:block ${step === i + 1 ? "text-white" : "text-white/30"}`}>{s.label}</span>
                  {i < 2 && <div className={`flex-1 h-[1px] mx-2 ${step > i + 1 ? "bg-[#14CFC4]" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Card */}
        <AnimatePresence mode="wait">

          {/* STEP 0: Welcome */}
          {step === 0 && (
            <motion.div key="welcome" variants={slideIn} initial="hidden" animate="visible" exit="exit"
              className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-[#14CFC4]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🚴</span>
                </div>
                <h1 className="font-heading text-[#111] text-[32px] font-semibold mb-3 leading-tight">
                  Welcome to AANGCC!
                </h1>
                <p className="text-[#666] text-[15px] leading-relaxed mb-2">
                  You're officially part of Austin's most purpose-driven cycling community.
                </p>
                <p className="text-[#888] text-[13px] leading-relaxed mb-8">
                  Before you access the member portal, let's take 2 minutes to set up your profile. This helps your teammates connect with you and ensures you appear in the member directory.
                </p>
                <div className="flex flex-col gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100 text-left mb-8">
                  <p className="text-[#888] text-[11px] font-semibold uppercase tracking-wide mb-1">You'll need to provide:</p>
                  {["A headshot photo of yourself", "Your contact information", "A short bio about you"].map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#14CFC4]/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14CFC4] text-[11px] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-[#555] text-[13px]">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)}
                  className="w-full py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                  Let's Get Started →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Photo */}
          {step === 1 && (
            <motion.div key="photo" variants={slideIn} initial="hidden" animate="visible" exit="exit"
              className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Step 1 of 3</span>
                  <h2 className="font-heading text-[#111] text-[26px] font-semibold mt-1">Profile Photo</h2>
                  <p className="text-[#888] text-[13px] mt-1 leading-relaxed">
                    Upload a clear headshot of yourself. The member directory requires real photos — no logos, pets, or avatars.
                  </p>
                </div>

                {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

                {/* Photo upload area */}
                <div className="flex flex-col items-center gap-5 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#FFD84D] ring-offset-4 ring-offset-white shadow-xl">
                      {photoPreview
                        ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-gradient-to-br from-[#14CFC4] to-[#0FAFA5] flex items-center justify-center">
                            <span className="font-heading text-white text-[36px] font-bold">{initials}</span>
                          </div>
                      }
                    </div>
                    {uploadingPhoto && (
                      <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-xl border-2 border-[#14CFC4] text-[#14CFC4] text-[12px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-200">
                    {photoPreview ? "Change Photo" : "Upload Headshot"}
                  </button>
                  <p className="text-[#bbb] text-[11px]">JPEG or PNG · Max 5MB · Must be a photo of you</p>
                </div>

                {/* Honor system */}
                {photoPreview && (
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-[#14CFC4]/5 border border-[#14CFC4]/20 mb-6">
                    <input type="checkbox" checked={photoConfirmed || (!photoFile && !!photoPreview)}
                      onChange={e => setPhotoConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 flex-shrink-0" />
                    <span className="text-[#555] text-[12px] leading-relaxed">
                      I confirm this is a clear, current headshot photo of <strong>me</strong> — not a pet, logo, cartoon, or other image.
                    </span>
                  </label>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-[#888] text-[12px] font-semibold hover:border-gray-400 transition-colors">
                    Back
                  </button>
                  <button onClick={handleNext}
                    className="flex-1 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                    Continue →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Contact Info */}
          {step === 2 && (
            <motion.div key="info" variants={slideIn} initial="hidden" animate="visible" exit="exit"
              className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Step 2 of 3</span>
                  <h2 className="font-heading text-[#111] text-[26px] font-semibold mt-1">Your Information</h2>
                  <p className="text-[#888] text-[13px] mt-1">All fields are required. This information is only visible to fellow members.</p>
                </div>

                {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Full Name * <span className="normal-case font-normal">(first and last required)</span></label>
                    <input type="text" value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
                      placeholder="e.g. Jane Smith" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="(512) 000-0000" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Street Address *</label>
                    <input type="text" value={form.address_line_1} onChange={e => setForm(p => ({ ...p, address_line_1: e.target.value }))}
                      placeholder="Street address" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1 flex flex-col gap-1.5">
                      <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">City *</label>
                      <input type="text" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                        placeholder="Austin" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">State *</label>
                      <input type="text" value={form.state_location} onChange={e => setForm(p => ({ ...p, state_location: e.target.value }))}
                        placeholder="TX" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Zip *</label>
                      <input type="text" value={form.zip_code} onChange={e => setForm(p => ({ ...p, zip_code: e.target.value }))}
                        placeholder="78701" className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-[#888] text-[12px] font-semibold hover:border-gray-400 transition-colors">
                    Back
                  </button>
                  <button onClick={handleNext}
                    className="flex-1 py-3 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
                    Continue →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Bio */}
          {step === 3 && (
            <motion.div key="bio" variants={slideIn} initial="hidden" animate="visible" exit="exit"
              className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-[4px] w-full bg-[#14CFC4]" />
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[#14CFC4] text-[11px] font-semibold tracking-[0.2em] uppercase">Step 3 of 3</span>
                  <h2 className="font-heading text-[#111] text-[26px] font-semibold mt-1">Your Bio</h2>
                  <p className="text-[#888] text-[13px] mt-1 leading-relaxed">
                    Tell your teammates about yourself — how long you've been cycling, why you joined AANGCC, your favorite routes.
                  </p>
                </div>

                {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

                <div className="flex flex-col gap-2 mb-6">
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                    placeholder="Share a bit about yourself — your cycling background, what motivates you to ride for a cause, and what you love about the AANGCC community..."
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border text-[#111] text-[14px] focus:outline-none transition-colors duration-200 resize-none ${wordCount > 150 ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#14CFC4]"}`}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-[#bbb] text-[11px]">Maximum 150 words</p>
                    <p className={`text-[12px] font-semibold ${wordCount > 150 ? "text-red-500" : wordCount > 120 ? "text-orange-400" : "text-[#bbb]"}`}>
                      {wordCount} / 150
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-[#888] text-[12px] font-semibold hover:border-gray-400 transition-colors">
                    Back
                  </button>
                  <button onClick={handleNext} disabled={saving || uploadingPhoto || wordCount > 150}
                    className={`flex-1 py-3 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 flex items-center justify-center gap-2 ${!saving && !uploadingPhoto && wordCount <= 150 ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                    {saving || uploadingPhoto ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                    ) : "Complete Profile →"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Done */}
          {step === 4 && (
            <motion.div key="done" variants={fadeUp} initial="hidden" animate="visible"
              className="bg-white rounded-2xl overflow-hidden shadow-2xl text-center">
              <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />
              <div className="p-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#14CFC4]/10 flex items-center justify-center mx-auto mb-6">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <path d="M8 22L18 32L36 14" stroke="#14CFC4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <h2 className="font-heading text-[#111] text-[32px] font-semibold mb-3">You're all set!</h2>
                <p className="text-[#666] text-[15px] leading-relaxed mb-2">
                  Your profile is complete. Welcome to the AANGCC family.
                </p>
                <p className="text-[#888] text-[13px] leading-relaxed mb-10">
                  You now have full access to the member portal — rides, leaderboard, directory, club shop, and more.
                </p>
                <button onClick={() => router.push("/portal")}
                  className="w-full py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300 mb-4">
                  Enter the Portal →
                </button>
                <button onClick={() => router.push("/portal/directory")}
                  className="w-full py-3.5 rounded-xl border border-[#14CFC4] text-[#14CFC4] text-[13px] font-bold tracking-wide uppercase hover:bg-[#14CFC4] hover:text-white transition-colors duration-300">
                  View Member Directory
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
