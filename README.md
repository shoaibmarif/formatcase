# FormatCase — Multi-Format Case Converter & Text Utility

> **Live Website**: [https://formatcase.netlify.app/](https://formatcase.netlify.app/)  
> **High-performance, zero-latency, 100% in-browser text transformation engine and developer utility.**  
> Designed as an offline-first Single Page Application (SPA) and an open-source Chrome Extension (Manifest V3).

---

## 1. Overview & Vision

Developers, technical writers, and content creators frequently transition strings between naming conventions across different stacks (e.g. converting API JSON responses in `camelCase` to database columns in `snake_case`, environment variables in `SCREAMING_SNAKE_CASE`, URLs in `kebab-case`, or blog headings in `Title Case`).

**FormatCase** provides:
- **Instant real-time transformation** across 25+ case formats simultaneously.
- **Rule-based Unicode tokenizer** that understands acronym boundaries (`parseHTTPResponse` -> `parse HTTP response`) without destroying abbreviations.
- **Batch Processing Mode** to convert hundreds of lines independently.
- **Delimiter Cleaners & Prefix/Suffix Injectors** (SQL quotes `'value',`, JSON arrays `"value",`, backticks).
- **100% Client-Side Privacy**: Zero data leaves the browser memory.

---

## 2. Complete Casing Specifications

FormatCase supports 25+ distinct casing conventions:

| # | Casing Name | Identifier | Example Output (`"hello world"`) | Specification & Formatting Logic |
|---|---|---|---|---|
| 1 | **camelCase** | `camel` | `helloWorld` | First word is all-lowercase; all subsequent words are capitalized (`charAt(0).toUpperCase() + slice(1).toLowerCase()`). No spaces or separators. |
| 2 | **PascalCase** / **StudlyCaps** | `pascal` / `studly` | `HelloWorld` | Every word has its first character capitalized with no spaces or separators. |
| 3 | **snake_case** | `snake` | `hello_world` | All tokens lowercased and joined with underscores `_`. |
| 4 | **SCREAMING_SNAKE_CASE** | `screaming_snake` | `HELLO_WORLD` | All tokens uppercased and joined with underscores `_`. Standard for `.env` and constants. |
| 5 | **kebab-case** / **lower-kebab-case** | `kebab` / `lower_kebab` | `hello-world` | All tokens lowercased and joined with hyphens `-`. Standard for URLs and CSS classes. |
| 6 | **Train-Case** / **Header-Case** | `train` | `Hello-World` | Every token has its first character capitalized, joined with hyphens `-`. Standard for HTTP headers. |
| 7 | **dot.case** | `dot` | `hello.world` | All tokens lowercased and joined with periods `.`. Standard for config and property keys. |
| 8 | **path/case** / **Slash Case** | `path` / `slash` | `hello/world` | All tokens lowercased and joined with forward slashes `/`. Matches directory structures. |
| 9 | **lowercase** | `lower` | `hello world` | Full string converted to lowercase (`input.toLowerCase()`). |
| 10 | **UPPERCASE** | `upper` | `HELLO WORLD` | Full string converted to uppercase (`input.toUpperCase()`). |
| 11 | **Title Case** | `title` | `Hello World` | Capitalizes major words; preserves standard minor words in lowercase (`a`, `an`, `the`, `and`, `but`, `or`, `for`, `nor`, `on`, `at`, `to`, `from`, `by`, `in`, `of`). |
| 12 | **Sentence case** | `sentence` | `Hello world` | Capitalizes only the first letter of each sentence boundary (`[.?!]\s*`), retaining remaining words in lowercase. |
| 13 | **Pascal_Snake_Case** | `pascal_snake` | `Hello_World` | Every word capitalized and joined with underscores `_`. Common in C macros and Python exceptions. |
| 14 | **camel_Snake_Case** | `camel_snake` | `hello_World` | First word lowercase, subsequent words capitalized, joined with underscores `_`. |
| 15 | **COBOL-CASE** / **UPPER-KEBAB-CASE** | `cobol` / `upper_kebab` | `HELLO-WORLD` | All tokens uppercased and joined with hyphens `-`. |
| 16 | **BiCapitalization** | `bi_capitalization` | `iPhone` | Tech/product casing with an internal uppercase letter (e.g. `iPhone`, `eBay`, `JavaScript`). |
| 17 | **Hungarian notation** | `hungarian` | `strName`, `iCount`, `bIsValid` | Prefixes variable names with data type abbreviation (`str` for strings, `i` for integer/count, `b` for boolean flags, `arr` for lists, `fn` for functions) followed by PascalCase tokens. |
| 18 | **mACRO_CASE** | `macro` | `hello_WORLD` | First word lowercase, remaining tokens in uppercase, joined with underscores `_`. |
| 19 | **Flatcase** | `flat` | `helloworld` | All words lowercased and concatenated without spaces or separators. Standard in package names. |
| 20 | **Reverse Pascal Case** | `reverse_pascal` | `hELLOWORLD` | First character lowercase, followed by all uppercase characters with no separators. |
| 21 | **Hash Case** | `hash` | `hello#world` | All words lowercased and joined with hash `#` symbols. |
| 22 | **Capitalized Case** | `capitalized` | `Hello World` | Capitalizes the first letter of every single word, separated by spaces. |
| 23 | **aLtErNaTiNg cAsE** | `alternating` | `hElLo wOrLd` | Alternates every letter between lowercase and uppercase. |
| 24 | **InVeRsE cAsE** | `inverse` | `hELLO wORLD` | Inverts casing: converts uppercase letters to lowercase and lowercase to uppercase. |
| 25 | **slugify** | `slug` | `hello-world` | URL-safe string: strips accents/diacritics (`normalize('NFD')`), removes symbols, and joins tokens with hyphens. |

---

## 3. Core Algorithm: Tokenizer Engine

At the core of FormatCase is a tokenizer that parses raw inputs into clean token arrays while preserving acronyms:

```typescript
export function tokenize(input: string): string[] {
  if (!input || input.trim() === '') return [];

  return (
    input
      // 1. Split acronym followed by PascalCase (e.g., 'parseHTTPResponse' -> 'parse HTTP Response')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // 2. Split lowercase/digit followed by Uppercase (e.g., 'helloWorld' -> 'hello World', 'v2Endpoint' -> 'v2 Endpoint')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // 3. Replace delimiters, punctuation, and symbols with whitespace
      .replace(/[-_./\\:,|;~#$@%^&*()[\]{}<>+=`"']+/g, ' ')
      // 4. Remove unsupported non-word characters while preserving unicode letters and numbers
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );
}
```

### Batch Mode Processing
When `Batch Mode` is enabled:
```typescript
const transformed = input
  .split('\n')
  .map((line) => (line.length > 0 ? formatter(line) : ''))
  .join('\n');
