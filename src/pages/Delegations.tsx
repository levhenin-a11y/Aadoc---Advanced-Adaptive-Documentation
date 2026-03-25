import MainLayout from "@/components/layout/MainLayout";
import EditDelegations from "@/components/layout/EditDelegations";

const Delegations = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="title-container">
        <h2>
          Délégations
        </h2>
      </div>

      {/* Delegations Form */}
      <section className="flex-1">
        <EditDelegations />
      </section>
    </MainLayout>
  );
};

export default Delegations;
