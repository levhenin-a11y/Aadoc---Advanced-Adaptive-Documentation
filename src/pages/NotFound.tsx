import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="notfound-page bg-app-gradient">
      <div className="notfound-container">
        <Card className="notfound-card">
          <CardContent className="notfound-content">
            <span className="notfound-code">404</span>
            <h1 className="notfound-title">Page introuvable</h1>
            <p className="notfound-text">
              La page <code className="notfound-path">{location.pathname}</code> n'existe pas ou a été déplacée.
            </p>
            <div className="notfound-actions">
              <Button asChild className="btn-primary">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline-light">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4" />
                  Se connecter
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