```

---

## 4. Advanced Text Utilities

1. **Prefix / Suffix Injection**:
   - Quotes items per line or word for SQL statements: `'item',`
   - JSON Array format: `"item",`
   - Backticks: `` `item` ``
2. **Whitespace & Delimiter Cleaners**:
   - Trim leading & trailing whitespace on each line.
   - Collapse duplicate spaces into a single space.
   - Remove blank lines.
   - Strip code delimiters (`-`, `_`, `/`, `\`, `.`).
   - Full normalization in 1 click.

---

## 5. Specification for Chrome Extension AI Builders

When delegating the creation of a **FormatCase Chrome Extension (Manifest V3)** to an AI agent, provide this specification:

### Extension Architecture (Manifest V3)
1. **Manifest Configuration** (`manifest.json`):
   ```json
   {
     "manifest_version": 3,
     "name": "FormatCase - Case Converter & Text Utility",
     "version": "1.0.0",
     "description": "Convert selected text or workbench strings into camelCase, snake_case, PascalCase, kebab-case, and 25+ formats instantly.",
     "action": {
       "default_popup": "popup.html",
       "default_icon": {
         "16": "icons/icon16.png",
         "48": "icons/icon48.png",
         "128": "icons/icon128.png"
       }
     },
     "permissions": [
       "storage",
       "contextMenus",
       "clipboardWrite"
     ],
     "background": {
       "service_worker": "background.js"
     }
   }
   ```

2. **Context Menu Feature** (`background.js`):
   - Right-click any selected text on any webpage -> `FormatCase` submenu:
     - *Convert to camelCase*
     - *Convert to snake_case*
     - *Convert to PascalCase*
     - *Convert to kebab-case*
     - *Convert to SCREAMING_SNAKE_CASE*
   - Copies converted text directly to clipboard with a Chrome notification.

3. **Popup Workbench** (`popup.html` / `popup.js`):
   - Compact 400x550px viewport.
   - Input textarea with auto-focus.
   - Default **Batch Mode** enabled.
   - Search bar with live filtering across all 25+ formats.
   - 1-click copy with quick visual confirmation.
   - Dark/Light mode synchronization using `chrome.storage.local`.

4. **Reused Core Modules**:
   - `src/utils/tokenizer.ts` (Zero dependency, pure TypeScript/JavaScript).
   - `src/utils/formatters.ts` (Zero dependency, pure TypeScript/JavaScript).
   - `src/utils/textUtils.ts` (Text statistics, injection, and sanitization).

---

## 5. Monorepo Architecture

FormatCase is structured as an **npm workspaces monorepo** with three specialized packages:

| Package | Path | Description |
|---|---|---|
| `@formatcase/core` | `packages/core` | Pure, zero-dependency casing formatters, tokenizer, and string utilities. Fully tested with Vitest. |
| `@formatcase/web` | `packages/web` | Full React 19 + Tailwind CSS v4 Single Page Web Application with Poppins typography, batch processing, and live preview. |
| `@formatcase/extension` | `packages/extension` | Manifest V3 Chrome Extension featuring quick popup workbench and right-click context menu transformation. |

---

## 6. Repository Structure

```
formatcase/
├── packages/
│   ├── core/                        # Pure TypeScript casing & tokenizing engine
│   │   ├── src/
│   │   │   ├── formatters.ts        # 25+ casing formatters & FORMAT_DEFINITIONS
│   │   │   ├── tokenizer.ts         # Rule-based Unicode boundary tokenizer
│   │   │   ├── textUtils.ts         # Text statistics & injection utilities
│   │   │   └── index.ts             # Public API barrel exports
│   │   ├── tests/                   # 38 Vitest automated unit tests
│   │   │   ├── formatters.test.ts
│   │   │   ├── tokenizer.test.ts
│   │   │   └── textUtils.test.ts
│   │   ├── package.json             # @formatcase/core
│   │   └── tsconfig.json
│   │
│   ├── web/                         # React 19 + Tailwind v4 Web Application
│   │   ├── public/                  # Favicons, sitemap, robots.txt
│   │   ├── src/
│   │   │   ├── components/          # Header, Workbench, PreviewGrid, CommandPalette, etc.
│   │   │   ├── hooks/               # useCaseConverter, useLocalStorage, useTheme
│   │   │   ├── styles/              # app.css (Tailwind v4)
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json             # @formatcase/web
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── extension/                   # Chrome Extension (Manifest V3)
│       ├── public/
│       │   ├── manifest.json        # MV3 manifest with contextMenus & popup
│       │   └── icons/               # 16px, 48px, 128px PNG icons
│       ├── src/
│       │   ├── background/
│       │   │   └── index.ts         # Background service worker (Context Menu)
│       │   ├── popup/
│       │   │   ├── Popup.tsx        # Compact interactive workbench UI
│       │   │   └── main.tsx
│       │   └── styles/
│       │       └── popup.css
│       ├── popup.html
│       ├── package.json             # @formatcase/extension
│       ├── tsconfig.json
│       └── vite.config.ts           # Dual build for popup + background service worker
│
├── package.json                     # Monorepo root workspace config
├── tsconfig.json
└── README.md
```

---

## 7. Development & Testing Commands

### Monorepo Root Scripts

```bash
# Install all dependencies and link workspaces
npm install

