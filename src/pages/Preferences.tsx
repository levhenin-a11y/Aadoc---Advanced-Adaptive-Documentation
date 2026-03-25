import MainLayout from "@/components/layout/MainLayout";
import EditPreferences from "@/components/layout/EditPreferences";

const Preferences = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="title-container">
        <h2>
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
