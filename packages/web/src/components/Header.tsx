import React from 'react';
import { ArrowRightLeft, Sun, Moon, Search } from 'lucide-react';
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
    <header className="border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[4rem] sm:h-20 py-2 sm:py-0 flex items-center justify-between gap-2 sm:gap-6">
        {/* Logo & Title */}
        <a
          href="https://formatcase.netlify.app/"
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group hover:opacity-95 transition-opacity cursor-pointer"
          title="FormatCase Home"
        >
          <div className="p-2.5 sm:p-3 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center ring-2 sm:ring-4 ring-indigo-500/10 shrink-0 group-hover:scale-105 transition-transform">
            <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              FormatCase
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 -mt-0.5 hidden md:block">
              Clean text and developer case formatting
            </p>
          </div>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Search Button (Icon on mobile, Full button with label on desktop) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700 transition-all text-xs group cursor-pointer shadow-2xs font-medium"
            title="Search casing formats"
            aria-label="Search casing formats"
          >
            <Search className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
            <span className="hidden sm:inline">Search formats...</span>
          </button>

          {/* Social Links: GitHub & LinkedIn (Hidden on mobile, visible on tablet/desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 border-r border-slate-200 dark:border-zinc-800 pr-3">
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all shadow-2xs"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all shadow-2xs"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
              </svg>
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-2xs text-xs font-medium"
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
