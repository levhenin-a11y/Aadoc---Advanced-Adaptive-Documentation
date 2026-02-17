import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="footer-root" role="contentinfo">
      <nav aria-label="Liens légaux et informations" className="footer-nav">
        <span>Copyright © {currentYear}</span>
        <Separator orientation="vertical" className="footer-separator" aria-hidden="true" />
        <span>Version 1.0.0</span>
        <Separator orientation="vertical" className="footer-separator" aria-hidden="true" />
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
        <Separator orientation="vertical" className="footer-separator" aria-hidden="true" />
        <a href="#disclaimer" className="footer-link">
          Disclaimer
        </a>
      </nav>
    </footer>;
};
export default Footer;