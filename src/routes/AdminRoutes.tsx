import React from "react";
import { Route, Routes } from "react-router-dom";
import SellersTable from "../admin/pages/Sellers/SellersTable";
import Coupon from "../admin/pages/Coupon/Coupon";
import CreateCouponForm from "../admin/pages/Coupon/CreateCouponForm";
import GridTable from "../admin/pages/HomePage/GridTable";
import ElectronicTable from "../admin/pages/HomePage/ElectronicTable";
import ShopByCategoryTable from "../admin/pages/HomePage/ShopByCategoryTable";
import Deal from "../admin/pages/HomePage/Deal";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellersTable />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/create-coupon" element={<CreateCouponForm />} />
        <Route path="/home-grid" element={<GridTable />} />
        <Route path="/electronic-table" element={<ElectronicTable />} />
        <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
        <Route path="/deals" element={<Deal />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
