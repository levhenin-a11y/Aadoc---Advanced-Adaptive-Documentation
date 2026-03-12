import MainLayout from "@/components/layout/MainLayout";
import { UserCheck, Mail, Phone, Shield, MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Signatory {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "actif" | "inactif" | "en attente";
  signedCount: number;
}

const mockSignatories: Signatory[] = [
  { id: "1", name: "Marie Dupont", email: "m.dupont@corp.com", role: "Directrice Juridique", department: "Juridique", status: "actif", signedCount: 47 },
  { id: "2", name: "Jean Martin", email: "j.martin@corp.com", role: "Responsable RH", department: "RH", status: "actif", signedCount: 32 },
  { id: "3", name: "Claire Leroy", email: "c.leroy@corp.com", role: "Directrice Financière", department: "Finance", status: "en attente", signedCount: 18 },
  { id: "4", name: "Paul Bernard", email: "p.bernard@corp.com", role: "Chef de Projet", department: "IT", status: "actif", signedCount: 25 },
  { id: "5", name: "Sophie Moreau", email: "s.moreau@corp.com", role: "Responsable Qualité", department: "Qualité", status: "inactif", signedCount: 9 },
];

const statusColor: Record<string, string> = {
  actif: "bg-green-100 text-green-800",
  inactif: "bg-muted text-muted-foreground",
  "en attente": "bg-amber-100 text-amber-800",
};

const Signataires = () => {
  const [search, setSearch] = useState("");

  const filtered = mockSignatories.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="app-content">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">e-Signataires</h1>
            <p className="page-subtitle">Gérez les signataires autorisés pour les circuits de validation électronique.</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" />Ajouter un signataire</Button>
        </div>

        <div className="mt-6 mb-4">
          <Input placeholder="Rechercher par nom ou département…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sig) => (
            <Card key={sig.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {sig.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{sig.name}</p>
                    <p className="text-xs text-muted-foreground">{sig.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{sig.department}</Badge>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[sig.status]}`}>
                        {sig.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{sig.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Shield className="h-3 w-3 inline mr-1" />{sig.signedCount} documents signés
                    </p>
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

export default Signataires;
