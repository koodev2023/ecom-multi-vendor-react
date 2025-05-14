import React from "react";
import SellerDrawerList from "../../components/SellerDrawerList/SellerDrawerList";
import SellerRoutes from "../../../routes/SellerRoutes";

const SellerDashboard = () => {
  const toggleDrawer = () => {};

  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </section>

        <section className="p-10 w-full lg:w-4/5 overflow-y-auto">
          <SellerRoutes />
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
