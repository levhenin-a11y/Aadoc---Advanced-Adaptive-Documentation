## Refactoring

## 1. Centralize Design Tokens

- Avoid duplicated CSS variables (e.g. '--primary', '--sidebar-primary,' '--ring, --header-background', '--sidebar-primary-foreground' pointing to the same color).
- Introduce a _single source of truth_ for colors, radii, spacing, shadows, and transitions.
- Use semantic tokens (--color-surface, --color-accent, --color-interactive) instead of context-specific duplicates.
- Use a **context-mapping layer** (sidebar/header/etc. reference core tokens, never redefine values)
- Tokens must live primarily in tailwind.config.ts, with minimal, well-structured CSS variables in index.css.

### 1.1 Design Token Categories & Naming

Define tokens in this hierarchy:

#### **Core Tokens (tailwind.config.ts)**
```ts
// filepath: tailwind.config.ts
export default {
  theme: {
    colors: {
      // Semantic base
      "surface": "hsl(var(--surface) / <alpha-value>)",
      "surface-alt": "hsl(var(--surface-alt) / <alpha-value>)",
      "on-surface": "hsl(var(--on-surface) / <alpha-value>)",
      
      // Interactive
      "primary": "hsl(var(--primary) / <alpha-value>)",
      "primary-hover": "hsl(var(--primary-hover) / <alpha-value>)",
      "primary-active": "hsl(var(--primary-active) / <alpha-value>)",
      
      "secondary": "hsl(var(--secondary) / <alpha-value>)",
      "secondary-hover": "hsl(var(--secondary-hover) / <alpha-value>)",
      
      // Status
      "danger": "hsl(var(--danger) / <alpha-value>)",
      "success": "hsl(var(--success) / <alpha-value>)",
      "warning": "hsl(var(--warning) / <alpha-value>)",
      
      // Neutral
      "border": "hsl(var(--border) / <alpha-value>)",
      "muted": "hsl(var(--muted) / <alpha-value>)",
    },
    spacing: {
      "xs": "var(--spacing-xs)",  // 4px
      "sm": "var(--spacing-sm)",  // 8px
      "md": "var(--spacing-md)",  // 16px
      "lg": "var(--spacing-lg)",  // 24px
      "xl": "var(--spacing-xl)",  // 32px
    },
    borderRadius: {
      "sm": "var(--radius-sm)",   // 4px
      "md": "var(--radius-md)",   // 8px
      "lg": "var(--radius-lg)",   // 12px
      "xl": "var(--radius-xl)",   // 16px
    },
    transitionDuration: {
      "fast": "var(--duration-fast)",      // 150ms
      "base": "var(--duration-base)",      // 300ms
      "slow": "var(--duration-slow)",      // 500ms
    },
  },
}
```

#### **CSS Variables (index.css)**
```css
/* filepath: index.css */
@layer base {
  :root {
    /* Colors - HSL format for dynamic theming */
    --surface: 0 0% 100%;
    --surface-alt: 0 0% 98%;
    --on-surface: 0 0% 10%;
    
    --primary: 221 83% 53%;
    --primary-hover: 221 83% 43%;
    --primary-active: 221 83% 33%;
    
    --secondary: 0 0% 50%;
    --secondary-hover: 0 0% 40%;
    
    --danger: 0 84% 60%;
    --success: 142 76% 36%;
    --warning: 38 92% 50%;
    
    --border: 0 0% 85%;
    --muted: 0 0% 60%;
    
    /* Spacing - rem-based */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    /* Transitions */
    --duration-fast: 150ms;
    --duration-base: 300ms;
    --duration-slow: 500ms;
  }
  
  /* Dark mode override (optional) */
  @media (prefers-color-scheme: dark) {
    :root {
      --surface: 0 0% 10%;
      --on-surface: 0 0% 90%;
      /* ... override other tokens ... */
    }
  }
}
```

### 1.2 Reduce Long Utility Class Chains

- Avoid verbose class strings like: `flex-1 overflow-auto flex flex-col transition-[padding] duration-300`
- Replace them with meaningful abstractions using:
  - `@layer components` → semantic, reusable component classes
  - `@layer utilities` → animation helpers, gradients, transitions
