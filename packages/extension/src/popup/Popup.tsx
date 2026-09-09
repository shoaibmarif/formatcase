import React, { useState, useMemo } from 'react';
import {
  FORMAT_DEFINITIONS,
  type FormatDefinition,
  computeTextStats,
} from '@formatcase/core';
import {
  Copy,
  Check,
  Search,
  RotateCcw,
  ClipboardPaste,
  ExternalLink,
  Code2,
  Sparkles,
} from 'lucide-react';

export const Popup: React.FC = () => {
  const [input, setInput] = useState<string>('hello world example');
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'developer' | 'natural'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stats = useMemo(() => computeTextStats(input), [input]);

  const filteredFormatters = useMemo(() => {
    return FORMAT_DEFINITIONS.filter((formatter: FormatDefinition) => {
      const matchesSearch =
        formatter.name.toLowerCase().includes(search.toLowerCase()) ||
        formatter.id.toLowerCase().includes(search.toLowerCase()) ||
        formatter.description.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        activeCategory === 'all' ||
        formatter.category === activeCategory ||
        (activeCategory === 'developer' && formatter.category === 'utility');

      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInput(text);
    } catch {
      // Clipboard read fallback
    }
  };

  const handleOpenLink = (url: string) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header with Breathing Space */}
      <header className="flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-sm shadow-indigo-500/25 text-white">
            <Code2 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">FormatCase</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">Instant Case Converter</p>
          </div>
        </div>

        {/* Social & Web Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleOpenLink('https://github.com/shoaibmarif')}
            title="Shoaib M. Arif on GitHub"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </button>

          <button
            onClick={() => handleOpenLink('https://www.linkedin.com/in/shoaibmarif/')}
            title="Shoaib M. Arif on LinkedIn"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0a66c2] bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.68 1.67 1.67 0 0 0 1.68-1.68c0-.92-.76-1.66-1.68-1.66Z" />
            </svg>
          </button>

          <button
            onClick={() => handleOpenLink('https://formatcase.netlify.app/')}
            title="Open Full Web Application (formatcase.netlify.app)"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-indigo-600/80 hover:bg-indigo-600 transition px-2.5 py-1 rounded-lg border border-indigo-500/40 shadow-xs font-medium"
          >
            <span>Web App</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </header>

      {/* Input Workbench with Roomy Padding */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 shrink-0 space-y-3">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to convert..."
            rows={3}
            className="w-full text-xs font-mono bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none transition leading-relaxed"
          />
          {input && (
            <button
              onClick={() => setInput('')}
              title="Clear"
              className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-300 bg-slate-900/80 hover:bg-slate-800 rounded-md p-1 transition border border-slate-800"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>

        {/* Input Bar Controls */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{stats.chars} chars</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{stats.words} words</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{stats.lines} lines</span>
          </div>

          <button
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition text-[11px] font-medium"
          >
            <ClipboardPaste size={12} />
            <span>Paste Clipboard</span>
          </button>
        </div>

        {/* Search & Category Filter with Breathing Room */}
        <div className="flex items-center gap-2.5 pt-1">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 25+ casing formats..."
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
            {(['all', 'developer', 'natural'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-md capitalize transition font-medium ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formats Scroll List with Breathing Room */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 max-h-[350px]">
        {filteredFormatters.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No matching case format found.
          </div>
        ) : (
          filteredFormatters.map((fmt: FormatDefinition) => {
            const formattedValue = input ? fmt.fn(input) : fmt.example;
            const isCopied = copiedId === fmt.id;

            return (
              <div
                key={fmt.id}
                onClick={() => handleCopy(fmt.id, formattedValue)}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition">
                      {fmt.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                      {fmt.category}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs truncate transition ${
                      input ? 'text-slate-100' : 'text-slate-500 italic'
                    }`}
                  >
                    {formattedValue || '—'}
                  </span>
                </div>

                <button
                  type="button"
                  title="Copy result"
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isCopied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-300 group-hover:text-white group-hover:bg-indigo-600'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check size={12} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer with Creator Profiles & Clean Attribution */}
      <footer className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
        <span className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-indigo-400" />
          <span>Right-click web text to format</span>
        </span>
        <div className="flex items-center gap-2">
          <span>By Shoaib M. Arif</span>
          <a
            href="https://github.com/shoaibmarif"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleOpenLink('https://github.com/shoaibmarif');
            }}
            className="hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/shoaibmarif/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleOpenLink('https://www.linkedin.com/in/shoaibmarif/');
            }}
            className="hover:text-[#0a66c2] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};
