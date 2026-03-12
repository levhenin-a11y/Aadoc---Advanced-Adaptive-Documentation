import MainLayout from "@/components/layout/MainLayout";
import { FileCheck, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface PendingItem {
  id: string;
  name: string;
  submittedBy: string;
  date: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  priority: "haute" | "moyenne" | "basse";
}

const mockItems: PendingItem[] = [
  { id: "1", name: "Contrat_fournisseur_2026.pdf", submittedBy: "Marie Dupont", date: "10/03/2026", type: "Contrat", status: "pending", priority: "haute" },
  { id: "2", name: "Note_interne_RH.docx", submittedBy: "Jean Martin", date: "09/03/2026", type: "Note interne", status: "pending", priority: "moyenne" },
  { id: "3", name: "Budget_previsionnel.xlsx", submittedBy: "Claire Leroy", date: "08/03/2026", type: "Budget", status: "approved", priority: "haute" },
  { id: "4", name: "Procedure_qualite_v2.pdf", submittedBy: "Paul Bernard", date: "07/03/2026", type: "Procédure", status: "rejected", priority: "basse" },
  { id: "5", name: "Plan_formation_2026.pdf", submittedBy: "Sophie Moreau", date: "06/03/2026", type: "Plan", status: "pending", priority: "moyenne" },
];

const statusConfig = {
  pending: { label: "En attente", color: "bg-amber-100 text-amber-800", icon: Clock },
  approved: { label: "Approuvé", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejeté", color: "bg-red-100 text-red-800", icon: XCircle },
};

const PendingValidation = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockItems : mockItems.filter((i) => i.status === filter);

  return (
    <MainLayout>
      <div className="app-content">
        <h1 className="page-title">Validation en attente</h1>
        <p className="page-subtitle">Documents soumis pour approbation ou en cours de revue.</p>

        <div className="flex items-center gap-4 mt-6 mb-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrer par statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary">{filtered.length} document(s)</Badge>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => {
            const cfg = statusConfig[item.status];
            const StatusIcon = cfg.icon;
            return (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <FileCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Par {item.submittedBy} · {item.date} · {item.type}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">{item.priority}</Badge>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    {item.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default PendingValidation;
