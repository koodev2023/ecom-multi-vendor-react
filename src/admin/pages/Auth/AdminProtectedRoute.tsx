import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../state/store";
import { UserRoleEnum } from "../../../api/generated-fetch";

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoggedIn && !user) {
    return <div>Loading User Profile...</div>;
  }

  if (!isLoggedIn || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, message: "Admin access requires login." }}
        replace
      />
    );
  }

  const isAdmin = user.role === UserRoleEnum.RoleAdmin;

  if (isAdmin) {
    return children;
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/"
        state={{
          error: "Access Denied. You are not authorized to view this page.",
        }}
        replace
      />
    );
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminProtectedRoute;
