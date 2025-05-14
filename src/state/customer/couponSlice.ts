import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponApi } from "../../services/apiClient";
import { Cart, Coupon } from "../../api/generated-fetch";

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (
    {
      jwt,
      code,
      orderValue,
      apply,
    }: {
      jwt: string;
      code: string;
      orderValue: number;
      apply: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await couponApi.applyCoupon({
        authorization: `Bearer ${jwt}`,
        code: code,
        orderValue: orderValue,
        apply: apply,
      });

      console.log("applyCoupon", response);

      return response;
    } catch (error: any) {
      console.error("applyCoupon fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: any;
  cart: Cart | null;
  couponCreated: boolean;
  couponApplied: boolean;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
  cart: null,
  couponCreated: false,
  couponApplied: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.couponApplied = false;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload;

        if (action.meta.arg.apply === "true") {
          state.couponApplied = true;
        } else {
          state.couponApplied = false;
        }
      });
  },
});

export const couponReducer = couponSlice.reducer;
