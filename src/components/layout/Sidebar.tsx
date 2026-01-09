import { ChevronRight, Home, FileSearch, Upload, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FileSearch, label: "Consult", href: "/consult" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: Users, label: "Assign", href: "/assign" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 h-full bg-sidebar text-sidebar-foreground transition-all duration-300",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Toggle button (desktop only) */}
          <div className="hidden lg:flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ChevronRight className={cn(
                "h-5 w-5 transition-transform",
                isOpen && "rotate-180"
              )} />
            </Button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  "hover:bg-sidebar-accent text-sidebar-foreground",
                  !isOpen && "lg:justify-center lg:px-2"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
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
