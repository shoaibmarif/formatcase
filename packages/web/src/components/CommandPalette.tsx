import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Copy, CornerDownLeft } from 'lucide-react';
import { FORMAT_DEFINITIONS } from '../utils/formatters';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  input: string;
  onApplyFormat: (fn: (val: string) => string, name: string) => void;
  onNotifyCopy: (msg: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  input,
  onApplyFormat,
  onNotifyCopy,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = FORMAT_DEFINITIONS.filter((fmt) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      fmt.name.toLowerCase().includes(q) ||
      fmt.description.toLowerCase().includes(q) ||
      fmt.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        onApplyFormat(selected.fn, selected.name);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Casing Formats"
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800/90 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] transition-all"
      >
        {/* Search header */}
        <div className="flex items-center gap-3.5 px-6 py-4.5 border-b border-slate-200/80 dark:border-zinc-800/80">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInList}
            placeholder="Search casing formats (e.g. camelCase, kebab, snake)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm font-semibold text-slate-600 dark:text-zinc-300">
                No matching formats found for "{query}"
              </p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                Try searching for words like "camel", "title", "space", or "upper"
              </p>
            </div>
          ) : (
            filtered.map((fmt, idx) => {
              const isSelected = idx === selectedIndex;
              const previewResult = input ? fmt.fn(input) : fmt.example;

              return (
                <div
                  key={fmt.id}
                  onClick={() => {
                    onApplyFormat(fmt.fn, fmt.name);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-zinc-800/90 text-indigo-950 dark:text-zinc-100 ring-1 ring-indigo-500/40 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="min-w-0 pr-2 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-zinc-100">
                        {fmt.name}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-700/60">
                        {fmt.category}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 truncate leading-relaxed">
                      {previewResult}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(previewResult);
                        onNotifyCopy(`Copied ${fmt.name} result`);
                      }}
                      className="p-2 rounded-xl hover:bg-white dark:hover:bg-zinc-700 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-zinc-600 cursor-pointer"
                      title="Copy result directly"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {isSelected && (
                      <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-700/80 border border-indigo-200 dark:border-zinc-600 shadow-2xs">
                        <CornerDownLeft className="w-3.5 h-3.5" /> Apply
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-zinc-950/80 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-4">
            <span>Use <strong className="font-semibold text-slate-700 dark:text-zinc-300">↑ ↓</strong> to navigate</span>
            <span>Press <strong className="font-semibold text-slate-700 dark:text-zinc-300">Enter</strong> to apply</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            Press <strong className="font-semibold">Esc</strong> to close
          </button>
        </div>
      </div>
    </div>
  );
};
