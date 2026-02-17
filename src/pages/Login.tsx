import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentative de connexion:", {
      username,
      rememberMe
    });
    // Redirect based on homepage preference
    const homepage = localStorage.getItem("pref-homepage") || "/";
    navigate(homepage);
  };
  return <div className="login-page">
      {/* Main Content */}
      <div className="login-main">
        <div className="login-shell">
          {/* Image Section - Architectural Image */}
          <div className="login-visual">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Architecture moderne de bureaux avec façade en verre" className="login-visual-image" />
          </div>

          {/* Form Section */}
          <div className="login-panel">
            <CardHeader className="login-title-wrap">
              <CardTitle className="login-title">
                Connexion
              </CardTitle>
            </CardHeader>

            <Card className="login-card">
              <form onSubmit={handleSubmit}>
                <CardContent className="contact-form p-0">
                  <div className="form-field">
                    <Label htmlFor="username" className="form-label">
                      Nom d'utilisateur <span className="text-destructive">*</span>
                    </Label>
                    <Input id="username" type="text" placeholder="Entrez votre nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} className="form-control" required aria-required="true" />
                  </div>

                  <div className="form-field">
                    <Label htmlFor="password" className="form-label">
                      Mot de passe <span className="text-destructive">*</span>
                    </Label>
                    <Input id="password" type="password" placeholder="Entrez votre mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="form-control" required aria-required="true" />
                  </div>

                  <div className="login-remember">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} />
                    <Label htmlFor="remember" className="login-remember-label">
                      Se souvenir de moi
                    </Label>
                  </div>

                  <Button type="submit" className="login-submit">
                    Connexion
                  </Button>
                </CardContent>

                <CardFooter className="login-footer">
                  <Link to="/forgot-password" className="login-link">
                    Mot de passe oublié ?
                  </Link>
                  <Link to="/register" className="login-link">
                    Pas encore de compte ?
                  </Link>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Login;