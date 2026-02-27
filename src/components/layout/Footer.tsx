import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="py-4 px-6 bg-primary-foreground" role="contentinfo">
      <nav aria-label="Liens légaux et informations" className="flex flex-wrap items-center justify-center gap-2 text-sm text-primary">
        <span>Copyright © {currentYear}</span>
        <Separator orientation="vertical" className="h-4 bg-primary/30" aria-hidden="true" />
        <span>Version 1.0.0</span>
        <Separator orientation="vertical" className="h-4 bg-primary/30" aria-hidden="true" />
        <Link to="/contact" className="underline underline-offset-2 hover:text-primary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
          Contact
        </Link>
        <Separator orientation="vertical" className="h-4 bg-primary/30" aria-hidden="true" />
        <Link to="/disclaimer" className="underline underline-offset-2 hover:text-primary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
          Disclaimer
        </Link>
      </nav>
    </footer>;
};
export default Footer;