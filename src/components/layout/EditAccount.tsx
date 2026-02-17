import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ProfilePicture from "@/components/layout/ProfilePicture";

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

  useEffect(() => {
    const loaded = loadSavedAccount();
    setAccount(loaded);
    setSavedAccount(loaded);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem("account-avatar", account.avatarUrl);
    localStorage.setItem("account-login", account.login);
    localStorage.setItem("account-entity", account.entity);
    localStorage.setItem("account-visibility", account.visibility);

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
    <div className="settings-panel">
      {/* Photo de profil */}
      <ProfilePicture
        avatarUrl={account.avatarUrl}
        fallbackText={account.login.slice(0, 2).toUpperCase()}
        onAvatarChange={(url) => setAccount((prev) => ({ ...prev, avatarUrl: url }))}
      />

      {/* Login */}
      <div className="settings-section">
        <Label htmlFor="login" className="settings-label">
          Login
        </Label>
        <Input
          id="login"
          value={account.login}
          disabled
          className="settings-input settings-input--disabled"
        />
        <p className="settings-help">
          Vous devez être MANAGER afin de modifier ce champ
        </p>
      </div>

      {/* Entité hiérarchique */}
      <div className="settings-section">
        <Label htmlFor="entity" className="settings-label">
          Entité hiérarchique
        </Label>
        <Input
          id="entity"
          value={account.entity}
          disabled
          className="settings-input settings-input--disabled"
        />
        <p className="settings-help">
          Vous devez être MANAGER afin de modifier ce champ
        </p>
      </div>

      {/* Visibilité */}
      <div className="settings-section">
        <Label htmlFor="visibility" className="settings-label">
          Visibilité
        </Label>
        <Input
          id="visibility"
          value={account.visibility}
          disabled
          className="settings-input settings-input--disabled"
        />
        <p className="settings-help">
          DG, UNIT, SERVICE, SECTOR. Plus votre niveau est haut, plus vous pourrez voir de documents dans la Base de Données. Seul votre MANAGER peut modifier ce niveau
        </p>
      </div>

      {/* Boutons Sauvegarder / Annuler */}
      <div className="settings-actions">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="btn-outline-light"
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          className="btn-accent"
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default EditAccount;
