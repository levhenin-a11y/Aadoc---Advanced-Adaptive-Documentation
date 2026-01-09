import { ChevronRight, Home, FileSearch, Upload, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "Accueil", href: "/" },
  { icon: FileSearch, label: "Consulter", href: "/consult" },
  { icon: Upload, label: "Télécharger", href: "/upload" },
  { icon: Users, label: "Assigner", href: "/assign" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 h-full bg-sidebar text-sidebar-foreground transition-all duration-300",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
        role="navigation"
        aria-label="Menu latéral de navigation"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Toggle button (desktop only) */}
          <div className="hidden lg:flex justify-end p-2">
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

          {/* Menu items */}
          <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Navigation principale">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  "hover:bg-sidebar-accent text-sidebar-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-sidebar-ring",
                  !isOpen && "lg:justify-center lg:px-2"
                )}
                aria-label={!isOpen ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className={cn(
                  "whitespace-nowrap transition-opacity",
                  !isOpen && "lg:hidden"
                )}>
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
