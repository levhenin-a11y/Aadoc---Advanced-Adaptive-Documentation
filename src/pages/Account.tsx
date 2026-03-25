import MainLayout from "@/components/layout/MainLayout";
import EditAccount from "@/components/layout/EditAccount";

const Account = () => {
  return (
    <MainLayout>
      {/* Title */}
      <div className="title-container">
        <h2>
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
