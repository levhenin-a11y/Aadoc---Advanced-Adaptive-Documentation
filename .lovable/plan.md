

# Plan d'implementation

Ce plan couvre trois ameliorations :
1. Validation avancee du formulaire Register avec Zod + react-hook-form
2. Remplacement du champ "Entite hierarchique" par une liste deroulante
3. Redirection automatique apres connexion selon la preference "Page d'accueil"

---

## 1. Validation avancee du formulaire Register

Le formulaire de creation de compte (`src/pages/Register.tsx`) sera refactorise pour utiliser **Zod** (deja installe) et **react-hook-form** (deja installe) au lieu du state manuel.

**Regles de validation :**
- **Nom** : obligatoire, 2 a 50 caracteres, uniquement des lettres (accents, espaces, tirets autorises), pas de chiffres. Conversion en majuscules au blur.
- **Prenom** : obligatoire, 2 a 50 caracteres, uniquement des lettres (accents, espaces, tirets autorises), pas de chiffres.
- **Entite hierarchique** : obligatoire (selection dans la liste deroulante).

**Messages d'erreur** affiches sous chaque champ via le composant `FormMessage` de shadcn/ui.

## 2. Liste deroulante pour "Entite hierarchique"

Le champ texte libre sera remplace par un `Select` (composant shadcn/ui deja present) avec des valeurs predefinies :
- Direction Generale (DG)
- Unite (UNIT)
- Service (SERVICE)
- Secteur (SECTOR)

## 3. Redirection apres connexion selon la preference

Dans `src/pages/Login.tsx`, apres soumission du formulaire, au lieu de toujours rediriger vers `/`, on lira `localStorage.getItem("pref-homepage")` et on redirigera vers cette valeur (ou `/` par defaut).

---

## Details techniques

### Fichiers modifies

**`src/pages/Register.tsx`**
- Import de `useForm` depuis react-hook-form, `zodResolver` depuis @hookform/resolvers/zod, et schema Zod
- Definition du schema Zod avec les regles ci-dessus
- Remplacement des `useState` manuels par `useForm` + `FormField` / `FormItem` / `FormLabel` / `FormControl` / `FormMessage`
- Remplacement du champ `Input` pour "Entite hierarchique" par un composant `Select` avec les 4 valeurs predefinies
- Conservation du `ProfilePicture` en dehors du schema (gestion par state separe comme actuellement)
- Conservation du style visuel existant (memes classes CSS)

**`src/pages/Login.tsx`**
- Modification de `handleSubmit` : lire `localStorage.getItem("pref-homepage")` et passer la valeur a `navigate()` au lieu de `navigate("/")`

### Aucun nouveau fichier ni nouvelle dependance necessaire
Toutes les librairies (zod, react-hook-form, @hookform/resolvers) et composants UI (Form, Select) sont deja installes.
