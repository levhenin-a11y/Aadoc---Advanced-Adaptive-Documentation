
# Guide technique — PSD → HTML/Tailwind

Ce document détaille la méthodologie, l'architecture et les bonnes pratiques appliquées pour convertir une maquette **Photoshop** en page **HTML + Tailwind CSS**.

## 1. Entrées attendues
- Fichier **PSD** (ou exports PNG/SVG des sections clés)
- **Polices** (fichiers ou liens Google/Adobe Fonts)
- **Palette de couleurs** (HEX/RGB)
- Grille (colonnes, gutters, marges) et **espacements** de référence
- États d'interaction (hover, focus, active)
- **Breakpoints** spécifiques si différents des standards Tailwind

## 2. Pipeline de conversion
1. **Analyse** de la maquette (typographie, couleurs, composants)
2. **Export des assets** depuis Photoshop :
   - Images en **WebP/PNG/JPEG** (selon transparence), versions **@2x** pour retina
   - Logos/icônes en **SVG** si disponibles
3. **Structure HTML sémantique** avec landmarks ARIA
4. **Stylage Tailwind** via classes utilitaires + thèmes étendus
5. **Accessibilité** : contrastes, focus, textes alternatifs
6. **Optimisation** : purge CSS, minification, compression image

## 3. Standards Tailwind
- Échelle d'espacement par défaut (base 4px) : `1 = 0.25rem`, `2 = 0.5rem`, etc.
- Breakpoints : `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`, `2xl (1536px)`
- Tokens personnalisés dans `tailwind.config.js` (ex. `brand`, `accent`, `ink`)

**Exemple de configuration** :
```js
// tailwind.config.js
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: "#0EA5E9",
        accent: "#F59E0B",
        ink: { 900: "#0F172A", 700: "#334155", 500: "#64748B" }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
}
```

## 4. Structure HTML de référence
```html
<!-- Header / Nav -->
<header class="border-b border-gray-200"> ... </header>
<!-- Hero -->
<section class="relative overflow-hidden"> ... </section>
<!-- Features -->
<section id="features" class="mx-auto max-w-7xl px-4 py-16"> ... </section>
<!-- CTA -->
<section class="bg-gray-50"> ... </section>
<!-- Footer -->
<footer class="border-t border-gray-200"> ... </footer>
```

## 5. Accessibilité (A11y)
- **ARIA** : `aria-label` sur la navigation, `sr-only` pour les labels cachés
- **Focus** : styles visibles (`focus:ring`, `focus:outline-none`)
- **Images** : `alt` descriptif pour les visuels informatifs
- **Contraste** : viser un ratio ≥ 4.5:1 pour le texte normal

## 6. Performances & qualité
- Purge Tailwind en production (via `content` dans la config)
- **Images** : WebP, compression, dimensions adaptées, lazy-loading sur listes longues
- **Audit** : vérifier avec **Lighthouse** (Performance, Accessibilité, SEO, Best Practices)

## 7. Déploiement
- Hébergement statique (Azure Static Web Apps, GitHub Pages, Netlify, Vercel)
- Cache long pour les assets fingerprintés, entêtes `Cache-Control`

## 8. Maintenance
- Découper en composants réutilisables (si passage ultérieur à React/Vue)
- Centraliser tokens (couleurs, typo) dans `tailwind.config.js`
- Documenter les variantes responsives et états (hover/focus/disabled)
