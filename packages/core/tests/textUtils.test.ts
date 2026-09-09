import { describe, it, expect } from 'vitest';
import { computeTextStats, formatBytes, applyPrefixSuffix, cleanText } from '../src/textUtils';

describe('Text Utilities', () => {
  it('should accurately compute character, word, line, and byte stats', () => {
    const text = 'Hello world\nSecond line';
    const stats = computeTextStats(text);
    expect(stats.lines).toBe(2);
    expect(stats.words).toBe(4);
    expect(stats.chars).toBe(23);
    expect(stats.charsNoSpaces).toBe(20);
    expect(stats.bytes).toBe(23);
  });

  it('should format bytes appropriately', () => {
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
  });

  it('should inject prefix and suffix line-by-line', () => {
    const text = 'apple\nbanana\norange';
    const result = applyPrefixSuffix(text, { prefix: "'", suffix: "',", mode: 'lines' });
    expect(result).toBe("'apple',\n'banana',\n'orange',");
  });

  it('should clean duplicate spaces and empty lines', () => {
    const raw = '  hello    world  \n\n\n  foo   bar  ';
    const cleaned = cleanText(raw, {
      trimLines: true,
      collapseSpaces: true,
      removeEmptyLines: true,
    });
    expect(cleaned).toBe('hello world\nfoo bar');
  });
});
