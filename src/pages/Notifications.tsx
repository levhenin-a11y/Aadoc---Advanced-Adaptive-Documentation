import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  BellOff,
  Flag,
  Trash2,
  AlertTriangle,
  Clock,
  CheckCircle,
  Info,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Notification {
  id: string;
  title: string;
  description: string;
  urgency: "critical" | "high" | "medium" | "low";
  deadline: string;
  category: string;
  read: boolean;
  flagged: boolean;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Validation urgente requise",
    description: "Le document 'Rapport Q4 2025' nécessite votre approbation avant ce soir.",
    urgency: "critical",
    deadline: "Aujourd'hui 18h00",
    category: "Validation",
    read: false,
    flagged: false,
    date: "12/03/2026",
  },
  {
    id: "2",
    title: "Signature électronique en attente",
    description: "Contrat fournisseur ABC Corp. en attente de votre signature.",
    urgency: "high",
    deadline: "13/03/2026",
    category: "Signature",
    read: false,
    flagged: true,
    date: "11/03/2026",
  },
  {
    id: "3",
    title: "Nouveau document assigné",
    description: "Le workflow 'Procédure qualité v3.2' vous a été assigné pour révision.",
    urgency: "medium",
    deadline: "18/03/2026",
    category: "Workflow",
    read: true,
    flagged: false,
    date: "10/03/2026",
  },
  {
    id: "4",
    title: "Rappel : archivage trimestriel",
    description: "Les documents du Q3 2025 doivent être archivés avant la fin du mois.",
    urgency: "low",
    deadline: "31/03/2026",
    category: "Archive",
    read: true,
    flagged: false,
    date: "08/03/2026",
  },
  {
    id: "5",
    title: "Mise à jour de politique interne",
    description: "La politique de sécurité informatique a été mise à jour. Veuillez en prendre connaissance.",
    urgency: "medium",
    deadline: "20/03/2026",
    category: "Information",
    read: false,
    flagged: false,
    date: "09/03/2026",
  },
];

const urgencyConfig = {
  critical: { label: "Critique", icon: AlertTriangle, className: "bg-destructive text-destructive-foreground" },
  high: { label: "Élevé", icon: Clock, className: "bg-warning text-warning-foreground" },
  medium: { label: "Moyen", icon: Info, className: "bg-info text-info-foreground" },
  low: { label: "Faible", icon: CheckCircle, className: "bg-success text-success-foreground" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState(
    localStorage.getItem("notif-delivery") || "email"
  );
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleFlag = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, flagged: !n.flagged } : n))
    );
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDeliveryChange = (value: string) => {
    setDeliveryMethod(value);
    localStorage.setItem("notif-delivery", value);
  };

  const filtered = notifications.filter((n) => {
    if (filterUrgency !== "all" && n.urgency !== filterUrgency) return false;
    if (filterCategory !== "all" && n.category !== filterCategory) return false;
    return true;
  });

  const categories = [...new Set(mockNotifications.map((n) => n.category))];

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h2 className="tagline-title">Notifications</h2>
      </div>

      <div className="notifications-layout">
        {/* Settings panel */}
        <Card className="notifications-settings-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Master toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-toggle" className="text-sm font-semibold text-card-foreground">
                Recevoir des notifications
              </Label>
              <Switch
                id="notif-toggle"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {notificationsEnabled && (
              <>
                <Separator />

                {/* Delivery method */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-card-foreground">
                    Canal de réception
                  </Label>
                  <RadioGroup value={deliveryMethod} onValueChange={handleDeliveryChange}>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="email" id="r-email" />
                      <Label htmlFor="r-email">Par e-mail</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="sms" id="r-sms" />
                      <Label htmlFor="r-sms">Par SMS</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="both" id="r-both" />
                      <Label htmlFor="r-both">E-mail + SMS</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="app" id="r-app" />
                      <Label htmlFor="r-app">Dans l'application uniquement</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Filter by urgency */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtrer par urgence
                  </Label>
                  <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                      <SelectItem value="high">Élevé</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter by category */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtrer par catégorie
                  </Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Notifications list */}
        <div className="notifications-list">
          {!notificationsEnabled ? (
            <Card className="notifications-disabled-card">
              <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
                <BellOff className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground text-lg">
                  Les notifications sont désactivées
                </p>
                <p className="text-muted-foreground text-sm">
                  Activez-les dans les paramètres pour recevoir vos alertes.
                </p>
              </CardContent>
            </Card>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle className="h-12 w-12 text-success" />
                <p className="text-muted-foreground text-lg">Aucune notification</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((notif) => {
              const urgency = urgencyConfig[notif.urgency];
              const UrgencyIcon = urgency.icon;
              return (
                <Card
                  key={notif.id}
                  className={`notification-card ${notif.flagged ? "notification-card--flagged" : ""} ${!notif.read ? "notification-card--unread" : ""}`}
                  onClick={() => handleMarkRead(notif.id)}
                >
                  <CardContent className="notification-card-content">
                    <div className="notification-card-body">
                      <div className="notification-card-header">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={urgency.className}>
                            <UrgencyIcon className="h-3 w-3 mr-1" />
                            {urgency.label}
                          </Badge>
                          <Badge variant="outline">{notif.category}</Badge>
                          {!notif.read && (
                            <span className="notification-unread-dot" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{notif.date}</span>
                      </div>

                      <h4 className="text-sm font-semibold text-card-foreground">
                        {notif.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{notif.description}</p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Échéance : {notif.deadline}</span>
                      </div>
                    </div>

                    <div className="notification-card-actions">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); handleFlag(notif.id); }}
                        title={notif.flagged ? "Retirer le flag" : "Flagger"}
                      >
                        <Flag className={`h-4 w-4 ${notif.flagged ? "text-warning fill-warning" : "text-muted-foreground"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
