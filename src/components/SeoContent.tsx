import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Copy, Check, Terminal, Database, Code, Globe } from 'lucide-react';

interface SeoContentProps {
  onNotifyCopy: (msg: string) => void;
}

interface CasingGuideItem {
  format: string;
  pattern: string;
  primaryStacks: string;
  example: string;
  rule: string;
}

const CASING_GUIDES: CasingGuideItem[] = [
  {
    format: 'camelCase',
    pattern: 'userAccountId',
    primaryStacks: 'JavaScript, TypeScript, Java, Swift, Kotlin',
    example: 'const activeUserProfile = await fetchUser();',
    rule: 'First word lowercase; capitalize every subsequent word without delimiters.',
  },
  {
    format: 'PascalCase',
    pattern: 'UserAccountId',
    primaryStacks: 'React/Vue Components, C#, TypeScript Types & Interfaces',
    example: 'export interface UserProfileCardProps { ... }',
    rule: 'Every word begins with an uppercase letter without delimiters.',
  },
  {
    format: 'snake_case',
    pattern: 'user_account_id',
    primaryStacks: 'Python, Ruby, Rust, PostgreSQL, MySQL',
    example: 'user_auth_token = request.headers.get("token")',
    rule: 'All lowercase letters separated strictly by underscores.',
  },
  {
    format: 'SCREAMING_SNAKE_CASE',
    pattern: 'USER_ACCOUNT_ID',
    primaryStacks: 'Environment variables (.env), Global Constants, Java enums',
    example: 'export const MAX_RETRY_ATTEMPTS = 5;',
    rule: 'All uppercase letters separated strictly by underscores.',
  },
  {
    format: 'kebab-case',
    pattern: 'user-account-id',
    primaryStacks: 'URLs, CSS class names (BEM/utility), HTML custom elements, Kubernetes labels',
    example: '<div class="user-profile-avatar-container">',
    rule: 'All lowercase letters separated strictly by hyphens.',
  },
  {
    format: 'SCREAMING-KEBAB-CASE',
    pattern: 'USER-ACCOUNT-ID',
    primaryStacks: 'COBOL, Common Lisp, legacy mainframe protocols',
    example: '01 USER-ACCOUNT-RECORD PIC X(32).',
    rule: 'All uppercase letters separated strictly by hyphens.',
  },
  {
    format: 'dot.case',
    pattern: 'user.account.id',
    primaryStacks: 'YAML configs, Spring properties, Java package names, i18n translation keys',
    example: 'auth.jwt.expiration.timeout=3600',
    rule: 'All lowercase words separated strictly by periods.',
  },
  {
    format: 'path/case',
    pattern: 'user/account/id',
    primaryStacks: 'REST API paths, UNIX file paths, import specifiers',
    example: 'GET /api/v1/user/account/profile',
    rule: 'Words separated by forward slashes.',
  },
  {
    format: 'Header-Case',
    pattern: 'User-Account-Id',
    primaryStacks: 'HTTP Headers (Train-Case)',
    example: 'X-Rate-Limit-Remaining: 100',
    rule: 'Capitalized words separated by hyphens.',
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is the fundamental difference between camelCase and PascalCase?',
    answer:
      'In camelCase (lowerCamelCase), the very first letter is strictly lowercase while subsequent words begin with a capital letter (e.g. "userAccountId"). In PascalCase (UpperCamelCase), the first letter of every single word, including the first word, is capitalized (e.g. "UserAccountId"). In modern web development, camelCase is standard for variable and function names, while PascalCase is standard for React components, classes, and TypeScript type/interface declarations.',
  },
  {
    question: 'Does OmniCase Studio upload my code or text to a server?',
    answer:
      'No. OmniCase Studio executes 100% locally inside your browser memory using client-side JavaScript. Zero bytes of your text, variables, API payloads, or code snippets are ever transmitted across network sockets or external telemetry.',
  },
  {
    question: 'How does the tokenizer handle tricky acronyms like XML, HTTP, and JSON?',
    answer:
      'Most standard string converters fail on acronyms, turning "parseHTTPResponse" into "parse_h_t_t_p_response". OmniCase Studio implements a rule-based tokenizer that identifies consecutive uppercase acronym blocks followed by title case words (regex `([A-Z]+)([A-Z][a-z])`), correctly producing `parse_http_response` and `ParseHttpResponse`.',
  },
  {
    question: 'What is Batch Mode and how does it work?',
    answer:
      'When Batch Mode is toggled ON, OmniCase Studio splits multiline input strings by newline and applies the casing transform independently to each line. This is ideal for converting SQL database column lists, arrays of variable keys, or `.env` configuration files.',
  },
  {
    question: 'Which casing format should I use for REST API URLs vs JSON responses?',
    answer:
      'Industry consensus (Google Cloud API Design, Microsoft REST Guidelines) recommends `kebab-case` for URL path segments and query parameters (e.g., `/api/user-profiles?sort-order=asc`), while JSON response body keys typically use `camelCase` (e.g., `{"userProfile": { "displayName": "Alice" }}`) in JavaScript/TypeScript ecosystems, or `snake_case` in Python/Django/FastAPI backends.',
  },
];

