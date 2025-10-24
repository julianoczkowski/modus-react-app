# Modus Next.js Copilot Instructions

This is a Next.js 15 application demonstrating Trimble's Modus Web Components design system integration with modern React patterns, featuring strict design system compliance enforced by automated linting.

## Architecture Overview

**Core Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + Modus Web Components React package (`@trimble-oss/moduswebcomponents-react@1.0.0-react19`)

**Key Files:**

- `app/layout.tsx` - Root layout with global header/footer
- `app/components/ModusProvider.tsx` - Client component that imports Modus styles
- `app/contexts/ThemeContext.tsx` - 4-theme system management
- `app/globals.css` - Design system color mappings to CSS variables

## 📚 Comprehensive Documentation

**ALWAYS reference these instruction files in `.github/instructions/` for detailed guidance:**

| File                                     | Purpose                                                  | When to Use                           |
| ---------------------------------------- | -------------------------------------------------------- | ------------------------------------- |
| `development_workflow.instructions.md`   | Pre-development linting, testing workflow, quality gates | **BEFORE** starting any code changes  |
| `implementation_guides.instructions.md`  | Creating implementation guides for major features        | **BEFORE** starting features >2 hours |
| `modus-borders.instructions.md`          | Border styling with Tailwind v4 workaround               | When adding borders to elements       |
| `modus-colors.instructions.md`           | 9-color design system with usage examples                | When choosing colors for UI           |
| `modus-icons.instructions.md`            | Icon usage patterns (500+ icons)                         | When adding icons to components       |
| `modus-semantic-html.instructions.md`    | Div-first approach, avoiding semantic HTML               | When structuring HTML markup          |
| `modus-state-management.instructions.md` | Web Component state management patterns                  | When using Modus Web Components       |
| `modus-tailwind-usage.instructions.md`   | Tailwind CSS patterns and best practices                 | When styling components               |
| `modus-themes.instructions.md`           | Theme system implementation (4 themes)                   | When implementing theme support       |

**These files contain:**

- ✅ Complete real-world examples with full code
- ✅ Common violations with corrections
- ✅ Step-by-step implementation patterns
- ✅ Debugging checklists and troubleshooting guides
- ✅ Best practices DO/DON'T lists
- ✅ Testing strategies and quality gates

**Critical:** These instruction files are authoritative and comprehensive. Always consult them for detailed implementation guidance beyond the quick reference patterns shown below.

## 🚨 CRITICAL: Development Workflow & Testing

### MANDATORY: Run Linting Before Changes

```bash
# 🔍 Run all linting checks before any code changes
npm run lint:styles && npm run lint:colors && npm run lint:icons && npm run lint:semantic
```

### Chrome DevTools Testing (Use MCP)

**ALWAYS use Chrome DevTools MCP for testing:**

```bash
# Start dev server first
npm run dev
```

**Then test with MCP:**

- Navigate to `http://localhost:3000`
- Check console for JavaScript errors
- Test all interactive elements (buttons, forms)
- Verify responsive design (mobile/desktop)
- Test theme switching if applicable
- Run accessibility checks

## Critical Development Patterns

### 1. Modus Web Components Integration

**MANDATORY:** Use React 19-compatible package (`@trimble-oss/moduswebcomponents-react@^1.0.0-react19`)

**Setup Pattern:**

```tsx
// app/components/ModusProvider.tsx (Client Component)
"use client";
import "@trimble-oss/moduswebcomponents-react/modus-wc-styles.css";

// Component Usage
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
```

**FORBIDDEN:**

- Manual `defineCustomElements()` calls
- Raw web component tags (`<modus-wc-button>`)
- Direct loader imports

### 2. Event Handling (CRITICAL PATTERN)

**Problem:** React event props don't work reliably with Modus Web Components.

**MANDATORY Solution:**

```tsx
"use client";
import { useRef, useEffect } from "react";

const componentRef = useRef<any>(null);

useEffect(() => {
  const component = componentRef.current;
  if (component) {
    const handleEvent = (event: CustomEvent) => {
      // Use componentRef.current, NEVER event.target
      component.someProperty = newValue;
    };

    component.addEventListener("eventName", handleEvent);
    return () => component.removeEventListener("eventName", handleEvent);
  }
}, []);

return <ModusWcComponent ref={componentRef} />;
```

**Rules:**

- Always use component refs for DOM access
- Always include cleanup in useEffect return
- Mark component `"use client"`
- Common events: `itemSelect`, `buttonClick`, `modalClose`, `accordionChange`

### 3. Design System Colors (ENFORCED BY LINTING)

**🎯 CRITICAL: Use Design System Tailwind Classes from globals.css**

**ONLY ALLOWED:** Design system Tailwind classes (mapped from Modus CSS variables in `globals.css`)

```tsx
// ✅ CORRECT - Use design system Tailwind classes
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-success text-success-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="bg-warning text-warning-foreground">
<div className="bg-muted text-muted-foreground">
<div className="bg-secondary text-secondary-foreground">
```

**Design System Mapping (from globals.css):**

The design system maps Modus CSS variables to Tailwind classes:

