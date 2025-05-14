import React from "react";
import DrawerList from "../../components/DrawerList";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Category,
  Dashboard,
  ElectricBike,
  ElectricBolt,
  Home,
  Inventory,
  LocalOffer,
  Logout,
  Note,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <Note className="text-primary-color" />,
    activeIcon: <Note className="text-white" />,
  },
  {
    name: "Create Coupon",
    path: "/admin/create-coupon",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Home Page",
    path: "/admin/home-grid",
    icon: <Home className="text-primary-color" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Electronic Category",
    path: "/admin/electronic-table",
    icon: <ElectricBolt className="text-primary-color" />,
    activeIcon: <ElectricBolt className="text-white" />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category className="text-primary-color" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deal",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const AdminDrawerList = ({ toggleDrawer }: { toggleDrawer: any }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;
