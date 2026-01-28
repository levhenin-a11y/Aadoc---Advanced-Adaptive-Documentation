## Refactoring

## 1. Centralize Design Tokens

- - Avoid duplicated CSS variables (e.g. '--primary', '--sidebar-primary,' '--ring, --header-background', '--sidebar-primary-foreground' pointing to the same color).
    - Introduce a _single source of truth_ for colors, radii, spacing, shadows, and transitions.
    - Use semantic tokens (--color-surface, --color-accent, --color-interactive) instead of context-specific duplicates.
    - Use a **context-mapping layer** (sidebar/header/etc. reference core tokens, never redefine values)
    - Tokens must live primarily in tailwind.config.ts, with minimal, well-structured CSS variables in index.css.

### 1.1 Reduce Long Utility Class Chains

- 1. Avoid verbose class strings like:'flex-1 overflow-auto flex flex-col transition-\[padding\] duration-300'  

  - Replace them with meaningful abstractions using:
    - @layer components
    - @layer utilities
    - Others if needed
  - Improve readability and intent clarity in JSX/HTML.

### 1.2 Examples

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

hsl(var(--background)),

hsl(var(--primary))

);

}

}

````

Now it's reusable, targetable, and animatable.

## 2. Introduce Custom Utility & Component Classes

- - Create reusable classes for recurring patterns:
        - layout containers
        - sections
        - cards
        - buttons
        - panels
    - Use @apply responsibly: no mega-classes, prefer [Single Responsibility Principle](https://www.google.com/search?q=Single+Responsibility+Principle&sca_esv=a87a460474998c14&rlz=1C1GCEA_enBE1144BE1145&sxsrf=ANbL-n5xlVeU40XzTFZ9A88-fLWwKFLwIQ%3A1769534269452&ei=PfN4abCrG5iikdUPqZma-Qg&ved=2ahUKEwjR99HynKySAxVvMvsDHVkNK5cQgK4QegQIARAC&uact=5&oq=what+are+mega-classes+in+code&gs_lp=Egxnd3Mtd2l6LXNlcnAiHXdoYXQgYXJlIG1lZ2EtY2xhc3NlcyBpbiBjb2RlMgcQIRgKGKABMgcQIRgKGKABMgcQIRgKGKABMgcQIRgKGKABSNYMUNcFWI8JcAF4AZABAJgBiwGgAYwDqgEDMy4xuAEDyAEA-AEBmAIFoAKWA8ICChAAGEcY1gQYsAOYAwCIBgGQBgiSBwM0LjGgB84RsgcDMy4xuAeUA8IHAzIuM8gHBYAIAQ&sclient=gws-wiz-serp&mstk=AUtExfBlY720E1QEy22IzXOw_VV8ycm9ia1kUHQX5o9j5MKdu_gq2OaLA1NFFAHrwfUTK2eAVVxoDeUAqdFslPHcvjrkMioUhXNBIf66-Fk9ORqaAPQULXcqfuDe-fJeDUfapy0wNR9oY9Mw0OAN5E7hiEb956p99OoWo0vx5sJjCjoj2Dch-SoXY9hMDBbMdCeUipv-009utYbkHIGXn2o3o5EsI32yQ5Afje0xxQ2oUjAqsjs7hU3je0uGNThj2GH0n8Qj0h6E_DKFJHgYDUcjL5c_&csui=3) (SRP) , no over-abstraction).
    - Place these in index.css or App.css under proper Tailwind layers.

### 2.1 Example for refactoring 'MainLayout.tsx'

Instead of:

````tsx

<div className="flex flex-col min-h-screen">

````

Use:

````tsx

<div className="app-shell">

````

When class app-shell has been defined in index.css, as following:

````css

@layer components {

/\* App shell \*/

.app-shell { @apply flex min-h-screen flex-col; }

.app-body { @apply relative flex flex-1; }

/\* Main content area \*/

.app-main { @apply flex flex-1 flex-col overflow-auto transition-\[padding\] duration-300; }

.app-main--sidebar-open { @apply pl-64; }

.app-main--sidebar-collapsed { @apply pl-12 lg:pl-16; }

.app-content { @apply flex flex-1 flex-col p-4 md:p-6 lg:p-8; } }

````

Taking the CSS here above into consideration:

````tsx

<main

className={cn(

"flex-1 overflow-auto flex flex-col transition-\[padding\] duration-300",

sidebarOpen ? "pl-64" : "pl-12 lg:pl-16"

)}

style={{ backgroundImage: "linear-gradient(to top, hsl(var(--background)), hsl(var(--primary)))" }}
>

````

Must be refactored in:

````tsx

<main

className={cn(

"app-main bg-app-gradient",

sidebarOpen

? "app-main--sidebar-open"

: "app-main--sidebar-collapsed"

)}
>

````

Same logic for each verbose, repetitive styling. Refactor via '@apply directives' in an adequate .css file to be able to call and target the classes whenever needed.

## 3. Component Variant System

Implement a variant system for components (especially buttons and cards).

Consider:

- Introduce primary / secondary / danger variants
- Variants extend a base component
- Variants are class-based
- Variants are composable and scalable
- Variants do not redefine base layout or structure

Variants should be:

- Declarative
- Easy to extend
- Class-based (not inline styles)

Variants must compose cleanly with base component classes.

### 3.1 Examples (illustrative only)

DOM elements should expose stable, semantic class hooks.

````ts

const buttonVariants = {

primary: "bg-primary text-on-primary hover:bg-primary-hover",

secondary: "bg-muted text-on-muted hover:bg-muted-hover",

danger: "bg-danger text-white hover:bg-danger-hover",

};

````

### 3.2 Example React Implementation

````tsx

import { cn } from "@/lib/utils"; 

  

type ButtonProps = { 

  variant?: keyof typeof buttonVariants; 

} & React.ButtonHTMLAttributes<HTMLButtonElement>; 

  

export function Button({ 

  variant = "primary", 

  className, 

  ...props 

}: ButtonProps) { 

  return ( 

    <button 

      className={cn("btn", buttonVariants[variant], className)} 

      {...props} 

    /> 

  ); 

} 

````

## 4. GSAP-Friendly Markup (Critical)

### 4.1 Requirements

- DOM elements must expose **stable semantic class hooks**.
- GSAP must be able to target elements without parsing Tailwind utility soup.

### 4.2 Preferred Output

````html

<button class="btn btn-primary"></button> 
<div class="card"></div> 
<section class="section"></section>

````

### 4.3 Avoid

````html

<button class="px-4 py-2 bg-primary text-white hover:bg-secondary"></button> 

````

The class structure must support:

- Timeline-based animations
- Group selection
- Long-term refactors without animation breakage

## 5. Expected Deliverables

The refactor must produce:

- A clear design-token strategy
- A clean and minimal CSS variable setup
- Well-structured Tailwind layers
- Semantic component classes
- A scalable variant system
- Readable JSX with minimal inline utilities
- GSAP-ready DOM selectors

## 6. Best Practices & Constraints

- Do not over-abstract with @apply
- Avoid one-off component classes
- Prefer semantic naming over visual naming
- Keep everything compatible with Tailwind JIT and tree-shaking
- Assume React + TypeScript environment

## 7. Output Style

- Be opinionated and implementation-focused
- Use concrete examples
- Avoid generic Tailwind explanations
- Think like a design-system engineer, not a tutorial author