- Improve readability and intent clarity in JSX/HTML.

### 1.3 Examples

#### Gradient Utilities

Instead of:

````tsx
style={{
  backgroundImage: "linear-gradient(to top, hsl(var(--background)), hsl(var(--primary)))"
}}
````

Use:

````css
@layer utilities {
  .bg-app-gradient {
    background-image: linear-gradient(
      to top,
      hsl(var(--surface)),
      hsl(var(--primary))
    );
  }
  
  .bg-gradient-secondary {
    background-image: linear-gradient(
      135deg,
      hsl(var(--secondary)),
      hsl(var(--secondary-hover))
    );
  }
}
````

Now in JSX:

````html
<div className="bg-app-gradient">

````

Now it's reusable, targetable, and animatable.

## 2. Introduce Custom Utility & Component Classes

### 2.1 Layer Organization Strategy
Layer	Purpose	Examples
@layer components	Semantic blocks (layout, structure)	.app-shell, .card, .btn, .section
@layer utilities	Animations, gradients, transitions	.bg-app-gradient, .fade-in, .slide-up
Tailwind defaults	Atomic utilities	flex, p-4, bg-primary

Rule: A component class should never be just @apply flex bg-primary;—it must express intent (e.g., "this is a card" or "this is the main app shell").

### 2.2 Components Classes (index.css)

````css
@layer components {
  /* ─── App Shell ─── */
  .app-shell {
    @apply flex min-h-screen flex-col;
  }
  
  .app-body {
    @apply relative flex flex-1;
  }
  
  .app-main {
    @apply flex flex-1 flex-col overflow-auto transition-[padding] duration-base;
  }
  
  .app-main--sidebar-open {
    @apply pl-64;
  }
  
  .app-main--sidebar-collapsed {
    @apply pl-12 lg:pl-16;
  }
  
  .app-content {
    @apply flex flex-1 flex-col gap-md p-md md:p-lg lg:p-xl;
  }
  
  /* ─── Cards & Sections ─── */
  .card {
    @apply rounded-lg border border-border bg-surface p-lg shadow-sm;
  }
  
  .card--hoverable {
    @apply cursor-pointer transition-[box-shadow,transform] duration-fast hover:shadow-md hover:translate-y-[-2px];
  }
  
  .section {
    @apply flex flex-col gap-lg;
  }
  
  .section-title {
    @apply text-lg font-semibold text-on-surface;
  }
  
  /* ─── Buttons (base only) ─── */
  .btn {
    @apply rounded-md px-4 py-2 font-medium transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  /* ─── Sidebar ─── */
  .sidebar {
    @apply fixed left-0 top-0 h-screen w-64 flex-col overflow-auto border-r border-border bg-surface transition-[width] duration-base;
  }
  
  .sidebar--collapsed {
    @apply w-12 lg:w-16;
  }
}
````

### 2.3 Utility Classes (animations, gradients, etc.)

````css
@layer utilities {
  /* Gradients */
  .bg-app-gradient {
    background-image: linear-gradient(to top, hsl(var(--surface)), hsl(var(--primary)));
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn var(--duration-base) ease-out;
  }
  
  .slide-up {
    animation: slideUp var(--duration-base) ease-out;
  }
  
  /* Scroll utilities */
  .scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
}
````

### 2.4 Example Refactoring: MainLayout.tsx

Before:

````tsx
<div className="flex flex-col min-h-screen">
  <div className="relative flex flex-1">
    <div
      className={cn(
        "flex-1 overflow-auto flex flex-col transition-[padding] duration-300",
        sidebarOpen ? "pl-64" : "pl-12 lg:pl-16"
      )}
      style={{ backgroundImage: "linear-gradient(to top, hsl(var(--background)), hsl(var(--primary)))" }}
    >
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        {/* Content */}
      </div>
    </div>
  </div>
</div>
````

After:
````tsx
<div className="app-shell">
  <div className="app-body">
    <main
      className={cn(
        "app-main bg-app-gradient",
        sidebarOpen ? "app-main--sidebar-open" : "app-main--sidebar-collapsed"
      )}
    >
      <div className="app-content">
        {/* Content */}
      </div>
    </main>
  </div>
</div>
````

## 3. Component Variant System

### 3.1 Design Pattern

Variants are class-based extensions of a base component. They inherit base styling and override specific properties (color, size, state).

````tsx
// filepath: src/components/Button.tsx
const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
  secondary: "bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active",
  danger: "bg-danger text-white hover:bg-danger-active",
  ghost: "bg-transparent text-on-surface hover:bg-surface-alt",
} as const;

