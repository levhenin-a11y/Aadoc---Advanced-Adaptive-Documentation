import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import AdvancedSearch from "./pages/AdvancedSearch";
import Disclaimer from "./pages/Disclaimer";
import RecentActivities from "./pages/RecentActivities";
import Documents from "./pages/Documents";
import Archives from "./pages/Archives";
import Notifications from "./pages/Notifications";
import Upload from "./pages/Upload";
import PendingValidation from "./pages/PendingValidation";
import Signataires from "./pages/Signataires";
import Workflows from "./pages/Workflows";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<AdvancedSearch />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/recent-activities" element={<RecentActivities />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/pending" element={<PendingValidation />} />
          <Route path="/signataires" element={<Signataires />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/templates" element={<Templates />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
