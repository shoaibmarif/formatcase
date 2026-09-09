import { describe, it, expect } from 'vitest';
import { tokenize } from '../src/tokenizer';

describe('Tokenizer Engine', () => {
  it('should return an empty array for empty or whitespace strings', () => {
    expect(tokenize('')).toEqual([]);
    expect(tokenize('   ')).toEqual([]);
  });

  it('should split basic space-separated words', () => {
    expect(tokenize('hello world')).toEqual(['hello', 'world']);
  });

  it('should split camelCase words', () => {
    expect(tokenize('userAccountId')).toEqual(['user', 'Account', 'Id']);
  });

  it('should split PascalCase words', () => {
    expect(tokenize('UserAccountId')).toEqual(['User', 'Account', 'Id']);
  });

  it('should handle acronyms followed by PascalCase (e.g. XMLHttpRequest)', () => {
    expect(tokenize('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request']);
  });

  it('should handle complex acronym strings (e.g. parseHTTPResponseJSON, parseJSONResponse)', () => {
    expect(tokenize('parseHTTPResponseJSON')).toEqual(['parse', 'HTTP', 'Response', 'JSON']);
    expect(tokenize('parseJSONResponse')).toEqual(['parse', 'JSON', 'Response']);
  });

  it('should handle standard code delimiters (_, -, ., /, \\)', () => {
    expect(tokenize('user_account_id')).toEqual(['user', 'account', 'id']);
    expect(tokenize('user-account-id')).toEqual(['user', 'account', 'id']);
    expect(tokenize('user.account.id')).toEqual(['user', 'account', 'id']);
    expect(tokenize('user/account/id')).toEqual(['user', 'account', 'id']);
    expect(tokenize('user\\account\\id')).toEqual(['user', 'account', 'id']);
  });

  it('should handle number boundaries in identifiers (e.g. user_id_v2, clientIPAddress)', () => {
    expect(tokenize('user_id_v2')).toEqual(['user', 'id', 'v2']);
    expect(tokenize('clientIPAddress')).toEqual(['client', 'IP', 'Address']);
  });

  it('should handle punctuation and symbols cleanly', () => {
    expect(tokenize('get(user, [profile])')).toEqual(['get', 'user', 'profile']);
  });
});
