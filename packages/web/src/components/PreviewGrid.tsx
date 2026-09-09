import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Sparkles } from 'lucide-react';
import { FORMAT_DEFINITIONS } from '../utils/formatters';
import { FormatCard } from './FormatCard';

interface PreviewGridProps {
  transform: (fn: (val: string) => string) => string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onReplaceInput: (val: string, formatName: string) => void;
  onNotifyCopy: (msg: string) => void;
}

export const PreviewGrid: React.FC<PreviewGridProps> = ({
  transform,
  favorites,
  onToggleFavorite,
  onReplaceInput,
  onNotifyCopy,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'developer' | 'natural' | 'utility' | 'favorites'>('all');

  const filteredFormats = useMemo(() => {
    return FORMAT_DEFINITIONS.filter((fmt) => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(fmt.id)) return false;
      } else if (activeCategory !== 'all' && fmt.category !== activeCategory) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = fmt.name.toLowerCase().includes(query);
        const matchesDesc = fmt.description.toLowerCase().includes(query);
        const matchesCat = fmt.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    }).sort((a, b) => {
      // If we are not specifically viewing favorites tab, still float favorites to the top
      if (activeCategory !== 'favorites') {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
      }
      return 0;
    });
  }, [searchTerm, activeCategory, favorites]);

  const categoryCounts = useMemo(() => {
    return {
      all: FORMAT_DEFINITIONS.length,
      developer: FORMAT_DEFINITIONS.filter((f) => f.category === 'developer').length,
      natural: FORMAT_DEFINITIONS.filter((f) => f.category === 'natural').length,
      utility: FORMAT_DEFINITIONS.filter((f) => f.category === 'utility').length,
      favorites: favorites.length,
    };
  }, [favorites]);

  return (
    <section className="space-y-6">
      {/* Bar: Title, Search, and Category Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100">
              Live Casing Grid ({filteredFormats.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Real-time synchronized transformations across 18+ formats
            </p>
          </div>
        </div>

        {/* Search inside grid */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter casing formats..."
            className="w-full pl-10 pr-8 py-2 rounded-2xl text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          All ({categoryCounts.all})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('developer')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeCategory === 'developer'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          Code & Variables ({categoryCounts.developer})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('natural')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeCategory === 'natural'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          Text & Titles ({categoryCounts.natural})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('utility')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeCategory === 'utility'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          Web Links ({categoryCounts.utility})
        </button>

        {categoryCounts.favorites > 0 && (
          <button
            type="button"
            onClick={() => setActiveCategory('favorites')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'favorites'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Favorites ({categoryCounts.favorites})
          </button>
        )}
      </div>

      {/* Grid of cards */}
      {filteredFormats.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
          <Filter className="w-9 h-9 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">No matching formats found</p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
            className="mt-4 px-4 py-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredFormats.map((format) => (
            <FormatCard
              key={format.id}
              format={format}
              output={transform(format.fn)}
              isFavorite={favorites.includes(format.id)}
              onToggleFavorite={onToggleFavorite}
              onReplaceInput={onReplaceInput}
              onNotifyCopy={onNotifyCopy}
            />
          ))}
        </div>
      )}
    </section>
  );
};
