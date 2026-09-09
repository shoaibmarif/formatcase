import React from 'react';
import { Zap } from 'lucide-react';
import {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
  toScreamingSnakeCase,
  toTitleCase,
  toUpperCase,
  toLowerCase,
  toSlugify,
} from '../utils/formatters';

interface QuickActionsProps {
  onApplyFormat: (formatter: (val: string) => string, name: string) => void;
  disabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onApplyFormat, disabled }) => {
  const quickOptions = [
    { label: 'camelCase', fn: toCamelCase },
    { label: 'snake_case', fn: toSnakeCase },
    { label: 'kebab-case', fn: toKebabCase },
    { label: 'PascalCase', fn: toPascalCase },
    { label: 'SCREAMING_SNAKE', fn: toScreamingSnakeCase },
    { label: 'Title Case', fn: toTitleCase },
    { label: 'UPPERCASE', fn: toUpperCase },
    { label: 'lowercase', fn: toLowerCase },
    { label: 'slugify', fn: toSlugify },
  ];

  return (
    <div className="flex flex-col gap-2.5 pt-1">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        <span>Quick In-Place Transform:</span>
        <span className="text-[11px] font-normal text-slate-400 dark:text-zinc-500">
          (Format text directly in the box above)
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {quickOptions.map((opt) => (
          <button
            key={opt.label}
            type="button"
            disabled={disabled}
            onClick={() => onApplyFormat(opt.fn, opt.label)}
            className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
