import React, { useState } from 'react';
import { Copy, Check, Star, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FormatDefinition } from '../utils/formatters';

interface FormatCardProps {
  format: FormatDefinition;
  output: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onReplaceInput: (val: string, formatName: string) => void;
  onNotifyCopy: (msg: string) => void;
}

export const FormatCard: React.FC<FormatCardProps> = ({
  format,
  output,
  isFavorite,
  onToggleFavorite,
  onReplaceInput,
  onNotifyCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    if (!output) return;

    // Small celebratory confetti burst near the clicked button
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#6366f1', '#a855f7', '#10b981', '#3b82f6'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback if canvas not available
    }

    navigator.clipboard.writeText(output);
    setCopied(true);
    onNotifyCopy(`Copied ${format.name} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'developer':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60';
      case 'natural':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60';
      default:
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60';
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 bg-white dark:bg-zinc-900/90 p-4 shadow-2xs hover:shadow-md ${
        isFavorite
          ? 'border-amber-300/80 dark:border-amber-600/60 ring-1 ring-amber-400/20'
          : 'border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700'
      }`}
    >
      <div>
        {/* Header: Name, Category, Pin */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 overflow-hidden">
            <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-zinc-100 truncate">
              {format.name}
            </h3>
            <span
              className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${getCategoryColor(
                format.category
              )}`}
            >
              {format.category}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(format.id)}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              isFavorite
                ? 'text-amber-500 hover:text-amber-600'
                : 'text-slate-300 dark:text-zinc-600 hover:text-amber-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Pin to top of grid'}
            aria-label="Toggle favorite"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-zinc-400 mb-3 line-clamp-1">
          {format.description}
        </p>

        {/* Output container */}
        <div className="relative rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 p-3 min-h-[58px] max-h-48 overflow-y-auto font-mono text-xs text-slate-900 dark:text-zinc-100 select-all break-all whitespace-pre-wrap flex items-center">
          {output ? (
            output
          ) : (
            <span className="text-slate-400 dark:text-zinc-600 italic font-sans text-xs">
              Waiting for input...
            </span>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-indigo-50 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-indigo-700 dark:text-zinc-200 disabled:opacity-40 disabled:hover:bg-indigo-50 disabled:hover:text-indigo-700 disabled:cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Result'}
        </button>

        <button
          type="button"
          onClick={() => onReplaceInput(output, format.name)}
          disabled={!output}
          className="p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="Replace input workbench with this output"
          aria-label="Replace input text"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

