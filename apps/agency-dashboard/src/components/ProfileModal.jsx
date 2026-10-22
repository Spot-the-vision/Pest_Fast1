import React, { useState, useEffect } from 'react';

export default function ProfileModal({ open, onClose, showToast, onLogout, profile, onSaveProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || 'Marcus Sterling',
    email: profile?.email || 'marcus@ecopest.com',
    phone: profile?.phone || '+91 98001 12345',
    agencyCode: profile?.agencyCode || 'EcoPest Solutions #PF-8821',
    role: profile?.role || 'Chief Operations Dispatcher',
    shift: profile?.shift || 'Shift A (07:00 - 19:00 IST)',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || 'Marcus Sterling',
        email: profile.email || 'marcus@ecopest.com',
        phone: profile.phone || '+91 98001 12345',
        agencyCode: profile.agencyCode || 'EcoPest Solutions #PF-8821',
        role: profile.role || 'Chief Operations Dispatcher',
        shift: profile.shift || 'Shift A (07:00 - 19:00 IST)',
      });
    }
  }, [profile]);

  if (!open) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile && onSaveProfile(formData);
    setIsEditing(false);
    showToast('✅ Profile updated successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h3 className="font-bold text-[#003527] text-base">{formData.name}</h3>
              <p className="text-[12px] text-[#707974]">{formData.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#003527]/10 hover:bg-[#003527] hover:text-white text-[#003527] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="Edit Profile"
              >
                <span className="material-symbols-outlined text-[15px]">edit</span>
                <span>Edit</span>
              </button>
            )}
            <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30 font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Direct Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30 font-mono"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Active Shift</label>
              <input
                type="text"
                value={formData.shift}
                onChange={e => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Authority / Title</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Profile Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#707974] hover:text-[#1c1c19] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 py-4 bg-[#fcf9f4] rounded-2xl border border-[#ebe8e3] p-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#003527] text-[#fea619] flex items-center justify-center text-xl font-black shadow-md border-2 border-white/20">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-[#003527] text-base">{formData.name}</div>
                <div className="text-xs text-[#707974]">{formData.email}</div>
                <div className="flex items-center justify-center gap-1.5 mt-2 bg-white px-3 py-1 rounded-full border border-[#ebe8e3] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-[#003527] font-bold">Online · EcoPest Central Hub</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[#ebe8e3] bg-white shadow-xs space-y-2 text-xs">
              {[
                ['Direct Line', formData.phone],
                ['Agency Code', formData.agencyCode],
                ['Authority', formData.role],
                ['Active Shift', formData.shift],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-[#ebe8e3] last:border-0">
                  <span className="text-[#707974]">{k}</span>
                  <span className="font-semibold text-[#1c1c19] text-right">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>Edit Profile Information
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Password reset link sent to ${formData.email}`, 'success');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>Change Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
