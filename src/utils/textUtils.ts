export interface TextStats {
  chars: number;
  charsNoSpaces: number;
  words: number;
  lines: number;
  bytes: number;
}

export function computeTextStats(text: string): TextStats {
  if (!text) {
    return {
      chars: 0,
      charsNoSpaces: 0,
      words: 0,
      lines: 0,
      bytes: 0,
    };
  }

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  // UTF-8 byte length calculation
  const bytes = new TextEncoder().encode(text).length;

  return {
    chars,
    charsNoSpaces,
    words,
    lines,
    bytes,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface InjectionOptions {
  prefix: string;
  suffix: string;
  mode: 'lines' | 'words';
}

export function applyPrefixSuffix(text: string, options: InjectionOptions): string {
  const { prefix, suffix, mode } = options;
  if (!prefix && !suffix) return text;

  if (mode === 'lines') {
    return text
      .split('\n')
      .map((line) => (line.length > 0 ? `${prefix}${line}${suffix}` : line))
      .join('\n');
  }

  // mode === 'words'
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token) || !token) return token;
      return `${prefix}${token}${suffix}`;
    })
    .join('');
}

export interface CleanerOptions {
  trimLines?: boolean;
  collapseSpaces?: boolean;
  removeEmptyLines?: boolean;
  removeDelimiters?: boolean;
}

export function cleanText(text: string, options: CleanerOptions): string {
  let result = text;

  if (options.trimLines) {
    result = result
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }

  if (options.collapseSpaces) {
    result = result.replace(/[ \t]+/g, ' ');
  }

  if (options.removeEmptyLines) {
    result = result
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .join('\n');
  }

  if (options.removeDelimiters) {
    result = result.replace(/[-_./\\:,|;]+/g, ' ');
  }

  return result;
}

export interface SamplePreset {
  id: string;
  label: string;
  description: string;
  text: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'natural_phrase',
    label: 'Normal Sentence',
    description: 'Everyday English text to try out all formats',
    text: 'welcome to formatcase\nuser account settings\nthe quick brown fox jumps over the lazy dog',
  },
  {
    id: 'user_fields',
    label: 'Account & Settings',
    description: 'Common account and form field names',
    text: 'first name\nlast name\nemail address\nprofile picture url\nis active member',
  },
  {
    id: 'url_slugs',
    label: 'Blog & Article Titles',
    description: 'Post headlines with punctuation and symbols',
    text: '10 Simple Tips for Web Developers in 2026!\nHow to Build Fast & Responsive Apps with React',
  },
  {
    id: 'api_response',
    label: 'Code & API Names',
    description: 'Developer variables with acronyms',
    text: 'parseHTTPResponseJSON\nuserAuthenticationToken\nclientIPAddress\nmaxRetryCount',
  },
  {
    id: 'env_vars',
    label: 'Config & Environment',
    description: 'System keys and server constants',
    text: 'DATABASE_URL\nCACHE_PORT\nJWT_SECRET_KEY\nAPP_ENVIRONMENT',
  },
];

