import { createAsyncThunk } from "@reduxjs/toolkit";
import { addressApi } from "../../services/apiClient";
import { Address } from "../../api/generated-fetch";

export const addUserAddress = createAsyncThunk(
  "address/addUserAddress",
  async (
    {
      address,
      jwt,
    }: {
      address: Address;
      jwt: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await addressApi.addAddress({
        address,
        authorization: `Bearer ${jwt}`,
      });

      console.log("addUserAddress", response);
      return response;
    } catch (error: any) {
      console.error("addUserAddress fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);
