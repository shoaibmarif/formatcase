import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputWorkbench } from './components/InputWorkbench';
import { PreviewGrid } from './components/PreviewGrid';
import { UtilityPanel } from './components/UtilityPanel';
import { CommandPalette } from './components/CommandPalette';
import { SeoContent } from './components/SeoContent';
import { Toast, ToastMessage } from './components/Toast';
import { useCaseConverter } from './hooks/useCaseConverter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { SamplePreset } from './utils/textUtils';

export default function App() {
  const [input, setInput] = useState<string>('welcome to formatcase\nuser account settings\nthe quick brown fox jumps');
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [batchMode, setBatchMode] = useLocalStorage<boolean>('formatcase_batch_mode', true);
  const [favorites, setFavorites] = useLocalStorage<string[]>('formatcase_favorites', [
    'camel',
    'pascal',
    'snake',
    'screaming_snake',
    'kebab',
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { theme, isDark, toggleTheme } = useTheme();
  const { transform } = useCaseConverter(input, batchMode);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateInput = (newVal: string, actionName?: string) => {
    setPreviousInput(input);
    setInput(newVal);
    if (actionName) {
      addToast(actionName, 'info');
    }
  };

  const handleApplyFormat = (formatter: (val: string) => string, name: string) => {
    if (!input) return;
    setPreviousInput(input);
    if (batchMode) {
      const transformed = input
        .split('\n')
        .map((line) => (line.length > 0 ? formatter(line) : ''))
        .join('\n');
      setInput(transformed);
    } else {
      setInput(formatter(input));
    }
    addToast(`Applied ${name} in-place`, 'success');
  };

  const handleReplaceInput = (val: string, formatName: string) => {
    setPreviousInput(input);
    setInput(val);
    addToast(`Replaced workbench with ${formatName} output`, 'info');
  };

  const handleRestorePrevious = () => {
    if (previousInput !== null) {
      const temp = input;
      setInput(previousInput);
      setPreviousInput(temp);
      addToast('Reverted input to previous state', 'info');
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleLoadPreset = (preset: SamplePreset) => {
    setPreviousInput(input);
    setInput(preset.text);
    addToast(`Loaded ${preset.label} sample`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      {/* Navbar Header */}
      <Header
        theme={theme}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* Input Workbench */}
        <InputWorkbench
          input={input}
          onChangeInput={setInput}
          batchMode={batchMode}
          onToggleBatchMode={() => setBatchMode(!batchMode)}
          onApplyFormat={handleApplyFormat}
          onLoadPreset={handleLoadPreset}
          onNotifyCopy={addToast}
          previousInput={previousInput}
          onRestorePrevious={handleRestorePrevious}
        />

        {/* Advanced Delimiter & Utilities Panel */}
        <UtilityPanel input={input} onUpdateInput={handleUpdateInput} />

        {/* Real-time Formats Preview Grid */}
        <PreviewGrid
          transform={transform}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onReplaceInput={handleReplaceInput}
          onNotifyCopy={addToast}
        />

        {/* SEO Semantic Cheatsheet & Conventions Guide */}
        <SeoContent onNotifyCopy={addToast} />
      </main>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        input={input}
        onApplyFormat={handleApplyFormat}
        onNotifyCopy={addToast}
      />

      {/* Toast Feedback System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-zinc-800 py-6 mt-12 bg-white dark:bg-zinc-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-zinc-300">OmniCase Studio</span>
            <span>•</span>
            <span>Free & Private Online Case Converter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
