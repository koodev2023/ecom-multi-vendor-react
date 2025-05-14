import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/store";
import { logout } from "../state/authSlice";

interface MenuItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}

interface DrawerListProps {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div className="space-y-2">
          {menu.map((item, index: number) => (
            <div
              className="pr-9 cursor-pointer"
              key={index}
              onClick={() => navigate(item.path)}
            >
              <div
                className={`${
                  location.pathname === item.path
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 text-lg font-semibold rounded-r-2xl`}
                onClick={toggleDrawer}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <div className="space-y-2">
          {menu2.map((item, index: number) => (
            <div
              className="pr-9 cursor-pointer"
              key={index}
              onClick={() =>
                item.path === "/" ? handleLogout() : navigate(item.path)
              }
            >
              <div
                className={`${
                  location.pathname === item.path
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 text-lg font-semibold rounded-r-2xl`}
                // onClick={toggleDrawer}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
