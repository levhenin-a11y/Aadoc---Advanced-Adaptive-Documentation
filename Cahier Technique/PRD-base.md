# site PRD (Product Requirement Document) - étape MVP

**Important:**
- Le MVP doit être un site statique ne nécessitant aucun framework JavaScript.
- Une montée en complexité est prévue dans les phases 1 et 2, avec l’intégration de Svelte pour la logique interactive et GSAP pour les animations avancées.
- Le code doit être organisé de manière à faciliter cette transition sans refonte majeure.
- Pas de base de données dans cette version MVP.
- L’utilisation de classes utilitaires Tailwind est encouragée. Pas de CSS custom sauf exceptions (ex: reset, animations, overrides).
- Le site doit inclure des balises meta de base (title, description, viewport).
- Support Chrome, Firefox, Safari, Edge (versions récentes).
- Structure recommandée :
/index.html, /login.html, /assets/, /css/, /js/.
- Le build Tailwind doit utiliser content: ["./*.html"] pour purger les classes inutilisées.
- Le site doit être utilisable et lisible sur mobile, tablette et desktop sans dégradation majeure.


## 1 // Global Description

### 1.1 // **En général: design, typos, couleurs, esthétique, images**
- Style épuré
- Duo de typos: Roboto (sans-serif) + Infrared
- Breakpoints sont les breakpoints standards selon Tailwind CSS.
- Le site démarre par une page de login, pour ensuite mener vers une page de type 'index' (avec design similaire, bien entendu). Mockups fournies dans le dossier 'EXPORTS'.
- Le layout suit une grille fluide basée sur les espacements Tailwind (4px scale). Les marges internes/externes doivent respecter les espacements définis dans les mockups.


**Liens Google Fonts:**

Roboto et ses valeurs nécessaires:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100..900&display=swap" rel="stylesheet">
```

Merriweather et ses valeurs nécessaires:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kedebideri:wght@400;500;600;700;800;900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet">
```

