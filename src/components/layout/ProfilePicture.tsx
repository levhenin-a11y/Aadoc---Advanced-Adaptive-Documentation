import { useRef, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/bmp"];

interface ProfilePictureProps {
  avatarUrl: string;
  fallbackText: string;
  onAvatarChange: (dataUrl: string) => void;
}

const ProfilePicture = ({ avatarUrl, fallbackText, onAvatarChange }: ProfilePictureProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        onAvatarChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onAvatarChange]
  );

  return (
    <div className="profile-section">
      <Label className="profile-title">
        Photo de profil
      </Label>
      <div className="profile-row">
        <Avatar className="profile-avatar">
          <AvatarImage src={avatarUrl} alt="Photo de profil" />
          <AvatarFallback className="profile-fallback">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
        <div className="profile-actions">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="profile-upload-btn"
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
      <p className="profile-hint">
        Uniquement JPEG, PNG ou BMP, max. 500Ko
      </p>
    </div>
  );
};

export default ProfilePicture;
