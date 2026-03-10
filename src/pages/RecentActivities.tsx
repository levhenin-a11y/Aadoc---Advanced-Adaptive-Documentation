import MainLayout from "@/components/layout/MainLayout";
import { Clock, FileText, Upload, UserCheck, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    action: "Document importé",
    detail: "Rapport_Annuel_2025.pdf",
    user: "Marie Dupont",
    date: "Il y a 2 heures",
    icon: Upload,
    type: "upload",
  },
  {
    id: 2,
    action: "Workflow assigné",
    detail: "Circuit de validation - Contrat fournisseur",
    user: "Jean Martin",
    date: "Il y a 4 heures",
    icon: GitBranch,
    type: "workflow",
  },
  {
    id: 3,
    action: "Document signé",
    detail: "Avenant_Contrat_2024.pdf",
    user: "Sophie Bernard",
    date: "Hier à 16h30",
    icon: UserCheck,
    type: "signature",
  },
  {
    id: 4,
    action: "Document consulté",
    detail: "Procédure_Qualité_v3.docx",
    user: "Pierre Lefèvre",
    date: "Hier à 14h15",
    icon: FileText,
    type: "consultation",
  },
  {
    id: 5,
    action: "Document importé",
    detail: "Note_de_service_Mars.pdf",
    user: "Marie Dupont",
    date: "Il y a 2 jours",
    icon: Upload,
    type: "upload",
  },
  {
    id: 6,
    action: "Workflow terminé",
    detail: "Validation budget Q1 2025",
    user: "Jean Martin",
    date: "Il y a 3 jours",
    icon: GitBranch,
    type: "workflow",
  },
];

const typeBadge: Record<string, string> = {
  upload: "Import",
  workflow: "Workflow",
  signature: "Signature",
  consultation: "Consultation",
};

const RecentActivities = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Activités récentes
        </h2>

        <Card className="bg-card/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2 pb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Historique d'activité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
              >
                <div className="mt-1 p-2 rounded-md bg-primary/10">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-card-foreground">
                      {activity.action}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {typeBadge[activity.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {activity.detail}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.user} · {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RecentActivities;
