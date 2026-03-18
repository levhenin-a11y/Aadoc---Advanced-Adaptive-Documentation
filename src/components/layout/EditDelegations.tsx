import { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, UserPlus, Trash2, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Delegation {
  id: string;
  delegateName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  allowSignature: boolean;
}

// Mock users for autocomplete — will be replaced by DB query
const mockUsers = [
  "Alice Dupont",
  "Bernard Martin",
  "Claire Leroy",
  "David Moreau",
  "Emma Petit",
  "François Dubois",
  "Gabrielle Laurent",
  "Hugo Simon",
  "Isabelle Michel",
  "Jean Lefebvre",
];

const emptyDelegation = (): Delegation => ({
  id: crypto.randomUUID(),
  delegateName: "",
  startDate: undefined,
  endDate: undefined,
  allowSignature: false,
});

const EditDelegations = () => {
  const [delegations, setDelegations] = useState<Delegation[]>([emptyDelegation()]);
  const [savedDelegations, setSavedDelegations] = useState<Delegation[]>([emptyDelegation()]);
  const [openCombobox, setOpenCombobox] = useState<string | null>(null);

  const updateDelegation = useCallback((id: string, updates: Partial<Delegation>) => {
    setDelegations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  }, []);

  const addDelegation = useCallback(() => {
    setDelegations((prev) => [...prev, emptyDelegation()]);
  }, []);

  const removeDelegation = useCallback((id: string) => {
    setDelegations((prev) => (prev.length > 1 ? prev.filter((d) => d.id !== id) : prev));
  }, []);

  const handleSave = useCallback(() => {
    const invalid = delegations.some((d) => !d.delegateName || !d.startDate || !d.endDate);
    if (invalid) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir le nom du délégué et les dates pour chaque délégation.",
        variant: "destructive",
      });
      return;
    }
    setSavedDelegations(delegations);
    toast({
      title: "Délégations sauvegardées",
      description: "Vos délégations ont été mises à jour.",
    });
  }, [delegations]);

  const handleCancel = useCallback(() => {
    setDelegations(savedDelegations);
  }, [savedDelegations]);

  return (
    <div className="settings-panel">
      <div className="settings-card">
        <p className="settings-help">
          Autorisez d'autres utilisateurs à accéder à votre profil, consulter vos documents téléchargés
          et vos e-Signataires pendant une période définie.
        </p>

        {delegations.map((delegation, index) => (
          <div key={delegation.id} className="delegation-entry">
            {/* Header row */}
            <div className="delegation-entry-header">
              <span className="settings-label">
                Délégation {delegations.length > 1 ? `#${index + 1}` : ""}
              </span>
              {delegations.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDelegation(delegation.id)}
                  className="delegation-remove-btn"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Delegate autocomplete */}
            <div className="settings-section">
              <Label className="settings-label">Délégué</Label>
              <Popover
                open={openCombobox === delegation.id}
                onOpenChange={(open) => setOpenCombobox(open ? delegation.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "delegation-combobox",
                      !delegation.delegateName && "text-muted-foreground"
                    )}
                  >
                    {delegation.delegateName || "Rechercher un utilisateur…"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="delegation-combobox-popover" align="start">
                  <Command>
                    <CommandInput placeholder="Nom ou prénom…" />
                    <CommandList>
                      <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
                      <CommandGroup>
                        {mockUsers.map((user) => (
                          <CommandItem
                            key={user}
                            value={user}
                            onSelect={() => {
                              updateDelegation(delegation.id, { delegateName: user });
                              setOpenCombobox(null);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                delegation.delegateName === user ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {user}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Date range */}
            <div className="delegation-dates">
              {/* Start date */}
              <div className="settings-section flex-1">
                <Label className="settings-label">De</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "delegation-date-btn",
                        !delegation.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {delegation.startDate
                        ? format(delegation.startDate, "dd/MM/yyyy", { locale: fr })
                        : "Date de début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={delegation.startDate}
                      onSelect={(date) => updateDelegation(delegation.id, { startDate: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End date */}
              <div className="settings-section flex-1">
                <Label className="settings-label">À</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "delegation-date-btn",
                        !delegation.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {delegation.endDate
                        ? format(delegation.endDate, "dd/MM/yyyy", { locale: fr })
                        : "Date de fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={delegation.endDate}
                      onSelect={(date) => updateDelegation(delegation.id, { endDate: date })}
                      disabled={(date) =>
                        delegation.startDate ? date < delegation.startDate : false
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Signature checkbox */}
            <div className="delegation-checkbox-row">
              <Checkbox
                id={`sig-${delegation.id}`}
                checked={delegation.allowSignature}
                onCheckedChange={(checked) =>
                  updateDelegation(delegation.id, { allowSignature: !!checked })
                }
              />
              <Label htmlFor={`sig-${delegation.id}`} className="delegation-checkbox-label">
                Autoriser les signatures électroniques «&nbsp;on behalf of&nbsp;»
              </Label>
            </div>
          </div>
        ))}

        {/* Add delegation */}
        <Button variant="outline" onClick={addDelegation} className="delegation-add-btn">
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter une délégation
        </Button>

        {/* Actions */}
        <div className="settings-actions">
          <Button variant="outline" onClick={handleCancel} className="btn-secondary">
            Annuler
          </Button>
          <Button onClick={handleSave} className="btn-accent">
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDelegations;
