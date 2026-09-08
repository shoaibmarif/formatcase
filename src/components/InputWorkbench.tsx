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
    <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs space-y-4">
      {/* Top Header: Label & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-bold text-slate-800 dark:text-zinc-100">
            Source Input Workbench
          </span>
          {batchMode && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Batch Mode (Line-by-Line)
            </span>
          )}
        </div>

        {/* Real-time stats */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 font-medium">
            {stats.lines} {stats.lines === 1 ? 'line' : 'lines'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 font-medium">
            {stats.words} {stats.words === 1 ? 'word' : 'words'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 font-medium">
            {stats.chars} chars ({stats.charsNoSpaces} no space)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 font-medium">
            {formatBytes(stats.bytes)}
          </span>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          rows={5}
          placeholder="Paste or type variable names, database columns, JSON keys, or paragraphs here..."
          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 font-mono text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-indigo-500/80 transition-all resize-y min-h-[120px]"
        />
      </div>

      {/* Action Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Left Toolbar: Batch Mode & Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch Mode Toggle */}
          <button
            type="button"
            onClick={onToggleBatchMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              batchMode
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-slate-50 dark:bg-zinc-800/60 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
            title="When ON, each line is transformed independently. Perfect for lists of column names or variables."
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Batch Mode: {batchMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Load Sample</span>
            </button>
            <div className="absolute left-0 top-full mt-1 w-56 p-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl hidden group-hover:block z-30 animate-in fade-in duration-150">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Preset Scenarios
              </div>
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onLoadPreset(preset)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-colors flex flex-col"
                >
                  <span className="font-semibold">{preset.label}</span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Toolbar: Paste, Undo, Clear */}
        <div className="flex items-center gap-2">
          {previousInput !== null && onRestorePrevious && (
            <button
              type="button"
              onClick={onRestorePrevious}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1 transition-colors cursor-pointer"
              title="Undo last in-place replacement"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePaste}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-indigo-500" />
            <span>Paste</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeInput('')}
            disabled={!input}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60 flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Clear all text"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Quick Action Bar (1-Click Replace In-Place) */}
      <hr className="border-slate-100 dark:border-zinc-800/80" />
      <QuickActions onApplyFormat={onApplyFormat} disabled={!input} />
    </div>
  );
};
