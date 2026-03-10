# PRD – MVP (Product Requirement Document)

**Projet :** Site Web – Version MVP (Statique)  
**Auteur :** Vincent HENIN  
**Version :** 1.0 (MVP)  
**Date :** 09/01/2025


---

## 0. Objectifs du MVP

Le MVP consiste à livrer une première version statique du site, sans framework JavaScript, afin de poser les fondations visuelles, structurelles et techniques du projet.

Les versions ultérieures intégreront progressivement :

- **Svelte** (logique interactive, composants réutilisables)
- **GSAP** (animations avancées)
- **Supabase** via Lovable, https://lovable.dev/, (base de données et authentification)

---

## 1. Contraintes générales

- **Site statique** : aucun framework JS (pas de React, Vue, Svelte, etc.)
- **Pas de base de données**
- **HTML + Tailwind CSS** uniquement (JS vanilla minimal autorisé)
- **Structure recommandée** :
  ```
  /index.html  
  /login.html  
  /assets/  
  /css/  
  /js/
  ```
- **Purge Tailwind obligatoire** :
  ```javascript
  content: ["./*.html"]
  ```
- **Compatibilité navigateurs** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Balises meta obligatoires** : `title`, `description`, `viewport`
- **Responsive complet** : mobile ≥ 360px → desktop ≥ 1440px
- **Utilisation exclusive des tokens Tailwind** pour les couleurs
- **Code organisé** pour faciliter une future migration vers Svelte

---

## 2. Design & Identité visuelle

### 2.1 Style général

- Style épuré, moderne, lisible
- Grille basée sur l'échelle Tailwind (4px scale)
- Marges internes/externes conformes aux mockups
- **Breakpoints** : `sm`, `md`, `lg`, `xl`, `2xl` conformes aux breakpoints tailwind classiques

### 2.2 Typographies

- **Roboto** (sans-serif)
- **Merriweather** (serif)
- Chargées via Google Fonts :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet">
```

### 2.3 Couleurs & Thèmes

- Thème **light** + **dark**
- Dark mode activé via la classe `dark` sur `<html>`
- Palette définie dans `tailwind.config.js` :

```javascript
// LIGHT MODE
primary: { DEFAULT: "#3B5BDB", foreground: "#FFFFFF" },
accent: { DEFAULT: "#748FFC", foreground: "#FFFFFF" },
surface: { DEFAULT: "#FFFFFF", alt: "#F2F2F2", muted: "#E2E8F0" },
ink: { DEFAULT: "#0F172A", muted: "#6b6b6b", subtle: "#94A3B8" },
border: { DEFAULT: "#CBD5E1", muted: "#E2E8F0" },

// UTILITY COLORS (both modes)
success: "#34D399",
warning: "#FBBF24",
danger: "#F87171",
info: "#60A5FA",

// DARK MODE
dark: {
  primary: { DEFAULT: "#5C7CFF", foreground: "#FFFFFF" },
  accent: { DEFAULT: "#8DA4FF", foreground: "#FFFFFF" },
  surface: { DEFAULT: "#0F172A", alt: "#1E293B", muted: "#334155" },
  ink: { DEFAULT: "#F1F5F9", muted: "#CBD5E1", subtle: "#94A3B8" },
  border: { DEFAULT: "#334155", muted: "#6b6b6b" },
}
```

### 2.4 Icônes

- À créer ultérieurement
- **Format attendu** : SVG, stroke 1.5px ou 2px

### 2.5 Images

- Logo fourni dans le dossier `EXPORTS`
- Autres images : placeholders autorisés si images non-existantes à ce stade.

---

## 3. Structure des pages

### 3.1 Login Page

- Structure conforme ou similaire à:
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Connexion - Aadoc</title>
</head>
<body>

  <header>
    <!-- Optionnel : logo ou titre -->
    <h1>Aadoc</h1>
  </header>

  <main>
    <section aria-labelledby="login-title">
      <h2 id="login-title">Connexion</h2>

      <form action="/login" method="post">
        <div>
          <label for="username">Nom d’utilisateur *</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label for="password">Mot de passe *</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div>
          <input type="checkbox" id="remember" name="remember" />
          <label for="remember">Se souvenir de moi</label>
        </div>

        <button type="submit">Connexion</button>

        <nav aria-label="Liens d’assistance">
          <ul>
            <li><a href="/forgot-password">Mot de passe oublié ?</a></li>
            <li><a href="/signup">Pas encore de compte ?</a></li>
          </ul>
        </nav>
      </form>
    </section>
  </main>

  <footer>
    <nav aria-label="Liens légaux">
      <ul>
        <li><a href="/copyright">Copyright</a></li>
        <li><a href="/version">Version</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/disclaimer">Disclaimer</a></li>
      </ul>
    </nav>
  </footer>

</body>
</html>
```

