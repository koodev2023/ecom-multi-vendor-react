import { createAsyncThunk } from "@reduxjs/toolkit";
import { sellerApi } from "../../services/apiClient";
import { Seller, UserRoleEnum } from "../../api/generated-fetch";

export const sellerLogin = createAsyncThunk(
  "sellerAuth/sellerLogin",
  async (
    {
      email,
      otp,
    }: {
      email: string;
      otp: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await sellerApi.loginSeller({
        loginDto: {
          email,
          otp,
          role: UserRoleEnum.RoleSeller,
        },
      });

      console.log("login res:", response);
      if (response.jwt) {
        localStorage.setItem("token", response.jwt);
      } else {
        console.warn("JWT token is undefined, not saving to localStorage.");
        // Optionally handle this case (e.g., redirect user, show an error message)
      }
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const sellerRegister = createAsyncThunk(
  "sellerAuth/sellerRegister",
  async ({ seller }: { seller: Seller }, { rejectWithValue }) => {
    try {
      const response = await sellerApi.createSeller({ seller });

      console.log("sellerRegister res:", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);
