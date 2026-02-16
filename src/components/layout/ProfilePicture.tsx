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
    <div className="space-y-2">
      <Label className="text-base font-semibold text-primary-foreground">
        Photo de profil
      </Label>
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 border-2 border-border">
          <AvatarImage src={avatarUrl} alt="Photo de profil" />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Button
            type="button"
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
  );
};

export default ProfilePicture;
