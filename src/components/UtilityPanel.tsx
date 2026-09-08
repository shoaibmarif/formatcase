import React, { useState } from 'react';
import { Sliders, PlusCircle, Eraser, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs transition-all">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-100">
              Advanced Text Utilities & Delimiter Tools
            </span>
            <span className="ml-2 text-xs text-slate-500 dark:text-zinc-400 hidden sm:inline">
              (Prefix/Suffix injection, delimiter stripper, whitespace cleaner)
            </span>
          </div>
        </div>
        <div className="text-slate-400 dark:text-zinc-500">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded body */}
      {isOpen && (
        <div className="p-5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 space-y-6 animate-in fade-in duration-200">
          {/* Prefix / Suffix Injection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-indigo-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Prefix & Suffix Injector (SQL/JSON/Quotes)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                  Prefix (e.g. " or ' or `)
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. '"
                  className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                  Suffix (e.g. ", or ',)
                </label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="e.g. ',"
                  className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-mono"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <select
                    value={injectMode}
                    onChange={(e) => setInjectMode(e.target.value as 'lines' | 'words')}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium"
                  >
                    <option value="lines">Each Line</option>
                    <option value="words">Each Word</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleApplyPrefixSuffix}
                    disabled={!input || (!prefix && !suffix)}
                    className="flex-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                  >
                    Inject
                  </button>
                </div>
              </div>
            </div>

            {/* Common quick injections */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">Quick presets:</span>
              <button
                type="button"
                onClick={() => {
                  setPrefix("'");
                  setSuffix("',");
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300"
              >
                SQL Quotes: 'item',
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrefix('"');
                  setSuffix('",');
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300"
              >
                JSON Array: "item",
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrefix('`');
                  setSuffix('`');
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 text-slate-700 dark:text-zinc-300"
              >
                Backticks: `item`
              </button>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-zinc-800" />

          {/* Whitespace & Delimiter Stripper */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eraser className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Whitespace & Delimiter Cleaners
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleClean({ trimLines: true }, 'Trimmed line whitespace')}
                disabled={!input}
                className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
              >
                Trim Line Edges
              </button>
              <button
                type="button"
                onClick={() => handleClean({ collapseSpaces: true }, 'Collapsed multiple spaces')}
                disabled={!input}
                className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
              >
                Collapse Duplicate Spaces
              </button>
              <button
                type="button"
                onClick={() => handleClean({ removeEmptyLines: true }, 'Removed blank lines')}
                disabled={!input}
                className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
              >
                Remove Empty Lines
              </button>
              <button
                type="button"
                onClick={() => handleClean({ removeDelimiters: true }, 'Replaced delimiters with space')}
                disabled={!input}
                className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
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
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors disabled:opacity-40"
              >
                Normalize All Whitespace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
