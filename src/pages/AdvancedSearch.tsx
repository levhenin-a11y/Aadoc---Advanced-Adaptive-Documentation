import MainLayout from "@/components/layout/MainLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const AdvancedSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Recherche avancée
        </h2>

        <Card className="bg-card/80 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Critères de recherche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Mot-clé, titre, référence…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Type de document</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Statut</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Entité</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Toutes" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="dg">Direction Générale</SelectItem>
                    <SelectItem value="unit">Unité</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="sector">Secteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="py-8 text-center text-muted-foreground text-sm">
            Lancez une recherche pour afficher les résultats.
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdvancedSearch;
