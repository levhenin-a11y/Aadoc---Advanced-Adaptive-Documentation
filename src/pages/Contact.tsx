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
      <div className="contact-page">
        <Card className="contact-card">
          <CardHeader className="contact-card-header">
            <CardTitle className="contact-card-title">
              Contact
            </CardTitle>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <p className="contact-success">
                Votre message nous a bien été envoyé. Nous y répondrons dans les plus brefs délais. Merci.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-field">
                  <Label htmlFor="contact-nom" className="form-label">Nom</Label>
                  <Input
                    id="contact-nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="form-control"
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="contact-prenom" className="form-label">Prénom</Label>
                  <Input
                    id="contact-prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className="form-control"
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="contact-message" className="form-label">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..."
                    className="form-control form-textarea"
                    required
                  />
                </div>

                <div className="contact-actions">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="btn-primary"
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
