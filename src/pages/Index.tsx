import { Eye, Network, Upload } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ActionCard from "@/components/cards/ActionCard";

const Index = () => {
  return (
    <MainLayout>
      {/* Tagline */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-medium text-primary-foreground">
          Consult / Upload / Assign &gt; Done.
        </h2>
      </div>

      {/* Action Cards */}
      <section className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto flex-1">
        {/* Consult Card */}
        <ActionCard
          title="CONSULT"
          description="Search the database and consult documents."
          icon={<Eye className="h-10 w-10 text-primary-foreground" />}
          permissionLabel="You must be READER"
          permissionType="reader"
          onAction={() => console.log("Navigate to consult")}
          className="h-full"
        />

        {/* Upload Card */}
        <ActionCard
          title="UPLOAD"
          description="Upload document and create the entry in the database."
          icon={<Upload className="h-10 w-10 text-primary-foreground" />}
          permissionLabel="You must be USER"
          permissionType="user"
          onAction={() => console.log("Navigate to upload")}
          className="h-full"
        />

        {/* Assign Card */}
        <ActionCard
          title="ASSIGN"
          description="Assign documents to users for review."
          icon={<Network className="h-10 w-10 text-primary-foreground" />}
          permissionLabel="You must be EDITOR"
          permissionType="editor"
          onAction={() => console.log("Navigate to assign")}
          className="h-full"
        />
      </section>
    </MainLayout>
  );
};

export default Index;