# Run automated unit tests across @formatcase/core (38 tests)
npm test

# Build all packages (@formatcase/web & @formatcase/extension)
npm run build

# Start web application in development mode
npm run dev

# Or run workspace-specific commands
npm run dev:web       # Start web app dev server (http://localhost:5173)
npm run dev:ext       # Watch mode build for Chrome extension
npm run build:web     # Build web app into packages/web/dist
npm run build:ext     # Build extension into packages/extension/dist
```

### Loading the Chrome Extension into Google Chrome

1. Run the build command:
   ```bash
   npm run build:ext
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top right corner.
4. Click **Load unpacked** in the top left.
5. Select the `packages/extension/dist` folder.
6. The **FormatCase** extension is now active! You can:
   - Click the FormatCase icon in your browser toolbar to open the compact case converter workbench.
   - Select any text on any webpage, right-click, and select **FormatCase** to convert and copy instantly to clipboard.

---

## 8. Author & License

- **Author**: Shoaib M. Arif
- **Website**: [https://formatcase.netlify.app/](https://formatcase.netlify.app/)
- **GitHub**: [https://github.com/shoaibmarif](https://github.com/shoaibmarif)
- **LinkedIn**: [https://www.linkedin.com/in/shoaibmarif/](https://www.linkedin.com/in/shoaibmarif/)
- **License**: MIT
