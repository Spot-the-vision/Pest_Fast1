import React from 'react';

/**
 * Universal Section Header
 */
export function SectionHeader({ icon, title, subtitle, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-[#ebe8e3]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#003527]/10 text-[#003527] flex items-center justify-center shrink-0">
            {typeof icon === 'string' ? (
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            ) : (
              icon
            )}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base sm:text-lg text-[#1c1c19] tracking-tight">{title}</h2>
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-[#707974] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
