import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-footer text-footer-foreground py-4 px-6" role="contentinfo">
      <nav 
        aria-label="Liens légaux et informations" 
        className="flex flex-wrap items-center justify-center gap-2 text-sm"
      >
        <span>Copyright © {currentYear}</span>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" aria-hidden="true" />
        <span>Version 1.0.0</span>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" aria-hidden="true" />
        <a 
          href="#contact" 
          className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
        >
          Contact
        </a>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" aria-hidden="true" />
        <a 
          href="#disclaimer" 
          className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
        >
          Disclaimer
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
