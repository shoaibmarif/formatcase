import React, { useState } from 'react';
import { BookOpen, ChevronDown, Copy, Check, Terminal, Database, Code, Globe } from 'lucide-react';

interface SeoContentProps {
  onNotifyCopy: (msg: string) => void;
}

interface CasingGuideItem {
  format: string;
  pattern: string;
  primaryStacks: string;
  rule: string;
}

const CASING_GUIDES: CasingGuideItem[] = [
  {
    format: 'camelCase',
    pattern: 'helloWorld',
    primaryStacks: 'JavaScript, TypeScript, Java, Swift',
    rule: 'First word is lowercase, and every following word starts with a capital letter.',
  },
  {
    format: 'PascalCase',
    pattern: 'HelloWorld',
    primaryStacks: 'React/Vue components, C#, TypeScript types, StudlyCaps',
    rule: 'Every single word starts with a capital letter, with no spaces in between.',
  },
  {
    format: 'snake_case',
    pattern: 'hello_world',
    primaryStacks: 'Python, SQL databases, Rust',
    rule: 'Everything is in lowercase, with words joined together by underscores.',
  },
  {
    format: 'SCREAMING_SNAKE',
    pattern: 'HELLO_WORLD',
    primaryStacks: '.env files, constants, system config',
    rule: 'ALL CAPS letters connected with underscores. Used for fixed constants.',
  },
  {
    format: 'kebab-case',
    pattern: 'hello-world',
    primaryStacks: 'Website URLs, CSS classes, HTML tags, lower-kebab-case',
    rule: 'All lowercase letters joined with hyphens. Clean and easy to read in a browser.',
  },
  {
    format: 'Train-Case',
    pattern: 'Hello-World',
    primaryStacks: 'HTTP headers, legacy naming, Header-Case',
    rule: 'Capitalized words separated by hyphens (also known as Header-Case).',
  },
  {
    format: 'COBOL-CASE',
    pattern: 'HELLO-WORLD',
    primaryStacks: 'COBOL, legacy mainframes, UPPER-KEBAB-CASE',
    rule: 'ALL CAPS letters joined by hyphens, standard for COBOL variable declarations.',
  },
  {
    format: 'Title Case',
    pattern: 'Hello World',
    primaryStacks: 'Headlines, blog titles, articles',
    rule: 'Capitalizes major words like a book title, keeping minor conjunctions lowercase.',
  },
  {
    format: 'Sentence case',
    pattern: 'Hello world',
    primaryStacks: 'Normal text, emails, UI labels',
    rule: 'Capitalizes the very first letter of each sentence and leaves the rest lowercase.',
  },
  {
    format: 'Pascal_Snake_Case',
    pattern: 'Hello_World',
    primaryStacks: 'C/C++ macros, Python exceptions, database views',
    rule: 'Capitalized words joined together with underscores.',
  },
  {
    format: 'camel_Snake_Case',
    pattern: 'hello_World',
    primaryStacks: 'Specialized API models, database naming conventions',
    rule: 'Starts lowercase with underscores before each capitalized subsequent word.',
  },
  {
    format: 'mACRO_CASE',
    pattern: 'hello_WORLD',
    primaryStacks: 'Preprocessor symbols, scoped constant identifiers',
    rule: 'Lowercase prefix or namespace joined with uppercase identifier tokens.',
  },
  {
    format: 'Hungarian notation',
    pattern: 'strName, iCount',
    primaryStacks: 'Win32 APIs, legacy C++, structured systems',
    rule: 'Prefixes variables with their type abbreviation (str for string, i for integer, b for boolean).',
  },
  {
    format: 'BiCapitalization',
    pattern: 'iPhone',
    primaryStacks: 'Brand names, consumer tech, product titles (eBay, iPad)',
    rule: 'Internal capitalization inside a word or brand name.',
  },
  {
    format: 'Flatcase',
    pattern: 'helloworld',
    primaryStacks: 'Package names (Java/Go), domain names, email handles',
    rule: 'All lowercase characters concatenated without spaces or separators.',
  },
  {
    format: 'Reverse Pascal Case',
    pattern: 'hELLOWORLD',
    primaryStacks: 'Alternative ciphering, inverted casing',
    rule: 'First character lowercase followed by all uppercase characters.',
  },
  {
    format: 'dot.case',
    pattern: 'hello.world',
    primaryStacks: 'Config files, properties, translation keys',
    rule: 'Lowercase words separated by simple periods.',
  },
  {
    format: 'path/case',
    pattern: 'hello/world',
    primaryStacks: 'Folder structures, website routes, Slash Case',
    rule: 'Words separated by forward slashes, matching directory paths.',
  },
  {
    format: 'Hash Case',
    pattern: 'hello#world',
    primaryStacks: 'URI fragments, tag separators, specialized identifiers',
    rule: 'Words separated by hash (#) symbols.',
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Why are there so many different casing styles anyway?',
    answer:
      "Most programming languages and computer systems don't allow spaces in variable names, database columns, or URLs. To keep multi-word names readable without spaces, different communities settled on their own conventions. Web developers went with camelCase, Python programmers chose snake_case, and URLs adopted kebab-case.",
  },
  {
    question: 'What is the real difference between camelCase and PascalCase?',
    answer:
      "It all comes down to the very first letter. With camelCase, you start with a lowercase letter (e.g. userProfile). With PascalCase, you capitalize from the very beginning (e.g. UserProfile). If you're building a React app, you use camelCase for your functions and variables, but PascalCase for your component names.",
  },
  {
    question: 'Is my text private? Does anything get sent over the internet?',
    answer:
      "Zero. Nothing leaves your device. FormatCase runs 100% inside your web browser's memory. You could disconnect your internet right now, and the tool will continue working with zero issues. We don't save your text, we don't have a backend server reading your data, and we don't track what you paste.",
  },
  {
    question: 'How does this tool handle tricky names like "parseHTTPResponse" or "userID"?',
    answer:
      'Simple converters break words on every single capital letter, which turns "HTTP" into "h_t_t_p". We built smart word-boundary detection that recognizes when uppercase letters belong together as an acronym. So "parseHTTPResponse" becomes "parse_http_response" like you would expect in clean code.',
  },
  {
    question: 'What does "Batch Mode" do?',
    answer:
      'If you have a whole list of items (like 20 database columns, a list of filenames, or environment variables), turn Batch Mode on. It converts each line on its own rather than mashing the whole block into a single sentence.',
  },
  {
    question: 'Which casing should I use for my project?',
    answer:
      'If you are writing JavaScript/TypeScript, use camelCase for variables and PascalCase for components/classes. If you are working in Python or writing SQL queries, stick to snake_case. For web links and CSS classes, kebab-case is universally preferred.',
  },
];

