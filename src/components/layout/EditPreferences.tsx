import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pages = [
  { label: "Tableau de bord", value: "/" },
  { label: "Base documentaire", value: "/documents" },
  { label: "Archives", value: "/archives" },
  { label: "Recherche avancée", value: "/search" },
  { label: "Importer un fichier", value: "/upload" },
  { label: "Validation en attente", value: "/pending" },
  { label: "Workflows", value: "/workflows" },
  { label: "e-Signataires", value: "/signataires" },
  { label: "Templates de circuit", value: "/templates" },
  { label: "Préférences", value: "/preferences" },
];

const languages = [
  { label: "Français", value: "FR" },
  { label: "Nederlands", value: "NL" },
  { label: "English", value: "EN" },
  { label: "Español", value: "ES" },
];

interface SavedPrefs {
  homePage: string;
  language: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}

const loadSavedPrefs = (): SavedPrefs => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    homePage: localStorage.getItem("pref-homepage") || "/",
    language: localStorage.getItem("pref-language") || "FR",
    isDarkMode: savedTheme === "dark" || (!savedTheme && prefersDark),
    isSidebarOpen: localStorage.getItem("pref-sidebar") === "open",
  };
};

const EditPreferences = () => {
  const [prefs, setPrefs] = useState<SavedPrefs>(loadSavedPrefs);
  const [savedPrefs, setSavedPrefs] = useState<SavedPrefs>(loadSavedPrefs);

  useEffect(() => {
    const loaded = loadSavedPrefs();
    setPrefs(loaded);
    setSavedPrefs(loaded);
  }, []);

  const handleSave = useCallback(() => {
    // Persist to localStorage
    localStorage.setItem("pref-homepage", prefs.homePage);
    localStorage.setItem("pref-language", prefs.language);
    localStorage.setItem("theme", prefs.isDarkMode ? "dark" : "light");
    localStorage.setItem("pref-sidebar", prefs.isSidebarOpen ? "open" : "closed");

    // Apply dark mode
    if (prefs.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setSavedPrefs(prefs);
    toast({ title: "Préférences sauvegardées", description: "Vos préférences ont été mises à jour." });
  }, [prefs]);

  const handleCancel = useCallback(() => {
    setPrefs(savedPrefs);

    // Revert dark mode visually
    if (savedPrefs.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [savedPrefs]);

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      {/* Page d'accueil */}
      <div className="space-y-2">
        <Label htmlFor="homepage" className="text-base font-semibold text-primary-foreground">
          Page d'accueil
        </Label>
        <Select value={prefs.homePage} onValueChange={(v) => setPrefs((p) => ({ ...p, homePage: v }))}>
          <SelectTrigger id="homepage" className="bg-card text-card-foreground border-border">
            <SelectValue placeholder="Choisir la page d'accueil" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.value} value={page.value}>
                {page.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Langue */}
      <div className="space-y-2">
        <Label htmlFor="language" className="text-base font-semibold text-primary-foreground">
          Langue
        </Label>
        <Select value={prefs.language} onValueChange={(v) => setPrefs((p) => ({ ...p, language: v }))}>
          <SelectTrigger id="language" className="bg-card text-card-foreground border-border">
            <SelectValue placeholder="Choisir la langue" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label} ({lang.value})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mode */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base font-semibold text-primary-foreground">Mode</Label>
          <p className="text-sm text-primary-foreground/70">
            {prefs.isDarkMode ? "Dark" : "Light"}
          </p>
        </div>
        <Switch
          checked={prefs.isDarkMode}
          onCheckedChange={(c) => setPrefs((p) => ({ ...p, isDarkMode: c }))}
          aria-label="Basculer entre mode Light et Dark"
        />
      </div>

      {/* État Menu de gauche */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base font-semibold text-primary-foreground">
            État Menu de gauche
          </Label>
          <p className="text-sm text-primary-foreground/70">
            {prefs.isSidebarOpen ? "Ouvert" : "Fermé"}
          </p>
        </div>
        <Switch
          checked={prefs.isSidebarOpen}
          onCheckedChange={(c) => setPrefs((p) => ({ ...p, isSidebarOpen: c }))}
          aria-label="Basculer le menu de gauche ouvert ou fermé par défaut"
        />
      </div>

      {/* Boutons Sauvegarder / Annuler */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={handleCancel} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
          Annuler
        </Button>
        <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default EditPreferences;
