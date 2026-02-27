import MainLayout from "@/components/layout/MainLayout";
import EditAccount from "@/components/layout/EditAccount";

const Account = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-6">
          Account
        </h2>
      </div>

      {/* Account Form */}
      <section className="flex-1">
        <EditAccount />
      </section>
    </MainLayout>
  );
};

export default Account;