export const SeoContent: React.FC<SeoContentProps> = ({ onNotifyCopy }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyExample = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    onNotifyCopy('Copied example to clipboard!');
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <section className="space-y-8 mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800">
      {/* Friendly Intro Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            A Quick Guide to Naming Conventions
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Wondering which format you should use? Here is a simple breakdown of what is standard across different programming languages and web tools.
        </p>
      </div>

      {/* Interactive Reference Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
        <div className="px-6 sm:px-8 py-4 border-b border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-950/40 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Common Styles at a Glance
          </span>
          <span className="text-xs text-slate-400 dark:text-zinc-500">
            Click any pattern to copy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 font-semibold border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="px-5 py-3.5">Style Name</th>
                <th className="px-5 py-3.5">What it looks like</th>
                <th className="px-5 py-3.5">Where it is used</th>
                <th className="px-5 py-3.5">How it works</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 font-sans">
              {CASING_GUIDES.map((guide, idx) => (
                <tr
                  key={guide.format}
                  className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors group"
                >
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-900 dark:text-zinc-100 whitespace-nowrap">
                    {guide.format}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleCopyExample(guide.pattern, idx)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-800 dark:text-zinc-200 hover:text-indigo-600 font-mono text-xs border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer"
                      title="Click to copy example"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                      )}
                      <span>{guide.pattern}</span>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                    {guide.primaryStacks}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {guide.rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-semibold text-xs sm:text-sm">
            <Code className="w-4 h-4" />
            <span>JavaScript & React</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Variables and helper functions use <code>camelCase</code>. React components and TypeScript types use <code>PascalCase</code>.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
            <Database className="w-4 h-4" />
            <span>Python & Databases</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Python scripts and SQL table columns use <code>snake_case</code>. App passwords and <code>.env</code> keys use <code>SCREAMING_SNAKE</code>.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-xs sm:text-sm">
            <Globe className="w-4 h-4" />
            <span>URLs & Styles</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Web addresses and CSS classes almost always use <code>kebab-case</code> because they look clean and are easy to read.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-semibold text-xs sm:text-sm">
            <Terminal className="w-4 h-4" />
            <span>Writing & Content</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Use <code>Title Case</code> for blog post headings and email subjects. Use <code>Sentence case</code> for descriptions and buttons.
          </p>
        </div>
      </div>

      {/* Human-written FAQ Accordion */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-200/80 dark:border-zinc-800/80 pb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Quick answers to common questions about case converting and how this tool works.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 overflow-hidden transition-all bg-white dark:bg-zinc-900 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`text-slate-400 dark:text-zinc-500 shrink-0 transform transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth animated accordion drawer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-950/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
