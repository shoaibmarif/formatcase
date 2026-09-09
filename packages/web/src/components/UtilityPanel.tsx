import React, { useState } from 'react';
import { Sliders, PlusCircle, Eraser, ChevronDown } from 'lucide-react';
import { applyPrefixSuffix, cleanText, CleanerOptions } from '../utils/textUtils';

interface UtilityPanelProps {
  input: string;
  onUpdateInput: (val: string, actionName: string) => void;
}

export const UtilityPanel: React.FC<UtilityPanelProps> = ({ input, onUpdateInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [injectMode, setInjectMode] = useState<'lines' | 'words'>('lines');

  const handleApplyPrefixSuffix = () => {
    if (!input) return;
    const modified = applyPrefixSuffix(input, { prefix, suffix, mode: injectMode });
    onUpdateInput(modified, `Applied prefix "${prefix}" / suffix "${suffix}"`);
  };

  const handleClean = (options: CleanerOptions, label: string) => {
    if (!input) return;
    const cleaned = cleanText(input, options);
    onUpdateInput(cleaned, label);
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-all">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-100">
              Advanced Text Utilities & Delimiter Tools
            </span>
            <span className="ml-2 text-xs text-slate-500 dark:text-zinc-400 hidden lg:inline">
              (Prefix/Suffix injection, delimiter stripper, whitespace cleaner)
            </span>
          </div>
        </div>
        <div className={`text-slate-400 dark:text-zinc-500 shrink-0 ml-2 transform transition-transform duration-300 ease-out ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'rotate-0'}`}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>

      {/* Smooth Animated Accordion Body */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8 border-t border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-950/40 space-y-6 sm:space-y-8">
          {/* Prefix / Suffix Injection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4 text-indigo-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Prefix & Suffix Injector (SQL / JSON / Quotes)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
                  Prefix (e.g. " or ' or `)
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. '"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
                  Suffix (e.g. ", or ',)
                </label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="e.g. ',"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2.5">
                  <select
                    value={injectMode}
                    onChange={(e) => setInjectMode(e.target.value as 'lines' | 'words')}
                    className="px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium cursor-pointer"
                  >
                    <option value="lines">Each Line</option>
                    <option value="words">Each Word</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleApplyPrefixSuffix}
                    disabled={!input || (!prefix && !suffix)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                  >
                    Inject
                  </button>
                </div>
              </div>
            </div>

            {/* Common quick injections */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 dark:text-zinc-400">Quick presets:</span>
              <button
                type="button"
                onClick={() => {
                  setPrefix("'");
                  setSuffix("',");
                }}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                SQL Quotes: 'item',
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrefix('"');
                  setSuffix('",');
                }}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                JSON Array: "item",
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrefix('`');
                  setSuffix('`');
                }}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                Backticks: `item`
              </button>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-zinc-800" />

          {/* Whitespace & Delimiter Stripper */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Eraser className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Whitespace & Delimiter Cleaners
              </h4>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => handleClean({ trimLines: true }, 'Trimmed line whitespace')}
                disabled={!input}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Trim Line Edges
              </button>
              <button
                type="button"
                onClick={() => handleClean({ collapseSpaces: true }, 'Collapsed multiple spaces')}
                disabled={!input}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Collapse Duplicate Spaces
              </button>
              <button
                type="button"
                onClick={() => handleClean({ removeEmptyLines: true }, 'Removed blank lines')}
                disabled={!input}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Remove Empty Lines
              </button>
              <button
                type="button"
                onClick={() => handleClean({ removeDelimiters: true }, 'Replaced delimiters with space')}
                disabled={!input}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Strip Delimiters (- _ / \ .)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleClean(
                    { trimLines: true, collapseSpaces: true, removeEmptyLines: true },
                    'Full Whitespace Normalization'
                  )
                }
                disabled={!input}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Normalize All Whitespace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
