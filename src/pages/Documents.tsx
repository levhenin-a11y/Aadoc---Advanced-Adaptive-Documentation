import MainLayout from "@/components/layout/MainLayout";
import { Database, FileText, BookOpen, Archive, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const databases = [
  {
    id: "corporate",
    label: "Documents Corporate",
    icon: BookOpen,
    description: "Politiques, procédures et directives internes",
    count: 248,
  },
  {
    id: "technical",
    label: "Documentation Technique",
    icon: FileText,
    description: "Manuels, spécifications et guides techniques",
    count: 512,
  },
  {
    id: "legal",
    label: "Base Juridique",
    icon: Archive,
    description: "Contrats, accords et documents réglementaires",
    count: 134,
  },
  {
    id: "rh",
    label: "Ressources Humaines",
    icon: Database,
    description: "Notes de service, circulaires et documents RH",
    count: 89,
  },
];

const recentDocuments = [
  { name: "Politique de sécurité v3.2", base: "Corporate", date: "08 mars 2026", type: "PDF" },
  { name: "Manuel technique API", base: "Technique", date: "07 mars 2026", type: "Word" },
  { name: "Contrat fournisseur XYZ", base: "Juridique", date: "06 mars 2026", type: "PDF" },
  { name: "Note de service #2026-12", base: "RH", date: "05 mars 2026", type: "PDF" },
];

const Documents = () => {
  const [selectedBase, setSelectedBase] = useState<string>("all");

  return (
    <MainLayout>
      <div className="title-container">
        <h2>
          Bases documentaires
        </h2>

        {/* Sélecteur de base */}
        <Card className="bg-card text-card-foreground mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Sélectionner une base</CardTitle>
            <CardDescription>
              Choisissez une base documentaire pour accéder à son contenu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedBase} onValueChange={setSelectedBase}>
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue placeholder="Toutes les bases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les bases</SelectItem>
                {databases.map((db) => (
                  <SelectItem key={db.id} value={db.id}>
                    {db.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Cartes des bases */}
        <div className="grid gap-4 sm:grid-cols-2">
          {databases
            .filter((db) => selectedBase === "all" || db.id === selectedBase)
            .map((db) => (
              <Card
                key={db.id}
                className="bg-card text-card-foreground hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <db.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{db.label}</CardTitle>
                    <CardDescription className="mt-1">{db.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{db.count} docs</Badge>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Accéder à la base
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Documents récents */}
        <Card className="bg-card text-card-foreground mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Documents récemment consultés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.base} · {doc.date}</p>
                  </div>
                  <Badge variant="outline">{doc.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Documents;
