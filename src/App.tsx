import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes } from "react-router-dom";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./state/store";

import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./state/authSlice";
import PaymentSuccess from "./customer/pages/Payment/PaymentSuccess";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import UserProtectedRoute from "./customer/pages/Auth/UserProtectedRoute";
import SellerProtectedRoute from "./seller/pages/Auth/SellerProtectedRoute";
import AdminProtectedRoute from "./admin/pages/Auth/AdminProtectedRoute";
import { createHomeCategories } from "./state/customer/customerHomeCategorySlice";
import { homeCategories } from "./data/homeCategory/homeCategories";

function App() {
  const dispatch = useAppDispatch();
  const { user, jwt } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("access_token");

    if (tokenFromStorage && !user) {
      dispatch(fetchUserProfile({ jwt: tokenFromStorage }));
    } else if (jwt && !user) {
      dispatch(fetchUserProfile({ jwt: jwt }));
    }
  }, [dispatch, user, jwt]);

  useEffect(() => {
    dispatch(createHomeCategories({ homeCategories: homeCategories }));
  }, []);

  if (localStorage.getItem("access_token") && !user) {
    return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Navbar />
      <div className="h-[calc(100vh-71px)] overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryCode/:name/:productId"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={
              <UserProtectedRoute>
                <Cart />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <UserProtectedRoute>
                <Wishlist />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/payment-success/:orderId"
            element={
              <UserProtectedRoute>
                <PaymentSuccess />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/account/*"
            element={
              <UserProtectedRoute>
                <Account />
              </UserProtectedRoute>
            }
          />

          <Route path="/become-seller" element={<BecomeSeller />} />

          <Route
            path="/seller/*"
            element={
              <SellerProtectedRoute>
                <SellerDashboard />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
