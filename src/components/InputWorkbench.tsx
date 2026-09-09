import React, { useRef } from 'react';
import {
  FileText,
  Trash2,
  ClipboardPaste,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { computeTextStats, formatBytes, SAMPLE_PRESETS, SamplePreset } from '../utils/textUtils';
import { QuickActions } from './QuickActions';

interface InputWorkbenchProps {
  input: string;
  onChangeInput: (val: string) => void;
  batchMode: boolean;
  onToggleBatchMode: () => void;
  onApplyFormat: (formatter: (val: string) => string, name: string) => void;
  onLoadPreset: (preset: SamplePreset) => void;
  onNotifyCopy: (msg: string) => void;
  previousInput?: string | null;
  onRestorePrevious?: () => void;
}

export const InputWorkbench: React.FC<InputWorkbenchProps> = ({
  input,
  onChangeInput,
  batchMode,
  onToggleBatchMode,
  onApplyFormat,
  onLoadPreset,
  onNotifyCopy,
  previousInput,
  onRestorePrevious,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stats = computeTextStats(input);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChangeInput(text);
        onNotifyCopy('Pasted content from clipboard');
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    } catch {
      onNotifyCopy('Unable to read clipboard, check permissions');
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
      {/* Top Header: Label & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 dark:text-zinc-100">
              Input Text
            </span>
            {batchMode && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Batch Mode Active
              </span>
            )}
          </div>
        </div>

        {/* Real-time stats */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/90 font-medium">
            {stats.lines} {stats.lines === 1 ? 'line' : 'lines'}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/90 font-medium">
            {stats.words} {stats.words === 1 ? 'word' : 'words'}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/90 font-medium">
            {stats.chars} chars ({stats.charsNoSpaces} without spaces)
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/90 font-medium">
            {formatBytes(stats.bytes)}
          </span>
        </div>
      </div>

      {/* Main Textarea with generous breathing space */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          rows={5}
          placeholder="Type or paste words, sentences, database fields, or code identifiers here..."
          className="w-full p-5 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 font-mono text-sm leading-relaxed focus:outline-hidden focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-y min-h-[150px]"
        />
      </div>

      {/* Action Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Left Toolbar: Batch Mode & Presets */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Batch Mode Toggle */}
          <button
            type="button"
            onClick={onToggleBatchMode}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              batchMode
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 dark:bg-zinc-800/60 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
            title="When ON, each line is transformed independently. Perfect for lists of column names or variables."
          >
            <Layers className="w-4 h-4" />
            <span>Batch Mode: {batchMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Load Sample</span>
            </button>
            <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl hidden group-hover:block z-30 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Sample Examples
              </div>
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onLoadPreset(preset)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-colors flex flex-col gap-0.5 cursor-pointer"
                >
                  <span className="font-semibold">{preset.label}</span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500 leading-tight">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Toolbar: Paste, Undo, Clear */}
        <div className="flex items-center gap-2.5">
          {previousInput !== null && onRestorePrevious && (
            <button
              type="button"
              onClick={onRestorePrevious}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Undo last in-place change"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePaste}
            className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-indigo-500" />
            <span>Paste</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeInput('')}
            disabled={!input}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60 flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Clear text"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Quick Action Bar (1-Click Replace In-Place) */}
      <hr className="border-slate-100 dark:border-zinc-800/80 my-1" />
      <QuickActions onApplyFormat={onApplyFormat} disabled={!input} />
    </div>
  );
};
