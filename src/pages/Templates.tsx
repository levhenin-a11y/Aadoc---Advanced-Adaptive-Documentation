import MainLayout from "@/components/layout/MainLayout";
import { GitBranch, Copy, Edit, Trash2, Plus, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  steps: string[];
  usageCount: number;
  lastUsed: string;
  category: string;
}

const mockTemplates: Template[] = [
  {
    id: "1", name: "Validation standard", description: "Circuit classique en 3 étapes pour documents courants.",
    steps: ["Soumission", "Revue Manager", "Approbation Direction"], usageCount: 84, lastUsed: "10/03/2026", category: "Général",
  },
  {
    id: "2", name: "Circuit juridique complet", description: "Validation renforcée pour contrats et documents légaux.",
    steps: ["Soumission", "Revue juridique", "Compliance", "Signature DG", "Archivage"], usageCount: 32, lastUsed: "08/03/2026", category: "Juridique",
  },
  {
    id: "3", name: "Approbation RH rapide", description: "Circuit court pour notes internes RH.",
    steps: ["Soumission", "Validation RH"], usageCount: 56, lastUsed: "11/03/2026", category: "RH",
  },
  {
    id: "4", name: "Revue technique", description: "Circuit de revue avec validation qualité intégrée.",
    steps: ["Soumission", "Revue technique", "Contrôle qualité", "Approbation"], usageCount: 21, lastUsed: "05/03/2026", category: "Technique",
  },
];

const Templates = () => {
  const [search, setSearch] = useState("");

  const filtered = mockTemplates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="app-content">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Templates de circuit</h1>
            <p className="page-subtitle">Créez et gérez des modèles de workflows réutilisables.</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" />Nouveau template</Button>
        </div>

        <div className="mt-6 mb-4">
          <Input placeholder="Rechercher un template…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((tpl) => (
            <Card key={tpl.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-primary" />
                      {tpl.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{tpl.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{tpl.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Steps visualization */}
                <div className="flex items-center gap-1 flex-wrap mb-3">
                  {tpl.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {step}
                      </span>
                      {i < tpl.steps.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{tpl.usageCount} utilisations</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tpl.lastUsed}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Templates;
