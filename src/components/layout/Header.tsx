import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "heninvu" }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  // Load and listen for avatar changes
  useEffect(() => {
    const loadAvatar = () => setAvatarUrl(localStorage.getItem("account-avatar") || "");
    loadAvatar();
    window.addEventListener("account-updated", loadAvatar);
    return () => window.removeEventListener("account-updated", loadAvatar);
  }, []);

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
      <header className="header-root" role="banner">
        <div className="header-inner">
          {/* Logo and Brand */}
          <div className="header-brand">
            <img 
              src={logo} 
              alt="Logo Aadoc - Retour à l'accueil" 
              className="header-logo"
            />
            <div>
              <h1 className="header-title">Aadoc</h1>
              <p className="header-subtitle">Adapted Advanced Documentation</p>
            </div>
          </div>

          {/* Desktop/Tablet Navigation - visible on nav (830px) and up */}
          <nav className="header-nav-desktop" aria-label="Navigation principale">
            <ul className="header-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="header-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Separator */}
          <div className="header-separator" />

          {/* User info and Dark mode toggle */}
          <div className="header-actions">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="header-icon-btn"
              aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Separator */}
          <div className="header-separator" />

            <button
              onClick={() => navigate("/account")}
              className="header-account-btn"
              aria-label="Accéder à la page Account"
            >
              <span className="header-account-name">USER / {username}</span>
              <Avatar className="header-avatar">
                <AvatarImage src={avatarUrl} alt={`Avatar de ${username}`} />
                <AvatarFallback className="header-avatar-fallback">
                  {username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>


        {/* Mobile Navigation bar with menu toggle - visible below nav (830px) */}
        <nav 
          className="header-mobile-nav"
          aria-label="Navigation mobile"
        >
          <div className="header-mobile-inner">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="header-mobile-menu-btn"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMenuOpen}
            >
              <Menu className="header-mobile-menu-icon" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - fullscreen on sm, z-[60] to appear above sidebar (z-50) */}
      {isMenuOpen && (
        <div 
          className="header-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Close button */}
          <div className="header-overlay-close-row">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="header-icon-btn"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation links */}
          <nav className="header-overlay-nav" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="header-overlay-link"
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
