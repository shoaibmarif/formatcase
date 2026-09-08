/**
 * Robust Rule-Based Tokenizer for OmniCase Studio
 * Robust Rule-Based Tokenizer for FormatCase
 * Splits strings into individual words while respecting:
 * - Acronym boundaries (e.g., 'JSONParser' -> ['JSON', 'Parser'])
 * - CamelCase & PascalCase boundaries (e.g., 'helloWorld' -> ['hello', 'World'])
 * - Numeric boundaries adjacent to casing changes
 * - Common code delimiters: underscores, hyphens, dots, slashes, colons, pipes
 * - Preserves international unicode letters and numbers
 */
export function tokenize(input: string): string[] {
  if (!input || input.trim() === '') return [];

  return (
    input
      // 1. Acronym followed by PascalCase (e.g., 'parseHTTPResponse' -> 'parse HTTP Response')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // 2. Lowercase/digit followed by Uppercase (e.g., 'helloWorld' -> 'hello World', 'v2Endpoint' -> 'v2 Endpoint')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // 3. Replace common code delimiters, punctuation, and separators with whitespace
      .replace(/[-_./\\:,|;~#$@%^&*()[\]{}<>+=`"']+/g, ' ')
      // 4. Remove any remaining invalid non-word symbols while preserving unicode letters, numbers, and spaces
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );
}

