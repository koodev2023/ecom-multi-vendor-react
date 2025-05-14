import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategory />

        <CategoryGrid />

        <div className="pt-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">
            TODAY'S DEALS
          </h1>
          <Deal />
        </div>

        <section className="py-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">
            SHOP BY CATEGORY
          </h1>
          <ShopByCategory />
        </section>

        <section className="lg:px-20 relative h-[200px] lg:h-[450px]">
          <img
            className="w-full h-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1682089094675-a8f9aff0ff31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-1/2 left-4 lg:left-[15rem] transform-translate-y-[-50%] font-semibold lg:text-4xl space-y-3 bg-gray-300 bg-opacity-70 p-5 rounded-lg">
            <h1>Sell Your Product</h1>
            <p className="text-lg md:text-2xl">
              With <span className="logo">E Commerce</span>
            </p>

            <div className="pt-6 flex justify-center">
              <Button
                startIcon={<Storefront />}
                onClick={() => navigate("/become-seller")}
                size="large"
                variant="contained"
              >
                Become Seller
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
