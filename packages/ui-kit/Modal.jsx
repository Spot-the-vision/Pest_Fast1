import React from 'react';
import { X } from 'lucide-react';

/**
 * Responsive, App-Ready Modal / Bottom Sheet
 * Automatically centers on desktop and behaves as an accessible bottom sheet on mobile screens.
 */
export function Modal({ open, onClose, title, icon: Icon, danger = false, children, maxWidth = 'max-w-md' }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#ebe8e3] p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 flex flex-col`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3] mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  danger ? 'bg-red-50 text-red-600' : 'bg-[#003527]/10 text-[#003527]'
                }`}
              >
                {typeof Icon === 'string' ? (
                  <span className="material-symbols-outlined text-[20px]">{Icon}</span>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
            )}
            {title && (
              <h3 className="font-bold text-base text-[#1c1c19] tracking-tight">{title}</h3>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#707974] hover:text-[#1c1c19] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export const ModalDialog = Modal;
