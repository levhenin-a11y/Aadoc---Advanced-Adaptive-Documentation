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
    // Redirect to home page after login
    navigate("/");
  };
  return <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 bg-primary">
        <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
          {/* Image Section - Architectural Image */}
          <div className="md:w-1/2 bg-surface-tertiary">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Architecture moderne de bureaux avec façade en verre" className="w-full h-48 md:h-full object-cover" />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 bg-muted p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="text-center p-0 mb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                Connexion
              </CardTitle>
            </CardHeader>

            <Card className="border-0 shadow-none bg-transparent">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground">
                      Nom d'utilisateur <span className="text-destructive">*</span>
                    </Label>
                    <Input id="username" type="text" placeholder="Entrez votre nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} className="bg-card border-border focus:ring-2 focus:ring-ring" required aria-required="true" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Mot de passe <span className="text-destructive">*</span>
                    </Label>
                    <Input id="password" type="password" placeholder="Entrez votre mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="bg-card border-border focus:ring-2 focus:ring-ring" required aria-required="true" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} />
                    <Label htmlFor="remember" className="text-sm font-normal text-foreground cursor-pointer">
                      Se souvenir de moi
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    Connexion
                  </Button>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 p-0 mt-6">
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                    Mot de passe oublié ?
                  </Link>
                  <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
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