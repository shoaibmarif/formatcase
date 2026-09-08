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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-zinc-800">
          <Search className="w-4 h-4 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInList}
            placeholder="Search casing formats (e.g. camelCase, kebab, screaming)..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 dark:text-zinc-500">
              No matching formats found for "{query}"
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
                  className={`w-full text-left p-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-zinc-800/90 text-indigo-950 dark:text-zinc-100 ring-1 ring-indigo-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-zinc-100">
                        {fmt.name}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                        {fmt.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 truncate mt-0.5">
                      {previewResult}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(previewResult);
                        onNotifyCopy(`Copied ${fmt.name} result`);
                      }}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                      title="Copy result directly"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 px-1.5 py-0.5 rounded bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600">
                        <CornerDownLeft className="w-3 h-3" /> Apply
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press Enter to apply in-place</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
