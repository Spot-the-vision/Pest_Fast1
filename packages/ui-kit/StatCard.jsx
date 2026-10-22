import React from 'react';

/**
 * Universal Metric / Stat Card
 * Grid-safe, overflow-proof responsive stat card
 */
export function StatCard({
  icon,
  iconBg = 'bg-[#003527]/10',
  iconColor = 'text-[#003527]',
  label,
  value,
  sub,
  badge,
  progress,
  progressValue,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#ebe8e3] rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-200 min-w-0 flex flex-col justify-between overflow-hidden box-border ${
        onClick ? 'cursor-pointer hover:border-[#003527]/30 hover:shadow-md' : ''
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
            {typeof icon === 'string' ? (
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            ) : (
              icon
            )}
          </div>
          {badge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30 max-w-[65%] truncate shrink-0">
              {badge}
            </span>
          )}
        </div>

        <div className="text-[11px] font-bold uppercase tracking-wider text-[#707974] mb-0.5 truncate" title={typeof label === 'string' ? label : undefined}>
          {label}
        </div>
        <div className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight truncate">
          {value}
        </div>

        {sub && (
          <div className="text-xs text-[#707974] mt-1 font-medium truncate" title={typeof sub === 'string' ? sub : undefined}>
            {sub}
          </div>
        )}
      </div>

      {progress && typeof progressValue === 'number' && (
        <div className="mt-3 w-full">
          <div className="w-full bg-[#f0ede9] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#003527] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
