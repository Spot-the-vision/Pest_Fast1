import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Universal Toast Notification Stack
 * Renders non-blocking notification pills fixed at bottom center.
 */
export function ToastStack({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none px-4 w-full max-w-md">
      {toasts.map((toast) => {
        const isError = toast.type === 'error' || toast.type === 'destructive';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold w-full sm:w-auto min-w-[280px] max-w-md animate-in fade-in slide-in-from-bottom-3 duration-200 ${
              isError
                ? 'bg-red-600 text-white border-red-700'
                : isSuccess
                ? 'bg-[#003527] text-white border-[#064e3b]'
                : 'bg-[#003527] text-white border-[#064e3b]'
            }`}
          >
            {isError ? (
              <AlertTriangle className="w-5 h-5 text-red-200 shrink-0" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-[#fea619] shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-[#fea619] shrink-0" />
            )}
            <span className="flex-1 text-xs sm:text-sm leading-snug">{toast.message}</span>
            {onDismiss && (
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Single Toast Component for standalone instances
 */
export function Toast({ message, onClose, type = 'info' }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl bg-[#003527] text-white font-semibold text-sm min-w-[320px] max-w-lg border border-[#064e3b] animate-in fade-in slide-in-from-bottom-4 duration-200">
      <span className="text-[#fea619] text-base">●</span>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors ml-2 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