```css
/* Base Colors (theme-adaptive) */
--background: var(--modus-wc-color-base-page); /* bg-background */
--foreground: var(--modus-wc-color-base-content); /* text-foreground */
--card: var(--modus-wc-color-base-100); /* bg-card */
--border: var(--modus-wc-color-base-200); /* border-border */
--muted: var(--modus-wc-color-base-200); /* bg-muted */
--secondary: var(--modus-wc-color-base-300); /* bg-secondary */

/* Semantic Colors (theme-consistent) */
--primary: var(--modus-wc-color-info); /* bg-primary */
--destructive: var(--modus-wc-color-error); /* bg-destructive */
--warning: var(--modus-wc-color-warning); /* bg-warning */
--success: var(--modus-wc-color-success); /* bg-success */
```

**Usage Examples:**

```tsx
// ✅ CORRECT - Use design system Tailwind classes
<div className="bg-background text-foreground" style={{ border: "1px solid var(--border)"}}>
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">

// ❌ FORBIDDEN (Will fail lint)
<div style={{ backgroundColor: "var(--modus-wc-color-base-page)" }}>
<div style={{ color: "var(--modus-wc-color-info)" }}>
<div style={{ backgroundColor: "#ffffff" }}>
<div className="bg-blue-500 text-red-400">
```

### 4. Component Architecture

**MANDATORY:** Single configurable component pattern

```tsx
// ✅ CORRECT: One flexible component
interface ModusButtonProps {
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  // All configuration options
}

// ❌ FORBIDDEN: Multiple specific components
// ModusButtonPrimary.tsx
// ModusButtonSecondary.tsx
```

### 5. Styling Standards

**Preferred Approach:** Tailwind utility classes with design system colors

```tsx
<div className="max-w-5xl mx-auto p-8 bg-card rounded-lg" style={{ border: "1px solid var(--border)" }}>
```

**Critical Border Rule:**

```tsx
// ❌ WRONG - Tailwind border classes don't work in v4
<div className="border border-border">

// ✅ CORRECT - Use inline styles for borders with design system colors
<div style={{ border: "1px solid var(--border)" }}>
<div style={{ border: "2px dashed var(--border)" }}>
```

**Avoid:**

- Inline styles (except dynamic values and borders)
- CSS modules
- Semantic HTML elements (`<h1>`, `<section>`) - use `<div>` with Tailwind

**Typography:**

```tsx
// ✅ CORRECT
<div className="text-4xl font-semibold text-foreground">Title</div>

// ❌ WRONG (Browser defaults interfere)
<h1 className="text-4xl font-semibold">Title</h1>
```

## Development Workflow

### Essential Commands

```bash
npm run dev              # Start development (Turbopack enabled)
npm run lint:colors      # CRITICAL - Must pass before commit
npm run lint:icons       # Verify Modus icons
npm run lint:semantic    # Verify semantic HTML usage
npm run lint:styles      # Verify Modus styles
npm run lint:borders     # Verify border usage
npm run type-check       # TypeScript validation
npm run build           # Production build
```

### Pre-commit Enforcement

Husky runs `lint:colors` on staged files - all violations must be resolved before commit.

### Theme System

6 themes via `data-theme` attribute:

- **Standard Modus themes**: `modus-classic-light|dark`, `modus-modern-light|dark`
- **Trimble Connect themes**: `connect-light|dark` (for Trimble Connect Web Applications only)

### Hydration Safety Pattern

For client components accessing themes:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div>Loading...</div>;
```

## File Patterns

- `app/components/Modus[Component].tsx` - Configurable wrapper components
- `app/[feature]-demo/page.tsx` - Component demonstration pages
- `scripts/*.js` - Custom linting scripts for design system compliance
- `.cursor/rules/*.mdc` - IDE-specific development patterns

## Common Issues & Solutions

### Dropdown Not Closing

```tsx
// ❌ WRONG
event.target.menuVisible = false;

// ✅ CORRECT
dropdownRef.current.menuVisible = false;
```

### Accordion State Management Issues

```tsx
// ❌ WRONG - Don't control state from React
<ModusWcCollapse expanded={isExpanded} options={item.options}>

// ✅ CORRECT - Let Modus components handle their own state
<ModusWcCollapse options={item.options}>
  <div slot="content">Content</div>
</ModusWcCollapse>
```

### Theme Flash on Load

```tsx
// ✅ SOLUTION: Mounted state pattern
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;
```

### CSS Import Order Issues

```css
/* ✅ CORRECT ORDER in globals.css */
@import url("modus-icons.css"); /* FIRST */
@import url("fonts.googleapis.com"); /* SECOND */
@import "tailwindcss"; /* THIRD */
```

## 🎯 Key Rules Summary

### Essential Development Rules

1. **🚨 ALWAYS run linting commands before making changes**
2. **🧪 Use Chrome DevTools MCP for testing implementations**
3. **📋 Create implementation guides for major features**
4. **🎨 Use inline styles for borders (not Tailwind classes)**
5. **📝 Use div elements (not semantic HTML) for consistent Tailwind styling**
6. **🎛️ Let Modus components handle their own state (don't control from React)**
7. **🔧 Use ref-based event handling for Modus Web Components**

### Final Quality Checklist

- [ ] ✅ All 4 linting commands pass (0 violations)
- [ ] ✅ Chrome DevTools shows no console errors
- [ ] ✅ All interactive elements work correctly
- [ ] ✅ Responsive design tested
- [ ] ✅ Theme compatibility verified (if themes present)

Always run `npm run lint:colors` before committing - design system compliance is strictly enforced.
