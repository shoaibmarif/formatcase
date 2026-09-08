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
    id: 'api_response',
    label: 'API JSON Payload',
    description: 'CamelCase API attributes with acronyms',
    text: 'parseHTTPResponseJSON\nuserAuthenticationToken\nclientIPAddressIPv6\nmaxConnectionsTimeoutSec',
  },
  {
    id: 'db_columns',
    label: 'Database Columns',
    description: 'Snake case database schema columns',
    text: 'first_name\nlast_name\nemail_address\nis_verified_account\ncreated_at_timestamp',
  },
  {
    id: 'env_vars',
    label: 'Environment Variables',
    description: 'SCREAMING_SNAKE config keys',
    text: 'DATABASE_URL\nREDIS_CACHE_PORT\nJWT_SECRET_KEY\nAWS_S3_BUCKET_NAME',
  },
  {
    id: 'natural_phrase',
    label: 'Editorial Sentence',
    description: 'Natural language title and sentence',
    text: 'The quick brown fox jumps over the lazy dog.\nBuilding modern web applications with React 19 and Tailwind CSS.',
  },
  {
    id: 'url_slugs',
    label: 'Blog Post & URLs',
    description: 'Blog post headings and special characters',
    text: '10 Tips for Mastering TypeScript in 2026!\nUnderstanding JavaScript Asynchronous Programming & Web Workers',
  },
];

