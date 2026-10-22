import React from 'react';

export default function Toast({ message, type = 'info' }) {
  if (!message) return null;
  const bg = type === 'success' ? 'bg-[#003527]' : type === 'warning' ? 'bg-[#fea619]' : 'bg-[#1c1c19]';
  const textCol = type === 'warning' ? 'text-[#1c1c19]' : 'text-white';
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${bg} ${textCol} font-semibold text-sm border border-white/10 animate-in slide-in-from-bottom-4 duration-300`}>
      <span className="material-symbols-outlined text-[18px]">
        {type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'info'}
      </span>
      {message}
    </div>
  );
}
