import React, { JSX, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../state/store";
import { fetchUserProfile } from "../../../state/authSlice";

interface UserProtectedRouteProps {
  children: JSX.Element;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({
  children,
}) => {
  const {
    isLoggedIn,
    user,
    loading: isUserProfileLoading,
    jwt,
  } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt && !user && !isUserProfileLoading) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [dispatch, jwt, user, isUserProfileLoading]);

  if (isUserProfileLoading) {
    return <div>Loading User Profile...</div>;
  }

  if (isLoggedIn && user) {
    return children;
  }

  console.log(
    "UserProtectedRoute: Redirecting to login. State:",
    "isLoggedIn:",
    isLoggedIn,
    "user:",
    user ? "exists" : "null",
    "isUserProfileLoading:",
    isUserProfileLoading,
    "jwt:",
    jwt ? "exists" : "null",
    "path:",
    location.pathname
  );
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserProtectedRoute;
