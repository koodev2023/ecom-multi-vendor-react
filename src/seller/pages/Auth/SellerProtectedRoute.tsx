import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  clearSellerProfile,
  fetchSellerProfile,
} from "../../../state/seller/sellerSlice";

interface SellerProtectedRouteProps {
  children: React.ReactElement;
}

const SellerProtectedRoute: React.FC<SellerProtectedRouteProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { profile: sellerProfile, status: sellerStatus } = useAppSelector(
    (state) => state.seller
  );

  useEffect(() => {
    const sellerToken = localStorage.getItem("token");

    if (sellerToken) {
      if (!sellerProfile && sellerStatus === "idle") {
        dispatch(fetchSellerProfile(sellerToken));
      }
    } else {
      if (sellerProfile || sellerStatus !== "idle") {
        dispatch(clearSellerProfile());
      }
    }
  }, [dispatch, sellerProfile, sellerStatus]);

  const sellerToken = localStorage.getItem("token");

  if (!sellerToken) {
    return (
      <Navigate
        to="/become-seller"
        state={{
          from: location,
          message:
            "Seller session not found. Please log in as a seller or complete your seller registration.",
        }}
        replace
      />
    );
  }

  if (sellerStatus === "loading") {
    return <div>Loading Seller Profile...</div>;
  }

  if (sellerStatus === "failed") {
    return (
      <Navigate
        to="/"
        state={{
          error:
            "Failed to load your seller information. This could be due to an invalid session. Please try logging out and back in as a seller, or contact support.",
        }}
        replace
      />
    );
  }

  if (sellerStatus === "succeeded" && sellerProfile) {
    return children;
  }

  if (sellerStatus === "idle" && !sellerProfile) {
    return <div>Verifying seller status...</div>;
  }

  console.warn(
    "SellerProtectedRoute: Reached an unexpected state while checking seller access.",
    {
      sellerStatus,
      hasSellerProfile: !!sellerProfile,
      hasSellerToken: !!sellerToken,
    }
  );
  return (
    <Navigate
      to="/become-seller"
      state={{
        from: location,
        message:
          "An unexpected issue occurred while verifying your seller access. Please try again or contact support.",
      }}
      replace
    />
  );
};

export default SellerProtectedRoute;
