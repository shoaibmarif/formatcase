import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  // Enforce maximum 3 toasts visible simultaneously
  const visibleToasts = toasts.slice(-3);

  return (
    <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-5 z-50 flex flex-col items-center sm:items-end gap-2 pointer-events-none w-[calc(100%-2rem)] max-w-sm sm:w-auto">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto w-full flex items-center justify-between p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-800 dark:bg-emerald-950/90 dark:border-emerald-700'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-100 border-rose-800 dark:bg-rose-950/90 dark:border-rose-700'
              : 'bg-zinc-900/90 text-zinc-100 border-zinc-700 dark:bg-zinc-800/90 dark:border-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-medium">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:opacity-75 rounded transition-opacity ml-2 shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

