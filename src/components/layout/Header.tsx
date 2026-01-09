import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onMenuToggle?: () => void;
  username?: string;
}

const Header = ({ onMenuToggle, username = "heninvu" }: HeaderProps) => {
  return (
    <header className="bg-header text-header-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Aadoc Logo" 
            className="h-12 w-12 rounded object-cover"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold">Aadoc</h1>
            <p className="text-xs opacity-80">Adapted Advanced Documentation</p>
          </div>
          <span className="sm:hidden text-lg font-bold">Aadoc <span className="text-xs font-normal opacity-80">Adapted Advanced Documentation</span></span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <span className="text-sm hidden sm:inline">USER / {username}</span>
          <Avatar className="h-8 w-8 border-2 border-header-foreground/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary-foreground text-primary text-xs">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Navigation bar with menu toggle */}
      <nav className="bg-header/90 border-t border-header-foreground/10">
        <div className="flex items-center justify-center px-4 py-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuToggle}
            className="text-header-foreground hover:bg-header-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