const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

type ButtonProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "btn",                          // Base component class
        buttonVariants[variant],        // Variant colors/states
        buttonSizes[size],              // Size override
        className                       // Overrides
      )}
      {...props}
    />
  );
}
````

### 3.2 CSS Must Support All Variant States

For each variant, define .btn + color/state combinations in CSS or rely on Tailwind utility composition:

````css
@layer components {
  .btn {
    @apply rounded-md font-medium transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed;
    /* Base padding handled by size utility/class */
  }
}
````
Then buttonVariants in TS handles hover/active via Tailwind utilities.

### 3.3 Card Variant Example

````tsx
// filepath: src/components/Card.tsx
const cardVariants = {
  default: "bg-surface border border-border",
  elevated: "bg-surface shadow-lg",
  filled: "bg-surface-alt",
} as const;

type CardProps = {
  variant?: keyof typeof cardVariants;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn("card", cardVariants[variant], className)}
      {...props}
    />
  );
}
````

## 4. Migration Strategy

### 4.1 Phased Refactoring (Non-Breaking)

#### Phase 1: Tokens (Days 1–2)
Goal: Create new token infrastructure without touching component code.

    - Centralize all color variables in tailwind.config.ts
    - Define spacing, radius, duration tokens
    - Update index.css with clean CSS variable definitions
    - No component changes yet	

**Step 1.1: Create `tailwind.config.ts` with new tokens**

````ts
// filepath: [tailwind.config.ts](http://_vscodecontentref_/0)
export default {
  theme: {
    extend: {
      colors: {
        "surface": "hsl(var(--surface) / <alpha-value>)",
        "surface-alt": "hsl(var(--surface-alt) / <alpha-value>)",
        "on-surface": "hsl(var(--on-surface) / <alpha-value>)",
        
        "primary": "hsl(var(--primary) / <alpha-value>)",
        "primary-hover": "hsl(var(--primary-hover) / <alpha-value>)",
        "primary-active": "hsl(var(--primary-active) / <alpha-value>)",
        
        "secondary": "hsl(var(--secondary) / <alpha-value>)",
        "secondary-hover": "hsl(var(--secondary-hover) / <alpha-value>)",
        
        "danger": "hsl(var(--danger) / <alpha-value>)",
        "success": "hsl(var(--success) / <alpha-value>)",
        "warning": "hsl(var(--warning) / <alpha-value>)",
        
        "border": "hsl(var(--border) / <alpha-value>)",
        "muted": "hsl(var(--muted) / <alpha-value>)",
      },
      spacing: {
        "xs": "var(--spacing-xs)",
        "sm": "var(--spacing-sm)",
        "md": "var(--spacing-md)",
        "lg": "var(--spacing-lg)",
        "xl": "var(--spacing-xl)",
      },
      borderRadius: {
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
      },
      transitionDuration: {
        "fast": "var(--duration-fast)",
        "base": "var(--duration-base)",
        "slow": "var(--duration-slow)",
      },
    },
  },
};
````

**Step 1.2: Add CSS variables to index.css (in addition to existing variables)**

