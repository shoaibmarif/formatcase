import {
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  toKebabCase,
  toScreamingSnakeCase,
  toTitleCase,
  toUpperCase,
  toLowerCase,
} from '@formatcase/core';

chrome.runtime.onInstalled.addListener(() => {
  // Parent Menu
  chrome.contextMenus.create({
    id: 'formatcase-parent',
    title: 'FormatCase',
    contexts: ['selection'],
  });

  const subMenus = [
    { id: 'fc-camel', title: 'to camelCase (helloWorld)', fn: toCamelCase },
    { id: 'fc-snake', title: 'to snake_case (hello_world)', fn: toSnakeCase },
    { id: 'fc-pascal', title: 'to PascalCase (HelloWorld)', fn: toPascalCase },
    { id: 'fc-kebab', title: 'to kebab-case (hello-world)', fn: toKebabCase },
    { id: 'fc-screaming-snake', title: 'to SCREAMING_SNAKE (HELLO_WORLD)', fn: toScreamingSnakeCase },
    { id: 'fc-title', title: 'to Title Case (Hello World)', fn: toTitleCase },
    { id: 'fc-upper', title: 'to UPPERCASE (HELLO WORLD)', fn: toUpperCase },
    { id: 'fc-lower', title: 'to lowercase (hello world)', fn: toLowerCase },
  ];

  subMenus.forEach((menu) => {
    chrome.contextMenus.create({
      id: menu.id,
      parentId: 'formatcase-parent',
      title: menu.title,
      contexts: ['selection'],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText) return;

  const text = info.selectionText;
  let converted = '';

  switch (info.menuItemId) {
    case 'fc-camel':
      converted = toCamelCase(text);
      break;
    case 'fc-snake':
      converted = toSnakeCase(text);
      break;
    case 'fc-pascal':
      converted = toPascalCase(text);
      break;
    case 'fc-kebab':
      converted = toKebabCase(text);
      break;
    case 'fc-screaming-snake':
      converted = toScreamingSnakeCase(text);
      break;
    case 'fc-title':
      converted = toTitleCase(text);
      break;
    case 'fc-upper':
      converted = toUpperCase(text);
      break;
    case 'fc-lower':
      converted = toLowerCase(text);
      break;
    default:
      return;
  }

  // Inject script to copy to clipboard in the active tab
  if (tab?.id && converted) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
      },
      args: [converted],
    });
  }
});

