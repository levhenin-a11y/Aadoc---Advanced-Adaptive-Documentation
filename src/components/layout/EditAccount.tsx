import { useState, useEffect, useCallback, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/bmp"];

interface AccountData {
  avatarUrl: string;
  login: string;
  entity: string;
  visibility: string;
}

const loadSavedAccount = (): AccountData => ({
  avatarUrl: localStorage.getItem("account-avatar") || "",
  login: localStorage.getItem("account-login") || "heninvu",
  entity: localStorage.getItem("account-entity") || "",
  visibility: localStorage.getItem("account-visibility") || "DG",
});

const EditAccount = () => {
  const [account, setAccount] = useState<AccountData>(loadSavedAccount);
  const [savedAccount, setSavedAccount] = useState<AccountData>(loadSavedAccount);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loaded = loadSavedAccount();
    setAccount(loaded);
    setSavedAccount(loaded);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: "Format non supporté",
          description: "Uniquement JPEG, PNG ou BMP.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale est de 500 Ko.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setAccount((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleSave = useCallback(() => {
    localStorage.setItem("account-avatar", account.avatarUrl);
    localStorage.setItem("account-login", account.login);
    localStorage.setItem("account-entity", account.entity);
    localStorage.setItem("account-visibility", account.visibility);

    // Dispatch event so Header can pick up the new avatar
    window.dispatchEvent(new Event("account-updated"));

    setSavedAccount(account);
    toast({
      title: "Profil sauvegardé",
      description: "Vos informations ont été mises à jour.",
    });
  }, [account]);

  const handleCancel = useCallback(() => {
    setAccount(savedAccount);
  }, [savedAccount]);

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      {/* Photo de profil */}
      <div className="space-y-2">
        <Label className="text-base font-semibold text-primary-foreground">
          Photo de profil
        </Label>
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src={account.avatarUrl} alt="Photo de profil" />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {account.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Upload className="mr-2 h-4 w-4" />
              Parcourir
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.bmp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <p className="text-xs text-primary-foreground/60">
          Uniquement JPEG, PNG ou BMP, max. 500Ko
        </p>
      </div>

      {/* Login */}
      <div className="space-y-2">
        <Label htmlFor="login" className="text-base font-semibold text-primary-foreground">
          Login
        </Label>
        <Input
          id="login"
          value={account.login}
          disabled
          className="bg-card text-card-foreground border-border opacity-70"
        />
        <p className="text-xs text-primary-foreground/60">
          Vous devez être MANAGER afin de modifier ce champ
        </p>
      </div>

      {/* Entité hiérarchique */}
      <div className="space-y-2">
        <Label htmlFor="entity" className="text-base font-semibold text-primary-foreground">
          Entité hiérarchique
        </Label>
        <Input
          id="entity"
          value={account.entity}
          disabled
          className="bg-card text-card-foreground border-border opacity-70"
        />
        <p className="text-xs text-primary-foreground/60">
          Vous devez être MANAGER afin de modifier ce champ
        </p>
      </div>

      {/* Visibilité */}
      <div className="space-y-2">
        <Label htmlFor="visibility" className="text-base font-semibold text-primary-foreground">
          Visibilité
        </Label>
        <Input
          id="visibility"
          value={account.visibility}
          disabled
          className="bg-card text-card-foreground border-border opacity-70"
        />
        <p className="text-xs text-primary-foreground/60">
          DG, UNIT, SERVICE, SECTOR. Plus votre niveau est haut, plus vous pourrez voir de documents dans la Base de Données. Seul votre MANAGER peut modifier ce niveau
        </p>
      </div>

      {/* Boutons Sauvegarder / Annuler */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default EditAccount;