````css
/* filepath: index.css */
@layer base {
  :root {
    /* NEW SEMANTIC TOKENS – Keep existing colors for now */
    
    /* Colors - HSL format */
    --surface: 0 0% 100%;
    --surface-alt: 0 0% 98%;
    --on-surface: 0 0% 10%;
    
    --primary: 221 83% 53%;
    --primary-hover: 221 83% 43%;
    --primary-active: 221 83% 33%;
    
    --secondary: 0 0% 50%;
    --secondary-hover: 0 0% 40%;
    
    --danger: 0 84% 60%;
    --success: 142 76% 36%;
    --warning: 38 92% 50%;
    
    --border: 0 0% 85%;
    --muted: 0 0% 60%;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    /* Transitions */
    --duration-fast: 150ms;
    --duration-base: 300ms;
    --duration-slow: 500ms;
    
    /* KEEP EXISTING VARIABLES – Will be removed in Phase 2 */
    /* --primary (old), --sidebar-primary, etc. */
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --surface: 0 0% 10%;
      --on-surface: 0 0% 90%;
      /* ... */
    }
  }
}
````

Deliverables Phase 1:

✅ tailwind.config.ts with new token names
✅ New CSS variables in :root
✅ Old utilities still work (no breaking changes)
✅ Both token systems coexist

Testing Phase 1:

`npm run build  # Should succeed`
`npm run dev    # Should look identical`

#### Phase 2: Component & Utility Classes (Days 3–5) – Gradual Refactoring
Goal: Add new component classes without removing old ones yet.

    - Create @layer components for layout shells (.app-shell, .app-main, .sidebar)
    - Create @layer utilities for gradients and animations
    - Refactor high-traffic layouts first (MainLayout, Sidebar, Dashboard)
    - Update JSX to use new classes

**Step 2.1: Add all @layer components and @layer utilities to index.css**
````css
@layer components {
  /* ─── App Shell ─── */
  .app-shell {
    @apply flex min-h-screen flex-col;
  }
  
  .app-body {
    @apply relative flex flex-1;
  }
  
  .app-main {
    @apply flex flex-1 flex-col overflow-auto transition-[padding] duration-base;
  }
  
  .app-main--sidebar-open {
    @apply pl-64;
  }
  
  .app-main--sidebar-collapsed {
    @apply pl-12 lg:pl-16;
  }
  
  .app-content {
    @apply flex flex-1 flex-col gap-md p-md md:p-lg lg:p-xl;
  }
  
  /* ─── Cards & Sections ─── */
  .card {
    @apply rounded-lg border border-border bg-surface p-lg shadow-sm;
  }
  
  .card--hoverable {
    @apply cursor-pointer transition-[box-shadow,transform] duration-fast hover:shadow-md hover:translate-y-[-2px];
  }
  
  .section {
    @apply flex flex-col gap-lg;
  }
  
  .section-title {
    @apply text-lg font-semibold text-on-surface;
  }
  
  /* ─── Buttons (base only) ─── */
  .btn {
    @apply rounded-md px-4 py-2 font-medium transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  /* ─── Sidebar ─── */
  .sidebar {
    @apply fixed left-0 top-0 h-screen w-64 flex-col overflow-auto border-r border-border bg-surface transition-[width] duration-base;
  }
  
  .sidebar--collapsed {
    @apply w-12 lg:w-16;
  }
}

@layer utilities {
  /* Gradients */
  .bg-app-gradient {
    background-image: linear-gradient(to top, hsl(var(--surface)), hsl(var(--primary)));
  }
  
  .bg-gradient-secondary {
    background-image: linear-gradient(
      135deg,
      hsl(var(--secondary)),
      hsl(var(--secondary-hover))
    );
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn var(--duration-base) ease-out;
  }
  
  .slide-up {
    animation: slideUp var(--duration-base) ease-out;
  }
  
  /* Scroll utilities */
  .scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
}
````
**Step 2.2: Refactor layouts first (highest impact, lowest risk)**
Refactor in this order:

1. MainLayout.tsx – Core shell
2. Sidebar.tsx – Navigation
3. Dashboard.tsx – Page layout
4. Other components incrementally

Example refactor for MainLayout.tsx:
````tsx
// filepath: src/components/layouts/MainLayout.tsx
// ...existing imports...

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      
      <div className="app-body">
        <main
          className={cn(
            "app-main bg-app-gradient",
            sidebarOpen ? "app-main--sidebar-open" : "app-main--sidebar-collapsed"
          )}
        >
          <div className="app-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
````
**Step 2.3: Do NOT delete old component code yet**
Keep old layouts/styles in place. Only add new component classes to index.css

Deliverables Phase 2:

✅ index.css has all new @layer components and @layer utilities
✅ MainLayout, Sidebar, Dashboard refactored to use new classes
✅ Old component code still exists (for fallback if needed)
✅ No visual changes (should match old layout exactly)

Testing Phase 2:
`npm run build`
`npm run dev`
`# Visual regression test: Compare before/after screenshots`

Rollback if needed:

Revert the component refactors in Step 2.2, keep CSS in index.css (no harm)

#### Phase 3: Variant System (Days 6–8)
Phase 3 builds on the component classes from Phase 2 by introducing variant patterns for dynamic styling. This allows components like Button, Card, and Badge to accept props that control color, size, and state without verbose className strings.

    - Build Button.tsx with buttonVariants
    - Build Card.tsx with cardVariants
    - Build Badge.tsx with badgeVariants
    - Apply to all component instances

Goals:
- Create reusable variant objects in TypeScript
- Implement variant props in React components
- Ensure all variants have corresponding CSS support
- Maintain type safety and IDE autocomplete
- Keep GSAP selectors stable across variants

**Step 3.1: Create Button Component with Variant**
````tsx
import { cn } from "@/lib/utils";
import React from "react";

// Define all button variants
const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
  secondary: "bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active",
  danger: "bg-danger text-white hover:bg-danger-active",
  ghost: "bg-transparent text-on-surface hover:bg-surface-alt",
  outline: "border border-border text-on-surface hover:bg-surface-alt",
} as const;

