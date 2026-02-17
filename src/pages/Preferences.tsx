import MainLayout from "@/components/layout/MainLayout";
import EditPreferences from "@/components/layout/EditPreferences";

const Preferences = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-medium text-primary-foreground">
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
