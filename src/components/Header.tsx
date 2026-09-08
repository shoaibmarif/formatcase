import React from 'react';
import { ArrowRightLeft, Sun, Moon, Search, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface HeaderProps {
  theme?: ThemeMode;
  isDark: boolean;
  onThemeToggle: () => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onThemeToggle,
  onOpenCommandPalette,
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl shadow-sm flex items-center justify-center ring-2 ring-indigo-500/20">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                OmniCase Studio
                FormatCase
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-3 h-3" /> 100% In-Browser Privacy
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 hidden xs:block">
              Zero-latency developer case converter & text utility
              Fast developer case formatter & text utility
            </p>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search / Cmd+K Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700 transition-all text-xs group cursor-pointer shadow-2xs"
            title="Search casing formats (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-indigo-500 transition-colors" />
            <span className="hidden md:inline">Find format...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-2xs text-xs font-medium"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
