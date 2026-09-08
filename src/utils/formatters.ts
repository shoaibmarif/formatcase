import { tokenize } from './tokenizer';

export { tokenize };

// 1. camelCase (userAccountId)
export function toCamelCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
}

// 2. PascalCase (UserAccountId)
export function toPascalCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

// 3. snake_case (user_account_id)
export function toSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('_');
}

// 4. SCREAMING_SNAKE_CASE (USER_ACCOUNT_ID)
export function toScreamingSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toUpperCase()).join('_');
}

// 5. kebab-case (user-account-id)
export function toKebabCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('-');
}

// 6. SCREAMING-KEBAB-CASE (USER-ACCOUNT-ID)
export function toScreamingKebabCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toUpperCase()).join('-');
}

// 7. dot.case (user.account.id)
export function toDotCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('.');
}

// 8. path/case (user/account/id)
export function toPathCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('/');
}

// 9. Header-Case / Train-Case (User-Account-Id)
export function toHeaderCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('-');
}

// 10. camel_Snake_Case (user_Account_Id)
export function toCamelSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('_');
}

// 11. Pascal_Snake_Case (User_Account_Id)
export function toPascalSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('_');
}

// 12. Title Case (The Quick Brown Fox Jumps)
export function toTitleCase(input: string): string {
  if (!input || input.trim() === '') return '';
  const minorWords = new Set([
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'if', 'in', 
    'into', 'nor', 'of', 'off', 'on', 'onto', 'or', 'out', 'over', 'so', 
    'the', 'to', 'up', 'via', 'with', 'yet'
  ]);
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (i > 0 && i < words.length - 1 && minorWords.has(lower)) {
        return lower;
      }
      return w.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

// 13. Sentence case (The quick brown fox. It jumps high.)
export function toSentenceCase(input: string): string {
  if (!input) return '';
  // Split on sentence boundaries (period, exclamation, question mark followed by space or end)
  const segments = input.split(/([.?!]\s*)/g);
  return segments
    .map((s) => {
      if (/^[.?!]\s*$/.test(s)) return s;
      const trimmed = s.trim();
      if (!trimmed) return s;
      const leadingSpace = s.match(/^\s*/)?.[0] || '';
      const trailingSpace = s.match(/\s*$/)?.[0] || '';
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      return leadingSpace + capitalized + trailingSpace;
    })
    .join('');
}

// 14. UPPERCASE (HELLO WORLD)
export function toUpperCase(input: string): string {
  return input.toUpperCase();
}

// 15. lowercase (hello world)
export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

// 16. Capitalized Case / Start Case (Hello World Example)
export function toCapitalizedCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// 17. aLtErNaTiNg cAsE / sPoNgEbOb (hElLo wOrLd)
export function toAlternatingCase(input: string): string {
  return input
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join('');
}

// 18. InVeRsE cAsE (hELLO wORLD -> Hello World)
export function toInverseCase(input: string): string {
  return input
    .split('')
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('');
}

// 19. Slugify (clean-url-safe-slug-with-diacritics-removed)
export function toSlugify(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics / accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface FormatDefinition {
  id: string;
  name: string;
  category: 'developer' | 'natural' | 'utility';
  description: string;
  example: string;
  fn: (input: string) => string;
}

export const FORMAT_DEFINITIONS: FormatDefinition[] = [
  // Developer Formats
  {
    id: 'camel',
    name: 'camelCase',
    category: 'developer',
    description: 'Starts lowercase, then capitalizes each next word (e.g. userProfile).',
    example: 'userAccountId',
    fn: toCamelCase,
  },
  {
    id: 'pascal',
    name: 'PascalCase',
    category: 'developer',
    description: 'Capitalizes the first letter of every word (e.g. UserProfile).',
    example: 'UserAccountId',
    fn: toPascalCase,
  },
  {
    id: 'snake',
    name: 'snake_case',
    category: 'developer',
    description: 'Small letters joined with underscores (e.g. user_profile).',
    example: 'user_account_id',
    fn: toSnakeCase,
  },
  {
    id: 'screaming_snake',
    name: 'SCREAMING_SNAKE_CASE',
    category: 'developer',
    description: 'ALL CAPS joined with underscores (e.g. USER_PROFILE).',
    example: 'USER_ACCOUNT_ID',
    fn: toScreamingSnakeCase,
  },
  {
    id: 'kebab',
    name: 'kebab-case',
    category: 'developer',
    description: 'Small letters joined with hyphens (e.g. user-profile).',
    example: 'user-account-id',
    fn: toKebabCase,
  },
  {
    id: 'screaming_kebab',
    name: 'SCREAMING-KEBAB-CASE',
    category: 'developer',
    description: 'ALL CAPS joined with hyphens (e.g. USER-PROFILE).',
    example: 'USER-ACCOUNT-ID',
    fn: toScreamingKebabCase,
  },
  {
    id: 'dot',
    name: 'dot.case',
    category: 'developer',
    description: 'Small letters separated by dots (e.g. user.profile).',
    example: 'user.account.id',
    fn: toDotCase,
  },
  {
    id: 'path',
    name: 'path/case',
    category: 'developer',
    description: 'Words separated by slashes (e.g. user/profile).',
    example: 'user/account/id',
    fn: toPathCase,
  },
  {
    id: 'header',
    name: 'Header-Case',
    category: 'developer',
    description: 'Capitalized words joined with hyphens (e.g. User-Profile).',
    example: 'User-Account-Id',
    fn: toHeaderCase,
  },
  {
    id: 'camel_snake',
    name: 'camel_Snake_Case',
    category: 'developer',
    description: 'Starts lowercase, then capitalizes words with underscores.',
    example: 'user_Account_Id',
    fn: toCamelSnakeCase,
  },
  {
    id: 'pascal_snake',
    name: 'Pascal_Snake_Case',
    category: 'developer',
    description: 'Capitalized words joined with underscores (e.g. User_Profile).',
    example: 'User_Account_Id',
    fn: toPascalSnakeCase,
  },

  // Natural Language & Editorial Formats
  {
    id: 'title',
    name: 'Title Case',
    category: 'natural',
    description: 'Capitalizes headline words nicely (e.g. The Quick Brown Fox).',
    example: 'The Quick Brown Fox Jumps',
    fn: toTitleCase,
  },
  {
    id: 'sentence',
    name: 'Sentence case',
    category: 'natural',
    description: 'Normal sentence style with first letter capitalized.',
    example: 'The quick brown fox. It jumps high.',
    fn: toSentenceCase,
  },
  {
    id: 'upper',
    name: 'UPPERCASE',
    category: 'natural',
    description: 'Turns every letter into CAPITAL letters.',
    example: 'HELLO WORLD',
    fn: toUpperCase,
  },
  {
    id: 'lower',
    name: 'lowercase',
    category: 'natural',
    description: 'Turns every letter into small letters.',
    example: 'hello world',
    fn: toLowerCase,
  },
  {
    id: 'capitalized',
    name: 'Capitalized Case',
    category: 'natural',
    description: 'Capitalizes the first letter of every single word.',
    example: 'Hello World Example',
    fn: toCapitalizedCase,
  },
  {
    id: 'alternating',
    name: 'aLtErNaTiNg cAsE',
    category: 'natural',
    description: 'Alternates small and capital letters (meme style).',
    example: 'hElLo wOrLd',
    fn: toAlternatingCase,
  },
  {
    id: 'inverse',
    name: 'InVeRsE cAsE',
    category: 'natural',
    description: 'Flips capital letters to small, and small letters to capital.',
    example: 'iNvErSe cAsE',
    fn: toInverseCase,
  },

  // Utility
  {
    id: 'slug',
    name: 'slugify',
    category: 'utility',
    description: 'Turns text into a clean web link without spaces or symbols.',
    example: 'clean-url-safe-slug',
    fn: toSlugify,
  },
];
