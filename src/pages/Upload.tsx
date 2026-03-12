import MainLayout from "@/components/layout/MainLayout";
import { Upload as UploadIcon, FileUp, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "complete" | "error";
  category: string;
}

const Upload = () => {
  const [category, setCategory] = useState("corporate");
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "Rapport_Q1_2026.pdf", size: "2.4 MB", progress: 100, status: "complete", category: "Corporate" },
    { id: "2", name: "Specs_Techniques_v3.docx", size: "1.1 MB", progress: 65, status: "uploading", category: "Technique" },
    { id: "3", name: "Photo_badge.png", size: "540 KB", progress: 0, status: "error", category: "RH" },
  ]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <MainLayout>
      <div className="app-content">
        <h1 className="page-title">Importer un fichier</h1>
        <p className="page-subtitle">Téléversez vos documents dans la base documentaire de votre choix.</p>

        <div className="grid gap-6 lg:grid-cols-3 mt-6">
          {/* Upload zone */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Zone de dépôt</CardTitle>
              <CardDescription>Glissez-déposez vos fichiers ou cliquez pour parcourir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="upload-dropzone">
                <UploadIcon className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">Glissez vos fichiers ici</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, PNG, JPG — max 25 MB</p>
                <Button variant="outline" className="mt-4">
                  <FileUp className="mr-2 h-4 w-4" />
                  Parcourir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options d'import</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Base de destination</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Documents Corporate</SelectItem>
                    <SelectItem value="technique">Documentation Technique</SelectItem>
                    <SelectItem value="legal">Documents Légaux</SelectItem>
                    <SelectItem value="rh">Ressources Humaines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description (optionnel)</Label>
                <Input placeholder="Ajoutez une description…" />
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Séparez par des virgules…" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File list */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Fichiers en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="upload-file-row">
                  <File className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{file.name}</span>
                      <Badge variant="outline" className="text-xs">{file.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-1.5 flex-1 max-w-48" />
                      )}
                      {file.status === "complete" && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" /> Terminé
                        </span>
                      )}
                      {file.status === "error" && (
                        <span className="flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" /> Échec
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {files.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">Aucun fichier en attente.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Upload;
