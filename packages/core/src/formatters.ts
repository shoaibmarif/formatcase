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

// 2. PascalCase / StudlyCaps (UserAccountId)
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

// 5. kebab-case / lower-kebab-case (user-account-id)
export function toKebabCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('-');
}

// 6. SCREAMING-KEBAB-CASE / COBOL-CASE / UPPER-KEBAB-CASE (USER-ACCOUNT-ID)
export function toScreamingKebabCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toUpperCase()).join('-');
}

// 7. Train-Case / Header-Case (User-Account-Id)
export function toTrainCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('-');
}
export const toHeaderCase = toTrainCase;

// 8. dot.case (user.account.id)
export function toDotCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('.');
}

// 9. path/case / Slash Case (user/account/id)
export function toPathCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('/');
}
export const toSlashCase = toPathCase;

// 10. lowercase (hello world)
export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

// 11. UPPERCASE (HELLO WORLD)
export function toUpperCase(input: string): string {
  return input.toUpperCase();
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

// 14. Pascal_Snake_Case (User_Account_Id)
export function toPascalSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('_');
}

// 15. camel_Snake_Case (user_Account_Id)
export function toCamelSnakeCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('_');
}

// 16. Flatcase (helloworld)
export function toFlatcase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('');
}

// 17. UPPERFLATCASE (HELLOWORLD)
export function toUpperFlatcase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toUpperCase()).join('');
}

// 18. Reverse Pascal Case (hELLOWORLD)
export function toReversePascalCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  const flat = words.map((w) => w.toUpperCase()).join('');
  if (flat.length === 0) return '';
  return flat.charAt(0).toLowerCase() + flat.slice(1);
}

// 19. Hash Case (hello#world)
export function toHashCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('#');
}

// 20. mACRO_CASE (hello_WORLD)
export function toMacroCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.toUpperCase()))
    .join('_');
}

// 21. Hungarian notation (strName, iCount)
export function toHungarianNotation(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';

  const firstWord = words[0].toLowerCase();
  let prefix = 'str';
  let restWords = words;

  const strictHungarianPrefixes = new Set(['str', 'sz', 'i', 'n', 'fn', 'cb', 'b', 'arr', 'obj', 'btn', 'txt', 'lbl', 'ptr']);

  if (strictHungarianPrefixes.has(firstWord) && words.length > 1) {
    prefix = firstWord;
    restWords = words.slice(1);
  } else if (/^(count|index|id|num|number|length|size|age|quantity|total|limit|offset)$/i.test(firstWord)) {
    prefix = 'i';
  } else if (/^(is|has|can|should|enabled|active|visible|valid|check)$/i.test(firstWord)) {
    prefix = 'b';
  } else if (/^(list|array|items|collection)$/i.test(firstWord)) {
    prefix = 'arr';
  } else if (/^(fn|func|callback|handler|action)$/i.test(firstWord)) {
    prefix = 'fn';
  }

  const pascalRest = restWords
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');

  return prefix + pascalRest;
}

// 22. BiCapitalization (iPhone, eBay)
export function toBiCapitalization(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  if (words.length === 1) {
    const single = words[0];
    if (single.length <= 2) return single.toLowerCase();
    return single.charAt(0).toLowerCase() + single.charAt(1).toUpperCase() + single.slice(2).toLowerCase();
  }
  return (
    words[0].toLowerCase() +
    words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
  );
}

