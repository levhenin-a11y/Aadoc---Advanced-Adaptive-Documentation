import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
  username?: string;
}

const Header = ({ onMenuToggle, username = "heninvu" }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-header text-header-foreground" role="banner">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Logo Aadoc - Retour à l'accueil" 
            className="h-12 w-12 rounded object-cover"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold font-serif">Aadoc</h1>
            <p className="text-xs opacity-80">Adapted Advanced Documentation</p>
          </div>
          <span className="sm:hidden text-lg font-bold font-serif">
            Aadoc <span className="text-xs font-normal opacity-80">Adapted Advanced Documentation</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-6">
            <li>
              <a href="/" className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors">
                Accueil
              </a>
            </li>
            <li>
              <a href="/documents" className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors">
                Documents
              </a>
            </li>
            <li>
              <a href="/projets" className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors">
                Projets
              </a>
            </li>
            <li>
              <a href="/equipe" className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors">
                Équipe
              </a>
            </li>
            <li>
              <a href="/aide" className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors">
                Aide
              </a>
            </li>
          </ul>
        </nav>

        {/* User info and Dark mode toggle */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-header-foreground hover:bg-header-foreground/10"
            aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <span className="text-sm hidden sm:inline">USER / {username}</span>
          <Avatar className="h-8 w-8 border-2 border-header-foreground/20">
            <AvatarImage src="" alt={`Avatar de ${username}`} />
            <AvatarFallback className="bg-primary-foreground text-primary text-xs">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile/Tablet Navigation bar with menu toggle */}
      <nav 
        className="lg:hidden bg-header/90 border-t border-header-foreground/10"
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-center px-4 py-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuToggle}
            className="text-header-foreground hover:bg-header-foreground/10 focus:ring-2 focus:ring-header-foreground/50"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded="false"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