- **Layout** :
  - 2 colonnes (image + formulaire)
  - passe en flex-row sur petits écrans
  - image-logo masquée sur très petits écrans (2xl) si nécessaire
- **Fonctionnement** : pas de validation JS
  - bouton Login → redirection simple vers `/index.html`

### 3.2 Index Page

- Structure conforme à `structure-index-page-Desktop-01.png`
- **Menu latéral gauche** : collapsible
- **Top menu** : non collapsible
- Contenu conforme aux mockups

### 3.3 Mockups

- Les mockups servent de **référence visuelle principale**
- Les mockups se trouvent dans le dossier `EXPORTS` et contiennent les termes `index-page` ou `login-page` pour bien indiquer s'il s'agit de la page index ou de la page login. Aussi, il est fait mention du format dans les titres: `Desktop` ou `Ipad-horizontal`, `Ipad-horizontal`, `Mobile-Phone`. Attention: la page index-page n'est exprimée qu'en deux formats: Desktop et Mobile-Phone; je laisse à l'intelligence artificielle le choix de gérer le layout de la page via tailwind pour que cela soit lisible sur tablette et laptop.
- Respect des proportions, marges, alignements
- Desktop = base ; mobile/tablette = responsive Tailwind

---

## 4. Standards Tailwind

- **Échelle d'espacement** :
  - `1` = 0.25rem, `2` = 0.5rem, etc.
- **Breakpoints** : `sm`, `md`, `lg`, `xl`, `2xl`
- **Utilisation obligatoire des tokens** :
  - `primary`, `accent`, `surface`, `ink`, `border`, etc.
- **Thème light/dark** intégré dans la config

---

## 5. Exigences fonctionnelles

- Navigation principale avec **scroll smooth**
- Comportements **hover/focus** conformes aux maquettes ou de manière classique
- HTML structuré pour une future conversion en composants Svelte

---

## 6. Exigences non-fonctionnelles

### 6.1 Accessibilité

- Respect **WCAG AA**
- `aria-label` sur la navigation
- `sr-only` pour labels cachés
- Focus visible (`focus:ring`)
- Contraste ≥ 4.5:1
- Images informatives : `alt` descriptif

### 6.2 Performance

- Score Lighthouse ≥ 90 (Performance + Accessibilité)
- Images optimisées : WebP prioritaire, versions @2x pour retina

### 6.3 Responsive

- Lisible et utilisable sur mobile, tablette et desktop

---

## 7. Critères d'acceptation

- ✅ Conformité visuelle ≥ 95% par rapport aux mockups
- ✅ Validation A11y (focus, labels, alt, contrastes)
- ✅ HTML valide W3C
- ✅ CSS purgé
- ✅ Responsive conforme

---

## 8. Évolutions prévues (hors MVP)

- **Passage à Svelte** (composants réutilisables + logique interactive)
- **Intégration de GSAP** (animations avancées)
- **Ajout d'une base de données via Supabase**
- Découpage du HTML en composants Svelte (`header`, `sidebar`, `card`, `button`, etc.)