// 23. Capitalized Case / Start Case (Hello World Example)
export function toCapitalizedCase(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return '';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// 24. aLtErNaTiNg cAsE / sPoNgEbOb (hElLo wOrLd)
export function toAlternatingCase(input: string): string {
  return input
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join('');
}

// 25. InVeRsE cAsE (hELLO wORLD -> Hello World)
export function toInverseCase(input: string): string {
  return input
    .split('')
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('');
}

// 26. Slugify (clean-url-safe-slug-with-diacritics-removed)
export function toSlugify(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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
    description: 'Starts lowercase, then capitalizes each next word (e.g. helloWorld).',
    example: 'helloWorld',
    fn: toCamelCase,
  },
  {
    id: 'pascal',
    name: 'PascalCase',
    category: 'developer',
    description: 'Capitalizes the first letter of every word (e.g. HelloWorld).',
    example: 'HelloWorld',
    fn: toPascalCase,
  },
  {
    id: 'snake',
    name: 'snake_case',
    category: 'developer',
    description: 'Small letters joined with underscores (e.g. hello_world).',
    example: 'hello_world',
    fn: toSnakeCase,
  },
  {
    id: 'screaming_snake',
    name: 'SCREAMING_SNAKE_CASE',
    category: 'developer',
    description: 'ALL CAPS letters connected with underscores (e.g. HELLO_WORLD).',
    example: 'HELLO_WORLD',
    fn: toScreamingSnakeCase,
  },
  {
    id: 'kebab',
    name: 'kebab-case',
    category: 'developer',
    description: 'Small letters joined with hyphens (e.g. hello-world).',
    example: 'hello-world',
    fn: toKebabCase,
  },
  {
    id: 'train',
    name: 'Train-Case',
    category: 'developer',
    description: 'Capitalized words joined with hyphens (e.g. Hello-World).',
    example: 'Hello-World',
    fn: toTrainCase,
  },
  {
    id: 'dot',
    name: 'dot.case',
    category: 'developer',
    description: 'Small letters separated by dots (e.g. hello.world).',
    example: 'hello.world',
    fn: toDotCase,
  },
  {
    id: 'path',
    name: 'path/case',
    category: 'developer',
    description: 'Words separated by slashes (e.g. hello/world).',
    example: 'hello/world',
    fn: toPathCase,
  },
  {
    id: 'slash',
    name: 'Slash Case',
    category: 'developer',
    description: 'Same as path/case, words separated by forward slashes.',
    example: 'hello/world',
    fn: toSlashCase,
  },
  {
    id: 'hash',
    name: 'Hash Case',
    category: 'developer',
    description: 'Small letters joined by hash symbols (e.g. hello#world).',
    example: 'hello#world',
    fn: toHashCase,
  },
  {
    id: 'pascal_snake',
    name: 'Pascal_Snake_Case',
    category: 'developer',
    description: 'Capitalized words joined with underscores (e.g. Hello_World).',
    example: 'Hello_World',
    fn: toPascalSnakeCase,
  },
  {
    id: 'camel_snake',
    name: 'camel_Snake_Case',
    category: 'developer',
    description: 'First word lowercase, capitalized words joined with underscores (e.g. hello_World).',
    example: 'hello_World',
    fn: toCamelSnakeCase,
  },
  {
    id: 'cobol',
    name: 'COBOL-CASE',
    category: 'developer',
    description: 'ALL CAPS letters joined with hyphens (e.g. HELLO-WORLD).',
    example: 'HELLO-WORLD',
    fn: toScreamingKebabCase,
  },
  {
    id: 'upper_kebab',
    name: 'UPPER-KEBAB-CASE',
    category: 'developer',
    description: 'ALL CAPS letters joined with hyphens (e.g. HELLO-WORLD).',
    example: 'HELLO-WORLD',
    fn: toScreamingKebabCase,
  },
  {
    id: 'lower_kebab',
    name: 'lower-kebab-case',
    category: 'developer',
    description: 'Small letters joined with hyphens (e.g. hello-world).',
    example: 'hello-world',
    fn: toKebabCase,
  },
  {
    id: 'studly',
    name: 'StudlyCaps',
    category: 'developer',
    description: 'Capitalizes the first letter of each word without spaces (HelloWorld).',
    example: 'HelloWorld',
    fn: toPascalCase,
  },
  {
    id: 'bi_capitalization',
    name: 'BiCapitalization',
    category: 'developer',
    description: 'Brand casing with internal capital letter (e.g. iPhone, eBay).',
    example: 'iPhone',
    fn: toBiCapitalization,
  },
  {
    id: 'hungarian',
    name: 'Hungarian notation',
    category: 'developer',
    description: 'Prefixes variable with data type (e.g. strName, iCount).',
    example: 'strName',
    fn: toHungarianNotation,
  },
  {
    id: 'macro',
    name: 'mACRO_CASE',
    category: 'developer',
    description: 'First word lowercase, remaining words in UPPERCASE underscores (e.g. hello_WORLD).',
    example: 'hello_WORLD',
    fn: toMacroCase,
  },
  {
    id: 'flat',
    name: 'Flatcase',
    category: 'developer',
    description: 'All lowercase characters concatenated with no spaces (e.g. helloworld).',
    example: 'helloworld',
    fn: toFlatcase,
  },
  {
    id: 'reverse_pascal',
    name: 'Reverse Pascal Case',
    category: 'developer',
    description: 'First letter lowercase followed by all uppercase letters (e.g. hELLOWORLD).',
    example: 'hELLOWORLD',
    fn: toReversePascalCase,
  },

  // Natural Language & Editorial Formats
  {
    id: 'title',
    name: 'Title Case',
    category: 'natural',
    description: 'Capitalizes major words like a book title (e.g. Hello World).',
    example: 'Hello World',
    fn: toTitleCase,
  },
  {
    id: 'sentence',
    name: 'Sentence case',
    category: 'natural',
    description: 'Capitalizes only the very first letter of the sentence (e.g. Hello world).',
    example: 'Hello world',
    fn: toSentenceCase,
  },
  {
    id: 'lower',
    name: 'lowercase',
    category: 'natural',
    description: 'Turns every letter into small letters (e.g. helloworld).',
    example: 'hello world',
    fn: toLowerCase,
  },
  {
    id: 'upper',
    name: 'UPPERCASE',
    category: 'natural',
    description: 'Turns every letter into CAPITAL letters (e.g. HELLOWORLD).',
    example: 'HELLO WORLD',
    fn: toUpperCase,
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
