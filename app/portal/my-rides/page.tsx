"use client";

import { useState, useEffect, useRef } from "react";
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
  photos?: RidePhoto[];
}

interface RidePhoto {
  id: string;
  image_url: string;
  caption: string | null;
}

interface RideForm {
  title: string;
  ride_date: string;
  distance_miles: string;
  duration_minutes: string;
  avg_speed: string;
  elevation_feet: string;
  calories: string;
  avg_heart_rate: string;
  notes: string;
}

const emptyForm: RideForm = {
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

function toForm(ride: Ride): RideForm {
  return {
    title: ride.title || "",
    ride_date: ride.ride_date,
    distance_miles: ride.distance_miles.toString(),
    duration_minutes: ride.duration_minutes.toString(),
    avg_speed: ride.avg_speed?.toString() || "",
    elevation_feet: ride.elevation_feet?.toString() || "",
    calories: ride.calories?.toString() || "",
    avg_heart_rate: ride.avg_heart_rate?.toString() || "",
    notes: ride.notes || "",
  };
}

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

function validateForm(form: RideForm): string | null {
  if (!form.ride_date) return "Ride date is required.";
  if (!form.distance_miles || isNaN(parseFloat(form.distance_miles)) || parseFloat(form.distance_miles) <= 0) return "Distance must be a positive number.";
  if (!form.duration_minutes || isNaN(parseInt(form.duration_minutes)) || parseInt(form.duration_minutes) <= 0) return "Duration must be a positive number.";
  if (form.avg_speed && (isNaN(parseFloat(form.avg_speed)) || parseFloat(form.avg_speed) <= 0)) return "Average speed must be a positive number.";
  if (form.elevation_feet && (isNaN(parseInt(form.elevation_feet)) || parseInt(form.elevation_feet) < 0)) return "Elevation must be 0 or greater.";
  if (form.calories && (isNaN(parseInt(form.calories)) || parseInt(form.calories) <= 0)) return "Calories must be a positive number.";
  if (form.avg_heart_rate && (isNaN(parseInt(form.avg_heart_rate)) || parseInt(form.avg_heart_rate) <= 0)) return "Heart rate must be a positive number.";
  return null;
}

// ── RIDE FORM MODAL ──────────────────────────────────────────────────────────

function RideFormModal({ ride, userId, onClose, onSaved }: {
  ride?: Ride;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = !!ride;

  const [form, setForm] = useState<RideForm>(ride ? toForm(ride) : emptyForm);
  const [photos, setPhotos] = useState<RidePhoto[]>(ride?.photos || []);
  const [newPhotos, setNewPhotos] = useState<{ file: File; preview: string; caption: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200";

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter(f => f.size <= 10 * 1024 * 1024);
    if (valid.length < files.length) setError("Some photos exceed 10MB and were skipped.");
    const previews = valid.map(file => ({ file, preview: URL.createObjectURL(file), caption: "" }));
    setNewPhotos(prev => [...prev, ...previews]);
  };

  const removeNewPhoto = (i: number) => setNewPhotos(prev => prev.filter((_, idx) => idx !== i));

  const deleteExistingPhoto = async (photoId: string) => {
    await supabase.from("ride_photos").delete().eq("id", photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleSave = async () => {
    const validationError = validateForm(form);
    if (validationError) { setError(validationError); return; }

    setSaving(true);
    setError("");

    try {
      let rideId = ride?.id;

      if (isEditing) {
        const { error: updateError } = await supabase.from("rides").update({
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
        }).eq("id", ride!.id);
        if (updateError) throw updateError;
      } else {
        const { data: newRide, error: insertError } = await supabase.from("rides").insert({
          user_id: userId,
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
        }).select().single();
        if (insertError) throw insertError;
        rideId = newRide.id;
      }

      // Upload new photos
      if (newPhotos.length > 0 && rideId) {
        setUploadingPhoto(true);
        for (const photo of newPhotos) {
          const ext = photo.file.name.split(".").pop();
          const fileName = `${userId}/${rideId}/${Date.now()}.${ext}`;
          const { error: uploadError } = await supabase.storage.from("ride-photos").upload(fileName, photo.file);
          if (!uploadError) {
            const { data: urlData } = supabase.storage.from("ride-photos").getPublicUrl(fileName);
            await supabase.from("ride_photos").insert({
              ride_id: rideId,
              user_id: userId,
              image_url: urlData.publicUrl,
              caption: photo.caption || null,
            });
          }
        }
        setUploadingPhoto(false);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save ride. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto">
        <div className="h-[4px] w-full bg-[#14CFC4]" />
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-[#111111] text-[22px] font-semibold">{isEditing ? "Edit Ride" : "Log a Ride"}</h2>
              <p className="text-[#888] text-[12px] mt-0.5">{isEditing ? "Update your ride details" : "Record your ride details manually"}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {error && <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px]">{error}</div>}

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Ride Title</label>
              <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Saturday Morning Ride" className={inputClass} />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Date *</label>
              <input type="date" value={form.ride_date} onChange={e => setForm(p => ({ ...p, ride_date: e.target.value }))} className={inputClass} />
            </div>

            {/* Distance + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Distance (miles) *</label>
                <input type="number" step="0.1" min="0" value={form.distance_miles} onChange={e => setForm(p => ({ ...p, distance_miles: e.target.value }))}
                  placeholder="26.0" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Duration (minutes) *</label>
                <input type="number" min="0" value={form.duration_minutes} onChange={e => setForm(p => ({ ...p, duration_minutes: e.target.value }))}
                  placeholder="90" className={inputClass} />
              </div>
            </div>

            {/* Speed + Elevation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Avg Speed (mph)</label>
                <input type="number" step="0.1" min="0" value={form.avg_speed} onChange={e => setForm(p => ({ ...p, avg_speed: e.target.value }))}
                  placeholder="17.0" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Elevation (feet)</label>
                <input type="number" min="0" value={form.elevation_feet} onChange={e => setForm(p => ({ ...p, elevation_feet: e.target.value }))}
                  placeholder="866" className={inputClass} />
              </div>
            </div>

            {/* Calories + Heart Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Calories</label>
                <input type="number" min="0" value={form.calories} onChange={e => setForm(p => ({ ...p, calories: e.target.value }))}
                  placeholder="800" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Avg Heart Rate (bpm)</label>
                <input type="number" min="0" value={form.avg_heart_rate} onChange={e => setForm(p => ({ ...p, avg_heart_rate: e.target.value }))}
                  placeholder="145" className={inputClass} />
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="How did the ride feel? Any highlights?" rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#111] text-[14px] focus:outline-none focus:border-[#14CFC4] transition-colors duration-200 resize-none" />
            </div>

            {/* Photos */}
            <div className="flex flex-col gap-2">
              <label className="text-[#888] text-[11px] font-medium tracking-wide uppercase">Ride Photos</label>

              {/* Existing photos */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map(photo => (
                    <div key={photo.id} className="relative rounded-xl overflow-hidden aspect-square">
                      <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => deleteExistingPhoto(photo.id)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-red-500 transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}

              {/* New photo previews */}
              {newPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {newPhotos.map((photo, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                      <img src={photo.preview} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeNewPhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-red-500 transition-colors">✕</button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <input value={photo.caption} onChange={e => setNewPhotos(prev => prev.map((p, idx) => idx === i ? { ...p, caption: e.target.value } : p))}
                          placeholder="Caption..." className="w-full text-[10px] text-white bg-transparent outline-none placeholder-white/60" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoSelect} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-[#888] text-[13px] hover:border-[#14CFC4] hover:text-[#14CFC4] transition-colors duration-200">
                📷 Add Photos (max 10MB each)
              </button>
            </div>

            {/* Save button */}
            <button onClick={handleSave} disabled={saving || uploadingPhoto}
              className={`w-full py-3.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${!saving && !uploadingPhoto ? "bg-[#14CFC4] text-white hover:bg-[#FFD84D] hover:text-[#111]" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              {saving ? "Saving..." : uploadingPhoto ? "Uploading Photos..." : isEditing ? "Save Changes →" : "Save Ride →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── RIDE DETAIL MODAL ────────────────────────────────────────────────────────

function RideDetailModal({ ride, onClose, onEdit, onDelete }: {
  ride: Ride;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
        <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-heading text-[#111111] text-[22px] font-semibold leading-tight">{ride.title || "Ride"}</h2>
              <p className="text-[#888] text-[13px] mt-1">{formatDate(ride.ride_date)}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#888] hover:bg-gray-200 transition-colors flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-[#14CFC4]/8 rounded-xl p-3 text-center">
              <p className="font-heading text-[#111] text-[22px] font-bold">{ride.distance_miles}</p>
              <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Miles</p>
            </div>
            <div className="bg-[#FFD84D]/10 rounded-xl p-3 text-center">
              <p className="font-heading text-[#111] text-[22px] font-bold">{formatDuration(ride.duration_minutes)}</p>
              <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Duration</p>
            </div>
            {ride.avg_speed && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="font-heading text-[#111] text-[22px] font-bold">{ride.avg_speed}</p>
                <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Avg MPH</p>
              </div>
            )}
            {ride.elevation_feet ? (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="font-heading text-[#111] text-[22px] font-bold">{ride.elevation_feet.toLocaleString()}</p>
                <p className="text-[#888] text-[10px] uppercase tracking-wide mt-0.5">Elev Ft</p>
              </div>
            ) : null}
          </div>

          {/* Secondary stats */}
          {(ride.calories || ride.avg_heart_rate) && (
            <div className="flex gap-3 mb-5">
              {ride.calories ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-600">
                  <span>🔥</span><span className="text-[13px] font-semibold">{ride.calories} cal</span>
                </div>
              ) : null}
              {ride.avg_heart_rate ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500">
                  <span>❤️</span><span className="text-[13px] font-semibold">{ride.avg_heart_rate} bpm avg</span>
                </div>
              ) : null}
            </div>
          )}

          {/* Notes */}
          {ride.notes && (
            <div className="mb-5 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[#888] text-[11px] uppercase tracking-wide font-medium mb-1">Notes</p>
              <p className="text-[#555] text-[14px] leading-relaxed">{ride.notes}</p>
            </div>
          )}

          {/* Photos */}
          {ride.photos && ride.photos.length > 0 && (
            <div className="mb-5">
              <p className="text-[#888] text-[11px] uppercase tracking-wide font-medium mb-2">Photos</p>
              <div className="grid grid-cols-2 gap-2">
                {ride.photos.map(photo => (
                  <div key={photo.id} className="rounded-xl overflow-hidden aspect-video">
                    <img src={photo.image_url} alt={photo.caption || ""} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button onClick={onEdit}
              className="flex-1 py-3 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Edit Ride
            </button>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                className="px-5 py-3 rounded-xl border border-red-200 text-red-400 text-[12px] font-bold tracking-wide uppercase hover:bg-red-50 transition-colors duration-200">
                Delete
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={onDelete}
                  className="px-4 py-3 rounded-xl bg-red-500 text-white text-[12px] font-bold tracking-wide uppercase hover:bg-red-600 transition-colors">
                  Confirm
                </button>
                <button onClick={() => setConfirmDelete(false)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-[#888] text-[12px] font-bold hover:border-gray-400 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── RIDE CARD ────────────────────────────────────────────────────────────────

function RideCard({ ride, onClick }: { ride: Ride; onClick: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="h-[4px] w-full bg-gradient-to-r from-[#14CFC4] to-[#FFD84D]" />

      {/* Photo thumbnail */}
      {ride.photos && ride.photos.length > 0 && (
        <div className="h-[140px] overflow-hidden">
          <img src={ride.photos[0].image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading text-[#111111] text-[17px] font-semibold leading-tight group-hover:text-[#14CFC4] transition-colors duration-200">
              {ride.title || "Untitled Ride"}
            </h3>
            <p className="text-[#888] text-[12px] mt-0.5">{formatDate(ride.ride_date)}</p>
          </div>
          {ride.photos && ride.photos.length > 0 && (
            <span className="text-[11px] text-[#14CFC4] bg-[#14CFC4]/10 px-2 py-1 rounded-lg font-medium">
              📷 {ride.photos.length}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="font-heading text-[#111] text-[18px] font-bold">{ride.distance_miles}</p>
            <p className="text-[#aaa] text-[10px] uppercase tracking-wide">mi</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-[#111] text-[18px] font-bold">{formatDuration(ride.duration_minutes)}</p>
            <p className="text-[#aaa] text-[10px] uppercase tracking-wide">time</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-[#111] text-[18px] font-bold">{ride.avg_speed || "—"}</p>
            <p className="text-[#aaa] text-[10px] uppercase tracking-wide">mph</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-[#111] text-[18px] font-bold">{ride.elevation_feet ? ride.elevation_feet.toLocaleString() : "—"}</p>
            <p className="text-[#aaa] text-[10px] uppercase tracking-wide">ft</p>
          </div>
        </div>

        {(ride.calories || ride.avg_heart_rate) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
            {ride.calories ? <span className="text-[11px] text-orange-500">🔥 {ride.calories} cal</span> : null}
            {ride.avg_heart_rate ? <span className="text-[11px] text-red-400">❤️ {ride.avg_heart_rate} bpm</span> : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function MyRidesPage() {
  const supabase = createClient();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingRide, setEditingRide] = useState<Ride | undefined>(undefined);
  const [viewingRide, setViewingRide] = useState<Ride | null>(null);

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
    const { data: ridesData } = await supabase.from("rides").select("*").eq("user_id", uid).order("ride_date", { ascending: false });
    if (!ridesData) { setLoading(false); return; }

    // Fetch photos for each ride
    const rideIds = ridesData.map(r => r.id);
    const { data: photos } = await supabase.from("ride_photos").select("*").in("ride_id", rideIds);

    const ridesWithPhotos = ridesData.map(r => ({
      ...r,
      photos: photos?.filter(p => p.ride_id === r.id) || [],
    }));

    setRides(ridesWithPhotos);
    setLoading(false);
  };

  const handleDelete = async (rideId: string) => {
    await supabase.from("rides").delete().eq("id", rideId);
    setRides(prev => prev.filter(r => r.id !== rideId));
    setViewingRide(null);
  };

  const handleEdit = (ride: Ride) => {
    setViewingRide(null);
    setEditingRide(ride);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRide(undefined);
  };

  const totalMiles = rides.reduce((s, r) => s + r.distance_miles, 0);
  const totalRides = rides.length;
  const totalElevation = rides.reduce((s, r) => s + (r.elevation_feet || 0), 0);

  return (
    <div className="min-h-screen pt-[80px] pb-20">
      <AnimatePresence>
        {showForm && (
          <RideFormModal
            ride={editingRide}
            userId={userId}
            onClose={handleCloseForm}
            onSaved={() => fetchRides(userId)}
          />
        )}
        {viewingRide && (
          <RideDetailModal
            ride={viewingRide}
            onClose={() => setViewingRide(null)}
            onEdit={() => handleEdit(viewingRide)}
            onDelete={() => handleDelete(viewingRide.id)}
          />
        )}
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
            <p className="text-white/60 text-[14px] mt-1">{totalRides} rides · {totalMiles.toFixed(1)} total miles</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portal" className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-[12px] font-medium hover:border-white/40 hover:text-white transition-colors duration-200">← Portal</Link>
            <button onClick={() => { setEditingRide(undefined); setShowForm(true); }}
              className="px-5 py-2.5 rounded-xl bg-[#14CFC4] text-white text-[12px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              + Log Ride
            </button>
          </div>
        </motion.div>

        {/* Summary stats */}
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

        {/* Rides grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-[14px]">Loading your rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-center py-20">
            <span className="text-6xl mb-4 block">🚴</span>
            <h3 className="font-heading text-white text-[24px] font-semibold mb-3">No rides logged yet</h3>
            <p className="text-white/60 text-[14px] mb-8 max-w-[360px] mx-auto leading-relaxed">
              Start tracking your rides to see your progress, earn leaderboard spots, and unlock personal bests.
            </p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#14CFC4] text-white text-[13px] font-bold tracking-wide uppercase hover:bg-[#FFD84D] hover:text-[#111] transition-colors duration-300">
              Log Your First Ride →
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {rides.map(ride => (
                <RideCard key={ride.id} ride={ride} onClick={() => setViewingRide(ride)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
