import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

const EditPreferences = () => {
  const [homePage, setHomePage] = useState("/");
  const [language, setLanguage] = useState("FR");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));

    const savedHomePage = localStorage.getItem("pref-homepage");
    if (savedHomePage) setHomePage(savedHomePage);

    const savedLanguage = localStorage.getItem("pref-language");
    if (savedLanguage) setLanguage(savedLanguage);

    const savedSidebar = localStorage.getItem("pref-sidebar");
    if (savedSidebar) setIsSidebarOpen(savedSidebar === "open");
  }, []);

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleHomePageChange = (value: string) => {
    setHomePage(value);
    localStorage.setItem("pref-homepage", value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("pref-language", value);
  };

  const handleSidebarToggle = (checked: boolean) => {
    setIsSidebarOpen(checked);
    localStorage.setItem("pref-sidebar", checked ? "open" : "closed");
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      {/* Page d'accueil */}
      <div className="space-y-2">
        <Label htmlFor="homepage" className="text-base font-semibold text-primary-foreground">
          Page d'accueil
        </Label>
        <Select value={homePage} onValueChange={handleHomePageChange}>
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
        <Select value={language} onValueChange={handleLanguageChange}>
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
            {isDarkMode ? "Dark" : "Light"}
          </p>
        </div>
        <Switch
          checked={isDarkMode}
          onCheckedChange={handleDarkModeToggle}
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
            {isSidebarOpen ? "Ouvert" : "Fermé"}
          </p>
        </div>
        <Switch
          checked={isSidebarOpen}
          onCheckedChange={handleSidebarToggle}
          aria-label="Basculer le menu de gauche ouvert ou fermé par défaut"
        />
      </div>
    </div>
  );
};

export default EditPreferences;
