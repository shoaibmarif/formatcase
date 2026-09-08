import { describe, it, expect } from 'vitest';
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toScreamingSnakeCase,
  toKebabCase,
  toScreamingKebabCase,
  toDotCase,
  toPathCase,
  toHeaderCase,
  toCamelSnakeCase,
  toPascalSnakeCase,
  toTitleCase,
  toSentenceCase,
  toUpperCase,
  toLowerCase,
  toCapitalizedCase,
  toAlternatingCase,
  toInverseCase,
  toSlugify,
} from '../utils/formatters';

describe('Formatters Engine (All 18 Formats + Slugify)', () => {
  const sample = 'user account identifier';

  it('1. camelCase', () => {
    expect(toCamelCase(sample)).toBe('userAccountIdentifier');
    expect(toCamelCase('XML_HTTP_REQUEST')).toBe('xmlHttpRequest');
    expect(toCamelCase('parse_JSON_response')).toBe('parseJsonResponse');
  });

  it('2. PascalCase', () => {
    expect(toPascalCase(sample)).toBe('UserAccountIdentifier');
    expect(toPascalCase('xml_http_request')).toBe('XmlHttpRequest');
  });

  it('3. snake_case', () => {
    expect(toSnakeCase(sample)).toBe('user_account_identifier');
    expect(toSnakeCase('userAccountId')).toBe('user_account_id');
    expect(toSnakeCase('XMLHttpRequest')).toBe('xml_http_request');
    expect(toSnakeCase('user_id_v2')).toBe('user_id_v2');
  });

  it('4. SCREAMING_SNAKE_CASE', () => {
    expect(toScreamingSnakeCase(sample)).toBe('USER_ACCOUNT_IDENTIFIER');
    expect(toScreamingSnakeCase('userAccountId')).toBe('USER_ACCOUNT_ID');
  });

  it('5. kebab-case', () => {
    expect(toKebabCase(sample)).toBe('user-account-identifier');
    expect(toKebabCase('UserAccountId')).toBe('user-account-id');
  });

  it('6. SCREAMING-KEBAB-CASE', () => {
    expect(toScreamingKebabCase(sample)).toBe('USER-ACCOUNT-IDENTIFIER');
    expect(toScreamingKebabCase('userAccountId')).toBe('USER-ACCOUNT-ID');
  });

  it('7. dot.case', () => {
    expect(toDotCase(sample)).toBe('user.account.identifier');
    expect(toDotCase('UserAccountId')).toBe('user.account.id');
  });

  it('8. path/case', () => {
    expect(toPathCase(sample)).toBe('user/account/identifier');
    expect(toPathCase('UserAccountId')).toBe('user/account/id');
  });

  it('9. Header-Case', () => {
    expect(toHeaderCase(sample)).toBe('User-Account-Identifier');
    expect(toHeaderCase('x_auth_token')).toBe('X-Auth-Token');
  });

  it('10. camel_Snake_Case', () => {
    expect(toCamelSnakeCase(sample)).toBe('user_Account_Identifier');
    expect(toCamelSnakeCase('userAccountId')).toBe('user_Account_Id');
  });

  it('11. Pascal_Snake_Case', () => {
    expect(toPascalSnakeCase(sample)).toBe('User_Account_Identifier');
    expect(toPascalSnakeCase('userAccountId')).toBe('User_Account_Id');
  });

  it('12. Title Case', () => {
    expect(toTitleCase('the quick brown fox jumps over the lazy dog')).toBe(
      'The Quick Brown Fox Jumps over the Lazy Dog'
    );
  });

  it('13. Sentence case', () => {
    expect(toSentenceCase('hello world. this is a test! how are you?')).toBe(
      'Hello world. This is a test! How are you?'
    );
  });

  it('14. UPPERCASE', () => {
    expect(toUpperCase('hello world')).toBe('HELLO WORLD');
  });

  it('15. lowercase', () => {
    expect(toLowerCase('HELLO WORLD')).toBe('hello world');
  });

  it('16. Capitalized Case', () => {
    expect(toCapitalizedCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  it('17. aLtErNaTiNg cAsE', () => {
    expect(toAlternatingCase('hello world')).toBe('hElLo wOrLd');
  });

  it('18. InVeRsE cAsE', () => {
    expect(toInverseCase('Hello World')).toBe('hELLO wORLD');
  });

  it('19. Slugify', () => {
    expect(toSlugify('Café & Crème Brûlée: The Ultimate Guide! 2026')).toBe(
      'cafe-creme-brulee-the-ultimate-guide-2026'
    );
  });
});

