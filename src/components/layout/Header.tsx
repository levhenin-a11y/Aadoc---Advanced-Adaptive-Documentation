import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "heninvu" }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navLinks = [
    { label: "Account", href: "/login" },
    { label: "Documentation", href: "/documentation" },
    { label: "Preferences", href: "/preferences" },
    { label: "Support", href: "support" },
    { label: "Delegations", href: "/delegations" },
  ];

  return (
    <>
      <header className="bg-header text-header-foreground" role="banner">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Logo Aadoc - Retour à l'accueil" 
              className="h-12 w-12 rounded object-cover"
            />
            <div>
              <h1 className="text-lg font-bold font-serif">Aadoc</h1>
              <p className="hidden sm:block text-xs opacity-80">Adapted Advanced Documentation</p>
            </div>
          </div>

          {/* Desktop/Tablet Navigation - visible on nav (830px) and up */}
          <nav className="hidden nav:flex nav:flex-1 nav:justify-center" aria-label="Navigation principale">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-header-foreground hover:text-header-foreground/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Separator */}
          <div className="hidden nav:block h-6 w-0.5 bg-header-foreground/50" />

          {/* User info and Dark mode toggle */}
          <div className="flex items-center gap-3 ml-auto">
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

            {/* Separator */}
          <div className="hidden nav:block h-6 w-0.5 bg-header-foreground/50" />

            <span className="text-sm hidden sm:inline">USER / {username}</span>
            <Avatar className="h-8 w-8 border-2 border-header-foreground/20">
              <AvatarImage src="" alt={`Avatar de ${username}`} />
              <AvatarFallback className="bg-primary-foreground text-primary text-xs">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>


        {/* Mobile Navigation bar with menu toggle - visible below nav (830px) */}
        <nav 
          className="nav:hidden bg-header/90 border-t border-header-foreground/10"
          aria-label="Navigation mobile"
        >
          <div className="flex items-center justify-center px-4 py-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="text-header-foreground hover:bg-header-foreground/10 focus:ring-2 focus:ring-header-foreground/50"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-16 w-16" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - fullscreen on sm, z-[60] to appear above sidebar (z-50) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-header text-header-foreground flex flex-col animate-fade-in nav:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="text-header-foreground hover:bg-header-foreground/10"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-2xl font-serif hover:text-header-foreground/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
