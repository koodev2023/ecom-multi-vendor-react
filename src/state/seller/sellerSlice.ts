import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../services/apiClient";
import { Seller } from "../../api/generated-fetch";

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await sellerApi.getSellerByJwt({
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchSellerProfile", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  profile: any;
  report: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  profileError: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  status: "idle",
  profileError: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },
    clearSellerProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.profileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.status = "loading";
        state.profileError = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.profileError = action.payload;
        state.profile = null;
      });
  },
});

export const { setSelectedSeller, clearSellerProfile } = sellerSlice.actions;
export const sellerReducer = sellerSlice.reducer;