// Define all button sizes
const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

// Define all button states (optional: for compound classes)
const buttonStates = {
  default: "",
  loading: "opacity-50 cursor-not-allowed",
  disabled: "opacity-50 cursor-not-allowed",
} as const;

// Type-safe props
type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;
type ButtonState = keyof typeof buttonStates;

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  state = "default",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "btn",                              // Base component class (from index.css)
        buttonVariants[variant],            // Variant colors
        buttonSizes[size],                  // Size
        buttonStates[state],                // State
        disabled && "opacity-50 cursor-not-allowed",
        className                           // User overrides
      )}
      disabled={disabled}
      {...props}
    />
  );
}

// Export variants for external reference (e.g., GSAP selectors)
export { buttonVariants, buttonSizes, buttonStates };
````
CSS Support in index.css:
````css
@layer components {
  /* Base button (no variant-specific colors) */
  .btn {
    @apply rounded-md font-medium transition-colors duration-fast;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    /* Padding is handled by size utilities, not here */
  }
}
````
Usage in JSX:
````jsx
// Default: primary, md
<Button>Click me</Button>

// Danger variant, large size
<Button variant="danger" size="lg">Delete</Button>

// Ghost style, small
<Button variant="ghost" size="sm">Cancel</Button>

// Disabled state
<Button disabled>Disabled</Button>

// With custom className override
<Button variant="primary" className="w-full">Full Width</Button>
````

**Step 3.2: Create Card Component with Variant**
````tsx
import { cn } from "@/lib/utils";
import React from "react";

// Define all card variants
const cardVariants = {
  default: "bg-surface border border-border",
  elevated: "bg-surface shadow-lg",
  filled: "bg-surface-alt",
  outline: "bg-transparent border-2 border-border",
} as const;

// Define card padding options
const cardPadding = {
  none: "p-0",
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
  xl: "p-xl",
} as const;

// Define card states
const cardStates = {
  default: "",
  hoverable: "card--hoverable",
  interactive: "cursor-pointer hover:shadow-md transition-shadow duration-fast",
} as const;

// Type-safe props
type CardVariant = keyof typeof cardVariants;
type CardPadding = keyof typeof cardPadding;
type CardState = keyof typeof cardStates;

type CardProps = {
  variant?: CardVariant;
  padding?: CardPadding;
  state?: CardState;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
  variant = "default",
  padding = "lg",
  state = "default",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "card",                        // Base component class (from index.css)
        cardVariants[variant],         // Variant styles
        cardPadding[padding],          // Padding size
        cardStates[state],             // State modifiers
        className                      // User overrides
      )}
      {...props}
    />
  );
}

