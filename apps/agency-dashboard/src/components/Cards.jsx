import React from 'react';

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ icon, iconBg, iconColor, label, value, sub, badge, progress, progressValue, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col p-5 rounded-3xl bg-white border border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/30 transition-all text-left w-full cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">{label}</span>
        <div className={`w-9 h-9 rounded-xl ${iconBg || 'bg-[#fbf7ee]'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <span className={`material-symbols-outlined text-[18px] ${iconColor || 'text-[#003527]'}`}>{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-3xl sm:text-4xl font-black text-[#003527] leading-none tracking-tight">{value}</span>
        {sub && <span className="text-xs sm:text-sm text-[#707974] font-semibold">{sub}</span>}
      </div>
      {progress && (
        <div className="w-full bg-[#f0ede9] h-1.5 rounded-full overflow-hidden mb-1.5">
          <div className="bg-[#003527] h-full rounded-full transition-all duration-500" style={{ width: `${progressValue}%` }} />
        </div>
      )}
      {badge && <div className="flex items-center gap-1.5 text-xs text-[#707974] mt-auto pt-1 font-medium">{badge}</div>}
    </button>
  );
}

// ─── Worker Card ──────────────────────────────────────────────────────────────
export function WorkerCard({ worker, onFocus, focused, recentering, onToast }) {
  const statusStyles = {
    'En Route': { bg: 'bg-[#fea619]/15 text-[#855300] border border-[#fea619]/30', dot: 'bg-[#fea619] animate-pulse' },
    'On Job Site': { bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-500' },
    'Active Drill': { bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-600' },
  };
  const s = statusStyles[worker.status] || { bg: 'bg-[#f0ede9] text-[#707974] border border-[#ebe8e3]', dot: 'bg-gray-400' };

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${focused ? 'border-[#003527] shadow-md ring-2 ring-[#003527]/10' : 'border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/20'} bg-white`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={worker.avatar} alt={worker.name} className="w-11 h-11 rounded-xl object-cover border border-[#ebe8e3]" />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${s.dot}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#1c1c19] text-sm">{worker.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-[#fbf7ee] text-[#003527] text-[11px] font-bold border border-[#ebe8e3]">{worker.role}</span>
            </div>
            <span className="text-[12px] text-[#707974] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#003527]">phone</span>{worker.phone}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-0.5 text-[#fea619]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-sm font-bold text-[#1c1c19]">{worker.rating}</span>
            <span className="text-[11px] text-[#707974]">({worker.reviews})</span>
          </div>
          <span className="text-[11px] text-[#707974] font-medium">{worker.jobs} Jobs</span>
        </div>
      </div>

      <div className={`mt-3 flex items-center justify-between px-3 py-1.5 rounded-xl ${s.bg}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-[11px] font-bold uppercase tracking-wider">{worker.status}</span>
        </div>
        <span className="text-[11px] font-medium truncate max-w-[140px]">{worker.location}</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onFocus(worker.id, worker.name)}
          className={`flex-1 py-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            focused
              ? 'bg-[#003527] text-white shadow-xs'
              : 'bg-[#fbf7ee] hover:bg-[#f0ede9] text-[#003527] border border-[#ebe8e3]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">location_searching</span>
          {focused ? 'Tracking Live...' : 'Track on Map'}
        </button>
        <button
          type="button"
          onClick={() => onToast(`${worker.name} — ${worker.tasks} tasks active on dispatch schedule`, 'success')}
          className="flex-1 py-2 rounded-xl bg-[#003527] text-white text-[12px] font-bold hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">task_alt</span>Tasks ({worker.tasks})
        </button>
      </div>
    </div>
  );
}