export const SeoContent: React.FC<SeoContentProps> = ({ onNotifyCopy }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyExample = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    onNotifyCopy('Copied pattern example to clipboard!');
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <section className="space-y-8 mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800">
      {/* Intro Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Developer Casing Conventions & Programming Cheatsheet
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-3xl">
          Naming conventions are fundamental to software maintainability, readability, and consistency.
          Here is how modern programming languages, database architectures, and web standards map casing styles.
        </p>
      </div>

      {/* Interactive Casing Reference Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Interactive Naming Conventions Matrix
          </span>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">
            Click any pattern to copy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 font-semibold border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3">Convention</th>
                <th className="px-4 py-3">Pattern</th>
                <th className="px-4 py-3">Primary Tech Stacks</th>
                <th className="px-4 py-3">Rule Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 font-sans">
              {CASING_GUIDES.map((guide, idx) => (
                <tr
                  key={guide.format}
                  className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors group"
                >
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-zinc-100 whitespace-nowrap">
                    {guide.format}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleCopyExample(guide.pattern, idx)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-800 dark:text-zinc-200 hover:text-indigo-600 font-mono text-[11px] border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer"
                      title="Click to copy"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
                      )}
                      <span>{guide.pattern}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-zinc-400 max-w-xs">
                    {guide.primaryStacks}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-zinc-400">
                    {guide.rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semantic Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
            <Code className="w-4 h-4" />
            <span>Frontend & Fullstack JS</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Use <code>camelCase</code> for props, variables, and hooks; <code>PascalCase</code> for React/Vue components and TS interfaces; <code>kebab-case</code> for CSS classes and route slugs.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
            <Database className="w-4 h-4" />
            <span>Backend & Databases</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Python (PEP 8) and SQL use <code>snake_case</code> for functions and column names. Use <code>SCREAMING_SNAKE_CASE</code> for constants and <code>.env</code> file credentials.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
            <Globe className="w-4 h-4" />
            <span>Web APIs & Slugs</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            REST endpoints prefer <code>kebab-case</code> or <code>path/case</code> for resources (e.g. <code>/api/v1/user-accounts</code>). Use <code>Header-Case</code> for HTTP headers.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-xs">
            <Terminal className="w-4 h-4" />
            <span>DevOps & Shell</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Docker environment variables, Kubernetes secrets, and Bash shell flags rely on <code>SCREAMING_SNAKE_CASE</code> and double-hyphen <code>kebab-case</code> arguments.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-2xs">
        <div className="border-b border-slate-200 dark:border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
            Frequently Asked Questions (FAQ)
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Answers to common questions about case conversion, privacy, and tokenization algorithms.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200/80 dark:border-zinc-800/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    {faq.question}
                  </span>
                  <div className="text-slate-400 dark:text-zinc-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

