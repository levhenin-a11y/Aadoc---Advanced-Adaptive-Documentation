import MainLayout from "@/components/layout/MainLayout";
import { Search, GitBranch, Clock, CheckCircle, AlertTriangle, Play, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Workflow {
  id: string;
  name: string;
  document: string;
  initiator: string;
  status: "en cours" | "terminé" | "bloqué";
  currentStep: string;
  totalSteps: number;
  completedSteps: number;
  date: string;
}

const mockWorkflows: Workflow[] = [
  { id: "WF-001", name: "Validation contrat fournisseur", document: "Contrat_ABC.pdf", initiator: "Marie Dupont", status: "en cours", currentStep: "Approbation juridique", totalSteps: 4, completedSteps: 2, date: "11/03/2026" },
  { id: "WF-002", name: "Revue budget prévisionnel", document: "Budget_2026.xlsx", initiator: "Claire Leroy", status: "terminé", currentStep: "Archivé", totalSteps: 3, completedSteps: 3, date: "08/03/2026" },
  { id: "WF-003", name: "Approbation note interne RH", document: "Note_RH_mars.docx", initiator: "Jean Martin", status: "bloqué", currentStep: "Signature DG", totalSteps: 5, completedSteps: 3, date: "10/03/2026" },
  { id: "WF-004", name: "Circuit qualité procédure", document: "Proc_qualite_v2.pdf", initiator: "Sophie Moreau", status: "en cours", currentStep: "Revue technique", totalSteps: 4, completedSteps: 1, date: "12/03/2026" },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  "en cours": { label: "En cours", color: "bg-blue-100 text-blue-800", icon: Play },
  terminé: { label: "Terminé", color: "bg-green-100 text-green-800", icon: CheckCircle },
  bloqué: { label: "Bloqué", color: "bg-red-100 text-red-800", icon: AlertTriangle },
};

const Workflows = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockWorkflows
    .filter((w) => filter === "all" || w.status === filter)
    .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <div className="app-content">
        <h1 className="page-title">Rechercher un workflow</h1>
        <p className="page-subtitle">Retrouvez et suivez l'avancement de vos circuits de validation.</p>

        <div className="flex flex-wrap items-center gap-4 mt-6 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher par nom ou ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="en cours">En cours</SelectItem>
              <SelectItem value="terminé">Terminé</SelectItem>
              <SelectItem value="bloqué">Bloqué</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary">{filtered.length} workflow(s)</Badge>
        </div>

        <div className="space-y-3">
          {filtered.map((wf) => {
            const cfg = statusConfig[wf.status];
            const StatusIcon = cfg.icon;
            return (
              <Card key={wf.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <GitBranch className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{wf.id}</span>
                      <p className="text-sm font-medium truncate">{wf.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {wf.document} · Par {wf.initiator} · {wf.date}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: wf.totalSteps }).map((_, i) => (
                          <div key={i} className={`h-1.5 w-6 rounded-full ${i < wf.completedSteps ? "bg-primary" : "bg-muted"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Étape {wf.completedSteps}/{wf.totalSteps} — {wf.currentStep}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </span>
                  <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Workflows;
