import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Disclaimer
        </h2>

        <Card className="bg-card/80 backdrop-blur space-y-0">
          <CardHeader>
            <CardTitle className="text-lg">Mentions légales</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-4 text-card-foreground">
            <section>
              <h3 className="font-semibold text-base">Éditeur</h3>
              <p>
                Aadoc — Adapted Advanced Documentation. Application de gestion documentaire éditée à titre professionnel.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base">Propriété intellectuelle</h3>
              <p>
                L'ensemble des contenus (textes, images, logos, icônes) présents sur cette application est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base">Protection des données</h3>
              <p>
                Les données personnelles collectées via cette application sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Elles sont utilisées uniquement dans le cadre de la gestion documentaire et ne sont en aucun cas cédées à des tiers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base">Responsabilité</h3>
              <p>
                L'éditeur s'efforce de fournir des informations exactes et à jour. Toutefois, il ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation de ces informations.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base">Cookies</h3>
              <p>
                Cette application utilise le stockage local du navigateur (localStorage) à des fins de personnalisation et de mémorisation des préférences utilisateur. Aucun cookie de suivi tiers n'est utilisé.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base">Contact</h3>
              <p>
                Pour toute question relative aux mentions légales ou à la protection de vos données, veuillez utiliser la page <a href="/contact" className="underline hover:opacity-80">Contact</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Disclaimer;
