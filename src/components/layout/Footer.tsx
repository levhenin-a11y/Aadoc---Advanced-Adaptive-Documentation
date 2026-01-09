import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-footer text-footer-foreground py-4 px-6">
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span>Copyright © {currentYear}</span>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" />
        <span>Version 1.0.0</span>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" />
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
        <Separator orientation="vertical" className="h-4 bg-footer-foreground/30" />
        <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
      </div>
    </footer>
  );
};

export default Footer;
