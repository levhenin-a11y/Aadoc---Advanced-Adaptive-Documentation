import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem("pref-sidebar") === "open";
  });

  return (
    <div className="app-shell">
      <Header />
      
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
        
        <main 
          className={cn(
            "app-main bg-app-gradient",
            sidebarOpen ? "app-main--sidebar-open" : "app-main--sidebar-collapsed"
          )}
        >
          <div className="app-content">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
