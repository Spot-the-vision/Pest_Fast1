import React from 'react';

export default function SectionHeader({ icon, title, subtitle, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-[#ebe8e3] mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#003527]/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#003527] text-[22px]">{icon}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-black text-[#003527] text-base tracking-tight">{title}</h2>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#fbf7ee] text-[#003527] border border-[#ebe8e3] text-[11px] font-bold">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[12px] text-[#707974] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}
