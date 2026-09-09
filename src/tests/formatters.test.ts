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
  toSlashCase,
  toTrainCase,
  toHeaderCase,
  toCamelSnakeCase,
  toPascalSnakeCase,
  toTitleCase,
  toSentenceCase,
  toUpperCase,
  toLowerCase,
  toFlatcase,
  toReversePascalCase,
  toHashCase,
  toMacroCase,
  toHungarianNotation,
  toBiCapitalization,
  toCapitalizedCase,
  toAlternatingCase,
  toInverseCase,
  toSlugify,
} from '../utils/formatters';

describe('Formatters Engine (All 25+ Formats + Slugify)', () => {
  const sample = 'hello world';
  const devSample = 'user account identifier';

  it('1. camelCase', () => {
    expect(toCamelCase(sample)).toBe('helloWorld');
    expect(toCamelCase(devSample)).toBe('userAccountIdentifier');
    expect(toCamelCase('XML_HTTP_REQUEST')).toBe('xmlHttpRequest');
    expect(toCamelCase('parse_JSON_response')).toBe('parseJsonResponse');
  });

  it('2. PascalCase & StudlyCaps', () => {
    expect(toPascalCase(sample)).toBe('HelloWorld');
    expect(toPascalCase(devSample)).toBe('UserAccountIdentifier');
    expect(toPascalCase('xml_http_request')).toBe('XmlHttpRequest');
  });

  it('3. snake_case', () => {
    expect(toSnakeCase(sample)).toBe('hello_world');
    expect(toSnakeCase(devSample)).toBe('user_account_identifier');
    expect(toSnakeCase('userAccountId')).toBe('user_account_id');
    expect(toSnakeCase('XMLHttpRequest')).toBe('xml_http_request');
  });

  it('4. SCREAMING_SNAKE_CASE', () => {
    expect(toScreamingSnakeCase(sample)).toBe('HELLO_WORLD');
    expect(toScreamingSnakeCase(devSample)).toBe('USER_ACCOUNT_IDENTIFIER');
  });

  it('5. kebab-case & lower-kebab-case', () => {
    expect(toKebabCase(sample)).toBe('hello-world');
    expect(toKebabCase(devSample)).toBe('user-account-identifier');
  });

  it('6. Train-Case & Header-Case', () => {
    expect(toTrainCase(sample)).toBe('Hello-World');
    expect(toHeaderCase(sample)).toBe('Hello-World');
    expect(toTrainCase('x_auth_token')).toBe('X-Auth-Token');
  });

  it('7. dot.case', () => {
    expect(toDotCase(sample)).toBe('hello.world');
    expect(toDotCase(devSample)).toBe('user.account.identifier');
  });

  it('8. path/case & Slash Case', () => {
    expect(toPathCase(sample)).toBe('hello/world');
    expect(toSlashCase(sample)).toBe('hello/world');
    expect(toPathCase(devSample)).toBe('user/account/identifier');
  });

  it('9. lowercase', () => {
    expect(toLowerCase(sample)).toBe('hello world');
    expect(toLowerCase('HELLO WORLD')).toBe('hello world');
  });

  it('10. UPPERCASE', () => {
    expect(toUpperCase(sample)).toBe('HELLO WORLD');
  });

  it('11. Title Case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('the quick brown fox jumps over the lazy dog')).toBe(
      'The Quick Brown Fox Jumps over the Lazy Dog'
    );
  });

  it('12. Sentence case', () => {
    expect(toSentenceCase('hello world')).toBe('Hello world');
    expect(toSentenceCase('hello world. this is a test! how are you?')).toBe(
      'Hello world. This is a test! How are you?'
    );
  });

  it('13. Pascal_Snake_Case', () => {
    expect(toPascalSnakeCase(sample)).toBe('Hello_World');
    expect(toPascalSnakeCase(devSample)).toBe('User_Account_Identifier');
  });

  it('14. camel_Snake_Case', () => {
    expect(toCamelSnakeCase(sample)).toBe('hello_World');
    expect(toCamelSnakeCase(devSample)).toBe('user_Account_Identifier');
  });

  it('15. COBOL-CASE & UPPER-KEBAB-CASE', () => {
    expect(toScreamingKebabCase(sample)).toBe('HELLO-WORLD');
    expect(toScreamingKebabCase(devSample)).toBe('USER-ACCOUNT-IDENTIFIER');
  });

  it('16. BiCapitalization', () => {
    expect(toBiCapitalization('iphone')).toBe('iPhone');
    expect(toBiCapitalization('hello world')).toBe('helloWorld');
  });

  it('17. Hungarian notation', () => {
    expect(toHungarianNotation('name')).toBe('strName');
    expect(toHungarianNotation('count')).toBe('iCount');
    expect(toHungarianNotation('is valid')).toBe('bIsValid');
  });

  it('18. mACRO_CASE', () => {
    expect(toMacroCase(sample)).toBe('hello_WORLD');
    expect(toMacroCase('api user token')).toBe('api_USER_TOKEN');
  });

  it('19. Flatcase', () => {
    expect(toFlatcase(sample)).toBe('helloworld');
    expect(toFlatcase('User Profile')).toBe('userprofile');
  });

  it('20. Reverse Pascal Case', () => {
    expect(toReversePascalCase(sample)).toBe('hELLOWORLD');
    expect(toReversePascalCase('foo bar baz')).toBe('fOOBARBAZ');
  });

  it('21. Hash Case', () => {
    expect(toHashCase(sample)).toBe('hello#world');
    expect(toHashCase(devSample)).toBe('user#account#identifier');
  });

  it('22. Capitalized Case', () => {
    expect(toCapitalizedCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  it('23. aLtErNaTiNg cAsE', () => {
    expect(toAlternatingCase('hello world')).toBe('hElLo wOrLd');
  });

  it('24. InVeRsE cAsE', () => {
    expect(toInverseCase('Hello World')).toBe('hELLO wORLD');
  });

  it('25. Slugify', () => {
    expect(toSlugify('Café & Crème Brûlée: The Ultimate Guide! 2026')).toBe(
      'cafe-creme-brulee-the-ultimate-guide-2026'
    );
  });
});

