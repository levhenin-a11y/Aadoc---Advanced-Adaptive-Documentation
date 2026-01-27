
# Cahier des charges — Conversion PSD → HTML/Tailwind

## 1. Contexte
Besoin de transformer une maquette **PSD** en une page **HTML/Tailwind** fidèle, responsive, accessible et performante.

## 2. Périmètre
- 1 page marketing (Header, Hero, 1 section "Fonctionnalités", 1 section CTA, Footer)
- Intégration des assets fournis (logos, icônes, images)
- Respect de la charte graphique et de la grille définie dans la maquette

## 3. Livrables
- Code source : `public/index.html`, `tailwind.config.js`, dossier `public/assets/`
- Documentation : `README.md`, `Guide technique`
- Version initiale + itérations de corrections (jusqu'à 2 cycles inclus)

## 4. Exigences fonctionnelles
- Navigation principale avec liens d'ancrage
- Formulaire de contact minimal (email + message)
- Comportements hover/focus cohérents avec la maquette

## 5. Exigences non-fonctionnelles
- **Accessibilité** : respect WCAG AA (contrastes, focus, alternatives textuelles)
- **Responsive** : support mobile ≥ 360px jusqu'au desktop ≥ 1440px
- **Performance** : score Lighthouse ≥ 90 en Performance et Accessibilité sur desktop

## 6. Contraintes techniques
- Utilisation de **Tailwind CSS** (CDN en dev, build en prod avec purge)
- Pas de framework JS requis (site statique)
- Images optimisées (WebP prioritaire, @2x pour écrans retina)

## 7. Planning indicatif
- J0 : réception des assets (PSD, polices, palette)
- J1–J2 : intégration initiale
- J3 : revue/retours
- J4 : corrections & livraison v1.0

## 8. Critères d'acceptation
- Conformité visuelle ≥ 95% par rapport aux captures PSD fournies
- Validation A11y (focus visibles, labels, alt, contrastes)
- HTML valide (W3C) et CSS purgé en production

## 9. Évolutions (optionnel)
- Ajout d'un dark mode basé sur tokens Tailwind
- Internationalisation (i18n) du contenu
- Passage à un framework (Next.js/Vue/Nuxt) si besoin futur
