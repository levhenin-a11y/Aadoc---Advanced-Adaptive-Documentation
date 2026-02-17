import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/layout/Footer";
import ProfilePicture from "@/components/layout/ProfilePicture";
import { toast } from "@/hooks/use-toast";
import registerImage from "@/assets/register-building.jpg";

const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;

const registerSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .regex(nameRegex, "Le nom ne doit contenir que des lettres, espaces, tirets ou apostrophes"),
  prenom: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .regex(nameRegex, "Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes"),
  entity: z
    .string({ required_error: "Veuillez sélectionner une entité hiérarchique" })
    .min(1, "Veuillez sélectionner une entité hiérarchique"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const ENTITIES = [
  { value: "DG", label: "Direction Générale" },
  { value: "UNIT", label: "Unité" },
  { value: "SERVICE", label: "Service" },
  { value: "SECTOR", label: "Secteur" },
];

const Register = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nom: "", prenom: "", entity: "" },
  });

  const onSubmit = (_data: RegisterFormValues) => {
    setSubmitted(true);
    toast({
      title: "Demande soumise",
      description: "Votre demande de création de compte a été envoyée à votre MANAGER pour validation.",
    });
  };

  const handleReset = () => {
    setAvatarUrl("");
    form.reset();
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Nom <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez votre nom"
                              className="bg-card border-border focus:ring-2 focus:ring-ring"
                              {...field}
                              onBlur={() => {
                                field.onChange(field.value.toUpperCase());
                                field.onBlur();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Prénom */}
                    <FormField
                      control={form.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Prénom <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez votre prénom"
                              className="bg-card border-border focus:ring-2 focus:ring-ring"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Entité hiérarchique */}
                    <FormField
                      control={form.control}
                      name="entity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Entité hiérarchique <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card border-border focus:ring-2 focus:ring-ring">
                                <SelectValue placeholder="Sélectionnez votre entité" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ENTITIES.map((e) => (
                                <SelectItem key={e.value} value={e.value}>
                                  {e.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
              </Form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
