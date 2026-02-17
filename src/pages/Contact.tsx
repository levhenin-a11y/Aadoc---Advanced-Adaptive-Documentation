import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";

const Contact = () => {
  const navigate = useNavigate();
  const storedNom = localStorage.getItem("user-nom") || "";
  const storedPrenom = localStorage.getItem("user-prenom") || "";

  const [nom, setNom] = useState(storedNom);
  const [prenom, setPrenom] = useState(storedPrenom);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Message envoyé",
      description: "Votre message nous a bien été envoyé.",
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-lg border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground font-serif">
              Contact
            </CardTitle>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <p className="text-center text-success font-medium py-8">
                Votre message nous a bien été envoyé. Nous y répondrons dans les plus brefs délais. Merci.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-nom" className="text-foreground">Nom</Label>
                  <Input
                    id="contact-nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="bg-card border-border focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-prenom" className="text-foreground">Prénom</Label>
                  <Input
                    id="contact-prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className="bg-card border-border focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-foreground">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..."
                    className="bg-card border-border focus:ring-2 focus:ring-ring min-h-[120px]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Envoyer
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Contact;
