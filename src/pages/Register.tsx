import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import ProfilePicture from "@/components/layout/ProfilePicture";
import { toast } from "@/hooks/use-toast";
import registerImage from "@/assets/register-building.jpg";

const Register = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [entity, setEntity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Demande soumise",
      description:
        "Votre demande de création de compte a été envoyée à votre MANAGER pour validation.",
    });
  };

  const handleReset = () => {
    setAvatarUrl("");
    setNom("");
    setPrenom("");
    setEntity("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4 bg-primary">
        <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
          {/* Image Section */}
          <div className="md:w-1/2 bg-surface-tertiary">
            <img
              src={registerImage}
              alt="Intérieur moderne de bureaux"
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 bg-muted p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="text-center p-0 mb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                Création de compte
              </CardTitle>
            </CardHeader>

            <Card className="border-0 shadow-none bg-transparent">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 p-0">
                  {/* Photo de profil */}
                  <div className="[&_.text-primary-foreground]:text-foreground [&_.text-primary-foreground\\/60]:text-muted-foreground [&_.border-primary-foreground\\/30]:border-border [&_.hover\\:bg-primary-foreground\\/10]:hover:bg-muted">
                    <ProfilePicture
                      avatarUrl={avatarUrl}
                      fallbackText="??"
                      onAvatarChange={setAvatarUrl}
                    />
                  </div>

                  {/* Nom */}
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-foreground">
                      Nom <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nom"
                      type="text"
                      placeholder="Entrez votre nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      onBlur={() => setNom((v) => v.toUpperCase())}
                      className="bg-card border-border focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  {/* Prénom */}
                  <div className="space-y-2">
                    <Label htmlFor="prenom" className="text-foreground">
                      Prénom <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="prenom"
                      type="text"
                      placeholder="Entrez votre prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="bg-card border-border focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  {/* Entité hiérarchique */}
                  <div className="space-y-2">
                    <Label htmlFor="entity" className="text-foreground">
                      Entité hiérarchique <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="entity"
                      type="text"
                      placeholder="Entrez votre entité hiérarchique"
                      value={entity}
                      onChange={(e) => setEntity(e.target.value)}
                      className="bg-card border-border focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      Réinitialiser
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Soumettre
                    </Button>
                  </div>

                  {/* Confirmation message */}
                  {submitted && (
                    <p className="text-sm text-success text-center font-medium pt-2">
                      Votre demande a été soumise à votre MANAGER pour validation.
                    </p>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-2 p-0 mt-6">
                  <Link
                    to="/login"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  >
                    Déjà un compte ? Se connecter
                  </Link>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
