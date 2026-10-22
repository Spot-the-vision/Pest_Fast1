import React from 'react';
const easyHiCareLogo = '/easyhicare-logo.png';

export default function Header({ onSelectSection, onToast, onOpenSidebar }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/95 backdrop-blur-md border-b border-[#EFE3A6] z-40 flex items-center justify-between px-3 sm:px-6 shadow-2xs gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f6f3ee] shrink-0"
            aria-label="Open sidebar navigation"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        )}
        {/* Agency Partner Identity Pill */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={easyHiCareLogo}
            alt="Easy HiCare Logo"
            style={{
              height: 40,
              width: 'auto',
              maxWidth: 90,
              borderRadius: 8,
              objectFit: 'contain',
              background: '#FFFFFF',
              padding: '2px 6px',
              border: '1.5px solid #ebe8e3',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              flexShrink: 0
            }}
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-black text-[#003527] truncate">Easy HiCare</span>
            <span className="text-[11px] text-[#707974] font-semibold truncate hidden sm:block">Agency Metro Hub #PF-8821</span>
          </div>
        </div>

        {/* Signature Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003527] text-white text-xs font-bold shadow-xs whitespace-nowrap shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>Fleet Active: 18 Techs</span>
        </div>

        {/* Metrics Pill */}
        <div className="hidden 2xl:flex items-center gap-3 pl-1 whitespace-nowrap shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebe8e3] shadow-xs">
            <span className="material-symbols-outlined text-[#fea619] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-xs font-bold text-[#1c1c19]">4.9</span>
            <span className="text-[11px] text-[#707974]">(318 reviews)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] uppercase tracking-wider text-[#707974] font-bold">SLA Response</span>
              <span className="font-bold text-[#003527]">14m Avg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Operations Bar Quick Button */}
        <button
          type="button"
          aria-label="Operations Bar queue"
          onClick={() => onSelectSection('bookings')}
          className="relative px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f6f3ee] flex items-center gap-2 text-[#003527] font-bold text-xs transition-colors border border-[#ebe8e3] shadow-xs cursor-pointer whitespace-nowrap shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">approval_delegation</span>
          <span>Operations Bar</span>
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#fea619] text-[#1c1c19] text-[10px] font-black shrink-0">4</span>
        </button>
      </div>
    </header>
  );
}