// Export variants for external reference (e.g., GSAP selectors)
export { cardVariants, cardPadding, cardStates };
````

CSS Support in index.css:
````css
@layer components {
  /* ...existing code... */
  
  /* ─── Card Base ─── */
  .card {
    @apply rounded-lg border border-border bg-surface shadow-sm;
    /* Padding is handled by padding utilities, not here */
  }
  
  .card--hoverable {
    @apply cursor-pointer transition-[box-shadow,transform] duration-fast;
    @apply hover:shadow-md hover:translate-y-[-2px];
  }
}
````

Usage in JSX:
````jsx
// Default card with default padding (lg)
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Elevated variant with extra padding
<Card variant="elevated" padding="xl">
  <h2>Important Content</h2>
  <p>This card stands out with a shadow</p>
</Card>

// Filled variant with hoverable state
<Card variant="filled" state="hoverable">
  <div className="flex items-center gap-4">
    <img src="icon.svg" alt="Icon" />
    <span>Hover to see effect</span>
  </div>
</Card>

// Outline variant with no padding (for custom layouts)
<Card variant="outline" padding="none">
  <img src="banner.jpg" alt="Banner" className="w-full" />
  <div className="p-md">
    <h3>Custom Layout</h3>
    <p>Image with custom padding below</p>
  </div>
</Card>

// Interactive card with small padding
<Card state="interactive" padding="sm" onClick={() => console.log('clicked')}>
  <div className="text-center">
    <p className="text-sm">Click me</p>
  </div>
</Card>

// Card with custom className override
<Card variant="elevated" className="max-w-md mx-auto">
  <h3>Centered Card</h3>
  <p>This card is centered with max width</p>
</Card>

// Card as a link wrapper
<Card variant="default" state="hoverable" padding="md">
  <a href="/details" className="block">
    <h4 className="font-semibold mb-2">Clickable Card</h4>
    <p className="text-muted">Click anywhere to navigate</p>
  </a>
</Card>
````

**Step 3.3: Create Badge Component with Variant**
````tsx
import { cn } from "@/lib/utils";
import React from "react";

// Define all badge variants
const badgeVariants = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-success text-white",
  danger: "bg-danger text-white",
  warning: "bg-warning text-white",
  muted: "bg-muted text-white",
  outline: "border border-border text-on-surface bg-transparent",
} as const;

// Define badge sizes
const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
} as const;

// Define badge shapes
const badgeShapes = {
  default: "rounded-md",
  pill: "rounded-full",
  square: "rounded-sm",
} as const;

// Type-safe props
type BadgeVariant = keyof typeof badgeVariants;
type BadgeSize = keyof typeof badgeSizes;
type BadgeShape = keyof typeof badgeShapes;

type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Badge({
  variant = "primary",
  size = "md",
  shape = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",                       // Base component class (from index.css)
        badgeVariants[variant],        // Variant colors
        badgeSizes[size],              // Size
        badgeShapes[shape],            // Shape
        className                      // User overrides
      )}
      {...props}
    />
  );
}

// Export variants for external reference (e.g., GSAP selectors)
export { badgeVariants, badgeSizes, badgeShapes };
````
CSS Support in index.css:
````css
@layer components {
  /* ...existing code... */
  
  /* ─── Badge Base ─── */
  .badge {
    @apply inline-flex items-center justify-center font-medium;
    @apply transition-colors duration-fast;
  }
}
````

Usage in JSX:
````jsx
// Card examples
<Card>Default card</Card>

<Card variant="elevated" padding="xl">
  Elevated card with extra padding
</Card>

<Card variant="filled" state="hoverable">
  Hoverable filled card
</Card>

<Card variant="outline" padding="none">
  <img src="..." alt="..." />
  <div className="p-md">
    Custom padding structure
  </div>
</Card>

// Badge examples
<Badge>Default</Badge>

<Badge variant="success" size="sm" shape="pill">
  Success
</Badge>

<Badge variant="danger" size="lg">
  Error
</Badge>

