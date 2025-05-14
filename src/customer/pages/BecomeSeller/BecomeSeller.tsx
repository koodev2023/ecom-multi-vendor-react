import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";
import { UserRoleEnum } from "../../../api/generated-fetch";

interface ExtendedJwtPayload extends JwtPayload {
  authorities?: string;
}

const SELLER_TOKEN_KEY = "token";

const BecomeSeller = () => {
  const token = localStorage.getItem(SELLER_TOKEN_KEY) || "";

  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<ExtendedJwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn("JWT has expired. Removing token.");
          localStorage.removeItem(SELLER_TOKEN_KEY);

          return;
        }

        if (decodedToken.authorities === UserRoleEnum.RoleSeller) {
          console.log("Valid seller JWT found. Redirecting to dashboard.");

          navigate("/seller/dashboard");
          return;
        } else {
          console.log(
            "Valid non-seller JWT found from our issuer. User may proceed to register/login as seller."
          );
        }
      } catch (error) {
        console.error("Error decoding or validating JWT:", error);
        localStorage.removeItem(SELLER_TOKEN_KEY);
      }
    }
  }, [navigate]);

  return (
    <div className="grid md:gap-10 grid-cols-3 h-full">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            {!isLogin
              ? "Already have an account? Please login."
              : "Don't have an account? Register one."}
          </h1>
          <Button
            onClick={handleShowPage}
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:col-span-1 md:flex lg:col-span-2 justify-center items-center">
        <div className="lg:w-2/3 px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">Join the Marketplace</p>
            <p className="text-primary-color text-lg">Boost your sales today</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1642543348791-b1cc1b07e756?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