**Couleurs:**
- Via tailwind.config.js
- Les références des couleurs en hexadécimal sont listées ici dessous.
- Un thème light et un thème dark. Le dark mode est activé via la classe dark sur l’élément <html>.
- Toutes les couleurs doivent provenir des tokens définis dans .

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // --- LIGHT MODE ---
        primary: { DEFAULT: "#3B5BDB", foreground: "#FFFFFF" },
        accent: { DEFAULT: "#748FFC", foreground: "#FFFFFF" },
        surface: { DEFAULT: "#FFFFFF", alt: "#F8FAFC", muted: "#E2E8F0" },
        ink: { DEFAULT: "#0F172A", muted: "#475569", subtle: "#94A3B8" },
        border: { DEFAULT: "#CBD5E1", muted: "#E2E8F0" },

        // --- DARK MODE ---
        dark: {
          primary: {
            DEFAULT: "#5C7CFF",        // un peu plus clair pour le sombre
            foreground: "#FFFFFF",
          },

          accent: {
            DEFAULT: "#8DA4FF",
            foreground: "#FFFFFF",
          },

          surface: {
            DEFAULT: "#0F172A",        // bleu nuit
            alt: "#1E293B",            // surface secondaire
            muted: "#334155",          // surface tertiaire
          },

          ink: {
            DEFAULT: "#F1F5F9",        // texte principal
            muted: "#CBD5E1",          // texte secondaire
            subtle: "#94A3B8",         // texte désactivé
          },

          border: {
            DEFAULT: "#334155",
            muted: "#475569",
          },

          success: "#34D399",
          warning: "#FBBF24",
          danger: "#F87171",
          info: "#60A5FA",
        },
      },
    },
  },
};
```

**Périmètre/Structure:**

- 1 page login (div container contenant 2 divs: une avec image-logo, l'autre avec les champs de connexion. En 'flex-col' (via tailwind) sur tout type d'écran 'lg (1024px)', 'xl (1280px)', '2xl (1536px)', sauf sur écran 'sm (640px)'). Breakpoints standards tailwind. Sur très petits écrans, l'image-logo peut même disparaître.
- 1 page index (main)
- Intégration des assets fournis (logo et images)
- Les icônes seront créées ultérieurement. Format attendu : SVG, stroke 1.5px ou 2px selon la direction artistique finale.
- Respect de la charte graphique et de la grille définie dans ce PRD - étape MVP.

Les mockups des pages se trouvent clairement listées et nommées dans le dossier 'EXPORTS'.

**login page:**
Structure comme indiquée sur l'image 'structure-login-page.png' dans le dossier 'EXPORTS'.
Cette page mène au clic sur le bouton 'login' à la page principale index (main page).
Donc, le formulaire de login ne valide pas les champs (pas de JS à ce stade).
Le bouton redirige systématiquement vers la page index.
Le bouton login → redirection simple (pas d’auth réelle à l'étape MVP)

**index (main) page:**
Structure comme indiquée sur l'image 'structure-index-page.png' dans le dossier 'EXPORTS'.
Le menu de gauche → collapsible
Le menu du dessus (top menu) n'est pas collapsible!

**images*:**
logo: dans le dossier 'EXPORTS'
autres images: à venir en cours de développement. Images pas encore créées.

## 2 // Mockups des pages

Les mockups servent de référence visuelle. Les proportions, marges et alignements doivent être respectés autant que possible.

Les mockups desktop servent de base. Les versions mobile/tablette doivent suivre la logique Tailwind responsive.

### 2.1 // **Login page**: based on provided .PNG

The PNG are clearly named:
- login-page-Desktop-01.png
- login-page-Ipad-horizontal-01.png
- login-page-Ipad-vertical-01.png
- login-page-Laptop-01.png
- login-page-Mobile-Phone-01.png

*remarques*: l'image-logo à gauche présente dans les mockups n'est pas finale. Elle peut être remplacée par une image 'placeholder' lors des premières phases du projet si nécessaire.

### 2.2 // **Index (main) page**: based on provided .PNG
encore à faire !!
The PNG are clearly named:
- index-page-Desktop-01.png
- index-page-Ipad-horizontal-01.png
- index-page-Ipad-vertical-01.png
- index-page-Laptop-01.png
- index-page-Mobile-Phone-01.png

*remarques*: l'image-logo à gauche présente dans les mockups n'est pas finale. Elle peut être remplacée par une image 'placeholder' lors des premières phases du projet si nécessaire.

## 3 // Utilisation des standards Tailwind
- Échelle d'espacement par défaut (base 4px) : `1 = 0.25rem`, `2 = 0.5rem`, etc.
- Breakpoints : `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`, `2xl (1536px)`
- Tokens personnalisés dans `tailwind.config.js` (ex. `primary`, `accent`, `ink`, `border`, `surface`) + thème light/dark



## 4 // **Exigences fonctionnelles**
- Navigation principale avec liens d'ancrage (smooth)
- Comportements hover/focus cohérents avec la maquette
- Des parties de l'HTML pourront être transformées en composant Svelte plus tard.

## 5 // **Exigences non-fonctionnelles**
- **Accessibilité** : respect WCAG AA (contrastes, focus, alternatives textuelles)
- **Responsive** : support mobile ≥ 360px jusqu'au desktop ≥ 1440px
- **Performance** : score Lighthouse ≥ 90 en Performance et Accessibilité sur desktop

### 5.1 // Accessibilité (A11y)
- **ARIA** : `aria-label` sur la navigation, `sr-only` pour les labels cachés
- **Focus** : styles visibles (`focus:ring`, `focus:outline-none`)
- **Images** : `alt` descriptif pour les visuels informatifs
- **Contraste** : viser un ratio ≥ 4.5:1 pour le texte normal

## 6 // **Contraintes techniques**
- Utilisation de **Tailwind CSS** (CDN en dev, build en prod avec purge)
- Pas de framework JS requis (site statique)
- Images optimisées (WebP prioritaire, @2x pour écrans retina)

## 7 // **Critères d'acceptation**
- Conformité visuelle ≥ 95% par rapport aux captures PSD fournies
- Validation A11y (focus visibles, labels, alt, contrastes)
- HTML valide (W3C) et CSS purgé en production

## 8 // **Évolutions (optionnel)**
- Passage à un framework (Svelte pour composants réutilisables et logique interactive / GSAP pour animations) dans le futur (après cette version MVP).
Dans ce sens: le HTML doit être structuré de manière à pouvoir être découpé en composants Svelte (header, sidebar, card, button, etc.).
- Une ou plusieurs base de données seront ajoutées via Supabase dans le futur (après cette version MVP)
