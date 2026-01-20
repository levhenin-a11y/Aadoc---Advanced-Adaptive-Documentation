import { ChevronRight, ChevronDown, Home, FileSearch, Upload, Users, Settings, Database, FolderOpen, FileUp, FileCheck, Search, UserCheck, GitBranch, FileText, Palette, Bell, Shield, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
      { label: "Préférences", href: "/preferences", icon: Palette },
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Sécurité", href: "/security", icon: Shield },
      { label: "Aide", href: "/help", icon: HelpCircle },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Accueil"]);

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
        "absolute left-0 top-0 z-50 h-full bg-sidebar text-sidebar-foreground transition-all duration-300",
        isOpen ? "w-64" : "w-12 lg:w-16"
      )}
      role="navigation"
      aria-label="Menu latéral de navigation"
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Toggle button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent focus:ring-2 focus:ring-sidebar-ring"
            aria-label={isOpen ? "Réduire le menu" : "Étendre le menu"}
          >
            <ChevronRight className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Menu sections */}
        <nav 
          className={cn(
            "flex-1 px-2 py-2 space-y-1 overflow-y-auto",
            !isOpen && "hidden lg:block"
          )} 
          aria-label="Navigation principale"
        >
          {menuSections.map((section) => {
            const isSectionExpanded = expandedSections.includes(section.label);
            
            return (
              <div key={section.label} className="mb-2">
                {/* Section title */}
                <button
                  onClick={() => isOpen && toggleSection(section.label)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-sidebar-accent text-sidebar-foreground font-medium",
                    "focus:outline-none focus:ring-2 focus:ring-sidebar-ring",
                    !isOpen && "justify-center px-2"
                  )}
                  aria-expanded={isOpen ? isSectionExpanded : undefined}
                  aria-label={!isOpen ? section.label : undefined}
                >
                  <section.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left text-sm">{section.label}</span>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isSectionExpanded && "rotate-180"
                        )} 
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Section items */}
                {isOpen && isSectionExpanded && (
                  <div className="mt-1 ml-4 pl-2 border-l border-sidebar-accent space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm",
                          "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </a>
                    ))}
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
