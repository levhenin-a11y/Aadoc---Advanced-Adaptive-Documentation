import MainLayout from "@/components/layout/MainLayout";
import { FolderOpen, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const archiveItems = [
  {
    title: "Rapport annuel 2025",
    category: "Rapports",
    archivedDate: "15 janv. 2026",
    origin: "Direction Générale",
    size: "2.4 Mo",
  },
  {
    title: "Procédure qualité ISO 9001 v2",
    category: "Procédures",
    archivedDate: "10 déc. 2025",
    origin: "Service Qualité",
    size: "1.1 Mo",
  },
  {
    title: "Contrat prestataire ABC - 2024",
    category: "Contrats",
    archivedDate: "02 nov. 2025",
    origin: "Direction Juridique",
    size: "850 Ko",
  },
  {
    title: "Plan de formation 2024",
    category: "RH",
    archivedDate: "18 oct. 2025",
    origin: "Ressources Humaines",
    size: "620 Ko",
  },
  {
    title: "Cahier des charges Projet Delta",
    category: "Projets",
    archivedDate: "05 sept. 2025",
    origin: "Unité Projets",
    size: "3.8 Mo",
  },
  {
    title: "Note de service #2024-45",
    category: "Notes",
    archivedDate: "22 août 2025",
    origin: "Direction Générale",
    size: "210 Ko",
  },
];

const Archives = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = archiveItems.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Archives
        </h2>

        {/* Filtres */}
        <Card className="bg-card text-card-foreground mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Rechercher dans les archives…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Rapports">Rapports</SelectItem>
                  <SelectItem value="Procédures">Procédures</SelectItem>
                  <SelectItem value="Contrats">Contrats</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Projets">Projets</SelectItem>
                  <SelectItem value="Notes">Notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des archives */}
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-lg">
              {filtered.length} document{filtered.length > 1 ? "s" : ""} archivé{filtered.length > 1 ? "s" : ""}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-6 text-sm">
                Aucun document trouvé.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                        <FolderOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.origin} · {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="secondary" className="mb-1">{item.category}</Badge>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {item.archivedDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Archives;
