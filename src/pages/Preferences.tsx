import MainLayout from "@/components/layout/MainLayout";
import EditPreferences from "@/components/layout/EditPreferences";

const Preferences = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Préférences
        </h2>
      </div>

      {/* Preferences Form */}
      <section className="flex-1">
        <EditPreferences />
      </section>
    </MainLayout>
  );
};

export default Preferences;
