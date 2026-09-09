# Chrome Web Store — Review Justifications & Setup Guide

This document provides exact, copy-paste answers to satisfy all Google Chrome Web Store review requirements and ensure fast, smooth approval.

---

## 1. Privacy Practices Tab

### A. Single Purpose Description
> **Field: "Single purpose description"**

```text
FormatCase provides instant, client-side text case transformation (camelCase, snake_case, PascalCase, kebab-case, and 25+ conventions) for code identifiers and text via an interactive toolbar popup and right-click context menus.
```

---

### B. Permission Justifications

#### 1. `activeTab` Justification:
```text
Required to temporarily access the active browser tab only when the user explicitly triggers a FormatCase context menu action, allowing the extension to write the converted string into the user's active page clipboard.
```

#### 2. `clipboardWrite` Justification:
```text
Required to write converted case formats (such as camelCase, snake_case, PascalCase, and kebab-case) directly to the user's clipboard upon clicking 'Copy' in the popup workbench or selecting a transformation from the right-click context menu.
```

#### 3. `contextMenus` Justification:
```text
Required to register the 'FormatCase' right-click context menu items (e.g., 'to camelCase', 'to snake_case', 'to PascalCase', etc.) when text is highlighted on any webpage so users can format strings without leaving their current tab.
```

#### 4. `scripting` Justification:
```text
Required to execute a brief clipboard write helper function on the active tab when a user converts selected text via the right-click context menu, ensuring the converted result is immediately available in the user's clipboard.
```

#### 5. `storage` Justification:
```text
Required to save user preferences, favorite casing formats, and UI filter states locally in browser storage on the user's device. No data is synchronized or sent to external servers.
```

---

### C. Remote Code Declaration
> **Question: "Are you using remote code?"**

- **Select**: `No, I am not using remote code`  
*(All scripts, formatters, and assets are 100% packaged locally within the extension distribution bundle. Manifest V3 forbids external executable code).*

---

### D. Data Usage Certification & Privacy Compliance
- **Data Collection Checkbox**: Select that your extension **does not collect or use user data**.
- **Certification Checkbox**: Check `I certify that my data usage complies with our Developer Program Policies`.

---

## 2. Store Listing Tab

### A. Categorization & Language
- **Category**: Select `Developer Tools`
- **Language**: Select `English (United States)`

### B. Icon Image (128x128 PNG)
- **Upload file**:  
  `packages/extension/store-assets/icon-128x128.png`  
  *(Exact 128x128 px PNG format)*

### C. Screenshots (At least 1 required)
- **Upload files from `packages/extension/store-assets/`**:
  1. `screenshot-1-overview-1280x800.png`
  2. `screenshot-2-context-menu-1280x800.png`
  3. `screenshot-3-casing-formats-1280x800.png`
  4. `screenshot-4-privacy-and-speed-1280x800.png`
  5. `screenshot-5-search-and-filter-1280x800.png`

### D. Detailed Description (Minimum 25 characters)
Copy and paste the detailed description from [`packages/extension/STORE_LISTING.md`](file:///c:/Users/Hp/Desktop/Open%20Source%20Projects/Case%20Converter/packages/extension/STORE_LISTING.md).
