import { Eye, Upload } from "lucide-react";
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
      <section className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Consult Card */}
        <ActionCard
          title="CONSULT"
          description="Search the database and consult documents."
          icon={<Eye className="h-8 w-8 text-primary-foreground" />}
          permissionLabel="You must be READER"
          permissionType="reader"
          onAction={() => console.log("Navigate to consult")}
        />

        {/* Upload Card */}
        <ActionCard
          title="UPLOAD"
          description="Upload document and create the entry in the database."
          icon={<Upload className="h-8 w-8 text-primary-foreground" />}
          permissionLabel="You must be USER"
          permissionType="user"
          onAction={() => console.log("Navigate to upload")}
        />
      </section>
    </MainLayout>
  );
};

export default Index;
