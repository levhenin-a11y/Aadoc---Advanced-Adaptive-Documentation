import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto flex flex-col transition-[padding] duration-300",
            sidebarOpen ? "pl-64" : "pl-12 lg:pl-16"
          )}
          style={{ backgroundImage: "linear-gradient(to top, hsl(var(--background)), hsl(var(--primary)))" }}
        >
          <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
