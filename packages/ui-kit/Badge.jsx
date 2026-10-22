import React from 'react';

/**
 * Universal Status Badge / Pill
 */
export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] leading-tight',
    sm: 'px-2.5 py-1 text-xs font-semibold',
    md: 'px-3 py-1.5 text-xs sm:text-sm font-semibold',
  }[size] || 'px-2.5 py-1 text-xs font-semibold';

  const variantClasses = {
    default: 'bg-[#f0ede9] text-[#404944] border border-[#ebe8e3]',
    primary: 'bg-[#003527]/10 text-[#003527] border border-[#003527]/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    dark: 'bg-[#003527] text-white border border-[#064e3b]',
  }[variant] || 'bg-[#f0ede9] text-[#404944] border border-[#ebe8e3]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold tracking-tight shrink-0 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
