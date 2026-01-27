
# PSD → HTML/Tailwind

Ce dépôt contient la conversion d'une maquette **Photoshop (PSD)** en une page **HTML + Tailwind CSS** fidèle, responsive et accessible.

## Sommaire
- [Objectif](#objectif)
- [Aperçu](#aperçu)
- [Structure du projet](#structure-du-projet)
- [Démarrage rapide](#démarrage-rapide)
- [Charte & Design tokens](#charte--design-tokens)
- [Accessibilité](#accessibilité)
- [Performances](#performances)
- [Licence](#licence)

## Objectif
Transformer une maquette **PSD** en une implémentation web **propre** et **maintenable** à l'aide de **Tailwind CSS**, en respectant la typographie, les couleurs, les espacements et la grille définis par la maquette.

## Aperçu
La page inclut :
- Header (logo, navigation, CTA)
- Hero (titre, sous-titre, illustration)
- Section "Fonctionnalités"
- Section CTA
- Footer (liens, contact)

## Structure du projet
```text
.
├── public/
│   ├── assets/
│   │   ├── logo.svg
│   │   ├── hero@2x.webp
│   │   ├── icon-1.svg
│   │   ├── icon-2.svg
│   │   └── icon-3.svg
│   └── index.html
├── tailwind.config.js
├── package.json (optionnel, si build)
└── README.md
```

## Démarrage rapide
### Option A — via CDN (développement rapide)
Ouvrez `public/index.html` dans votre navigateur.

### Option B — Build Tailwind pour la production
1. Installez les dépendances (si un `package.json` est fourni) :
   ```bash
   npm install
   ```
2. Générez le CSS purgé/minifié :
   ```bash
   npm run build
   ```

## Charte & Design tokens
Les couleurs, polices et espacements sont centralisés dans `tailwind.config.js` (ex. tokens `brand`, `accent`, `ink`).

## Accessibilité
- HTML sémantique (landmarks `header`, `main`, `footer`, `nav`).
- Contrastes vérifiés, états focus visibles.
- Attributs `alt` sur les images pertinentes.

## Performances
- Images optimisées (WebP quand possible) + lazy-loading si galerie.
- Purge des classes Tailwind en production pour réduire la taille CSS.

## Licence
À définir selon votre contexte (privé/interne par défaut).