<Badge variant="outline" shape="square">
  Outlined
</Badge>

<Badge variant="warning" className="uppercase">
  Custom styling
</Badge>
````

## 4. GSAP Integration (Days 9–10)
   - Update GSAP selectors to use component classes
   - Test animations with new structure
   - Remove inline styles from animated elements


### 4.1 Requirements

- DOM elements must expose **stable semantic class hooks**.
- GSAP must be able to target elements without parsing Tailwind utility soup.
- Animations must reference component classes, not inline utilities.

### 4.2 Preferred Output

````html
<button class="btn btn-primary"></button>
<div class="card card--hoverable"></div>
<section class="section"></section>
<div class="sidebar sidebar--collapsed"></div>
````

### 4.3 GSAP Implementation Pattern

````ts
// filepath: src/animations/sidebar.ts
import gsap from "gsap";

export function animateSidebarToggle(isOpen: boolean) {
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".app-main");
  
  gsap.to(sidebar, {
    width: isOpen ? "16rem" : "3rem", // 64px / 12px
    duration: 0.3,
    ease: "power2.inOut",
  });
  
  gsap.to(main, {
    paddingLeft: isOpen ? "16rem" : "3rem",
    duration: 0.3,
    ease: "power2.inOut",
  });
}

export function animateCardHover(card: HTMLElement) {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(card, {
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    y: -4,
    duration: 0.15,
  });
  
  card.addEventListener("mouseenter", () => tl.play());
  card.addEventListener("mouseleave", () => tl.reverse());
}
````

### 4.4 Avoid this

````html
<!-- ❌ GSAP cannot reliably target this -->
<button class="px-4 py-2 bg-primary text-white hover:bg-secondary rounded-md"></button>

<!-- ✅ GSAP can target this -->
<button class="btn btn-primary"></button>
````

The class structure must support:

- Timeline-based animations
- Group selection
- Long-term refactors without animation breakage

## 5. Verification Checklist
- No duplicated CSS variable definitions
- All colors reference tailwind.config.ts
- All component classes have semantic names (not visual-only)
- GSAP selectors match .btn, .card, .sidebar, etc.
- No mega-classes (e.g., @apply flex bg-primary px-4 py-2 ...)
- Variant system covers all component types
- Tree-shaking still works (no unused classes)

## 6. Expected Deliverables

The refactor must produce:

- Design Token Strategy: All tokens centralized in tailwind.config.ts + index.css
- CSS Variable Setup: Semantic naming, minimal duplication, HSL format for theming
- Component Classes: .app-shell, .card, .btn, .sidebar, .section with stable hooks
- Utility Classes: .bg-app-gradient, .fade-in, .slide-up for reuse
- Variant System: buttonVariants, cardVariants objects with TS types
- Clean JSX: Replace verbose utility strings with component class + variant props
- GSAP-Ready DOM: All selectors based on component classes, no utility parsing needed
- Type Safety: Full TS support for variant props


## 7. Best Practices & Constraints

- No over-abstraction: Each @apply must express real intent, not just bundle utilities
- Avoid one-off classes: If a class is used once, keep it as utilities in JSX
- Semantic naming: .card over .rounded-shadow, .btn-primary over .bg-primary
- Tailwind JIT friendly: Avoid string concatenation for class names
- Tree-shakeable: Unused component classes will be purged by Tailwind
- Stateful classes: Use BEM modifiers (.app-main--sidebar-open) for state-driven styling
- React + TypeScript: Assume modern tooling; use cn() utility for class merging


## 8. File Structure

src/
├── styles/
│   ├── index.css                    // @layer components, utilities, base
│   ├── animations.css               // @keyframes (optional separate file)
│   └── variables.css                // CSS variables (optional separate file)
├── components/
│   ├── Button.tsx                   // buttonVariants
│   ├── Card.tsx                     // cardVariants
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   └── ...
├── animations/
│   ├── sidebar.ts                   // GSAP animations
│   ├── cards.ts
│   └── index.ts
├── lib/
│   └── utils.ts                     // cn() utility
├── tailwind.config.ts               // Theme tokens
└── ...