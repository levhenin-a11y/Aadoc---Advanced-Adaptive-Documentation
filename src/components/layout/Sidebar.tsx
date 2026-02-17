import { ChevronRight, ChevronDown, Home, FileSearch, Upload, Users, Settings, Database, FolderOpen, FileUp, FileCheck, Search, UserCheck, GitBranch, FileText, Palette, Bell, Shield, HelpCircle, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuSection {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}

const menuSections: MenuSection[] = [
  {
    icon: Home,
    label: "Accueil",
    items: [
      { label: "Tableau de bord", href: "/", icon: Home },
      { label: "Activité récente", href: "/activity", icon: FileText },
    ],
  },
  {
    icon: FileSearch,
    label: "Consulter",
    items: [
      { label: "Base documentaire", href: "/documents", icon: Database },
      { label: "Archives", href: "/archives", icon: FolderOpen },
      { label: "Recherche avancée", href: "/search", icon: Search },
    ],
  },
  {
    icon: Upload,
    label: "Télécharger",
    items: [
      { label: "Importer un fichier", href: "/upload", icon: FileUp },
      { label: "Validation en attente", href: "/pending", icon: FileCheck },
    ],
  },
  {
    icon: Users,
    label: "Assigner",
    items: [
      { label: "Rechercher un workflow", href: "/workflows", icon: Search },
      { label: "e-Signataires", href: "/signataires", icon: UserCheck },
      { label: "Templates de circuit", href: "/templates", icon: GitBranch },
    ],
  },
  {
    icon: Settings,
    label: "Paramètres",
    items: [
      { label: "Account", href: "/account", icon: UserCog },
      { label: "Préférences", href: "/preferences", icon: Palette },
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Sécurité", href: "/security", icon: Shield },
      { label: "Aide", href: "/help", icon: HelpCircle },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Accueil"]);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  return (
    <aside
      className={cn(
        "sidebar-root",
        isOpen ? "sidebar-root--open" : "sidebar-root--collapsed"
      )}
      role="navigation"
      aria-label="Menu latéral de navigation"
    >
      <div className="sidebar-frame">
        {/* Toggle button */}
        <div className="sidebar-toggle-row">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="sidebar-toggle-btn"
            aria-label={isOpen ? "Réduire le menu" : "Étendre le menu"}
          >
            <ChevronRight className={cn(
              "sidebar-toggle-icon",
              isOpen && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Menu sections */}
        <nav 
          className={cn(
            "sidebar-nav",
            !isOpen && "sidebar-nav--collapsed"
          )} 
          aria-label="Navigation principale"
        >
          {menuSections.map((section) => {
            const isSectionExpanded = expandedSections.includes(section.label);
            
            return (
              <div key={section.label} className="sidebar-section">
                {/* Section title */}
                <button
                  onClick={() => isOpen && toggleSection(section.label)}
                  className={cn(
                    "sidebar-section-trigger",
                    !isOpen && "sidebar-section-trigger--collapsed"
                  )}
                  aria-expanded={isOpen ? isSectionExpanded : undefined}
                  aria-label={!isOpen ? section.label : undefined}
                >
                  <section.icon className="sidebar-section-icon" aria-hidden="true" />
                  {isOpen && (
                    <>
                      <span className="sidebar-section-label">{section.label}</span>
                      <ChevronDown 
                        className={cn(
                          "sidebar-chevron",
                          isSectionExpanded && "rotate-180"
                        )} 
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Section items */}
                {isOpen && isSectionExpanded && (
                  <div className="sidebar-items">
                    {section.items.map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "sidebar-item",
                            isActive 
                              ? "sidebar-item--active" 
                              : "sidebar-item--inactive"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <item.icon className="sidebar-item-icon" aria-hidden="true" />
                          <span>{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
