import MainLayout from "@/components/layout/MainLayout";
import { BarChart3, FileText, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Documents", value: "124", icon: FileText },
  { label: "En attente", value: "7", icon: Clock },
  { label: "Ce mois", value: "32", icon: TrendingUp },
  { label: "Total workflows", value: "18", icon: BarChart3 },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Tableau de bord
        </h2>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s) => (
            <Card key={s.label} className="bg-card/80 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
                <s.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Aucune activité récente à afficher pour le moment.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
