import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../services/apiClient";
import {
  AddCartItemRequestDto,
  Cart,
  CartItem,
} from "../../api/generated-fetch";
import { calculateCartTotals } from "../../util/calculation";
import { applyCoupon } from "./couponSlice";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await cartApi.findUserCartHandler({
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchUserCart", response);

      return response;
    } catch (error: any) {
      console.error("fetchUserCart fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (
    {
      jwt,
      request,
    }: {
      jwt: string;
      request: AddCartItemRequestDto;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.addItemToCartHandler({
        authorization: `Bearer ${jwt}`,
        addCartItemRequestDto: request,
      });

      console.log("addItemToCart", response);

      return response;
    } catch (error: any) {
      console.error("addItemToCart fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (
    {
      jwt,
      cartItemId,
    }: {
      jwt: string;
      cartItemId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.deleteCartItemHandler({
        authorization: `Bearer ${jwt}`,
        cartItemId: cartItemId,
      });

      console.log("removeItemFromCart", response);

      return response;
    } catch (error: any) {
      console.error("removeItemFromCart fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      jwt,
      cartItemId,
      quantity,
    }: { jwt: string; cartItemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.updateCartItemHandler({
        authorization: `Bearer ${jwt}`,
        cartItemId: cartItemId,
        updateCartItemRequestDto: {
          quantity: quantity,
        },
      });

      console.log("updateCartItem", response);

      return response;
    } catch (error: any) {
      console.error("updateCartItem fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: any;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart) {
          state.cart.cartItems && state.cart.cartItems.push(action.payload);

          const totals = calculateCartTotals(state.cart.cartItems!);
          state.cart.totalMrpPrice = totals.totalMrp;
          state.cart.totalSellingPrice = totals.totalSelling;
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart?.cartItems) {
          state.cart.cartItems &&
            state.cart.cartItems.filter(
              (item: CartItem) => item.id !== action.meta.arg.cartItemId
            );

          const totals = calculateCartTotals(state.cart.cartItems);
          state.cart.totalMrpPrice = totals.totalMrp;
          state.cart.totalSellingPrice = totals.totalSelling;
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart && state.cart.cartItems) {
          const index = state.cart.cartItems.findIndex(
            (item: CartItem) => item.id === action.meta.arg.cartItemId
          );

          if (index !== -1 && state.cart.cartItems) {
            state.cart.cartItems[index] = {
              ...state.cart.cartItems[index],
              ...action.payload,
            };
          }

          const totals = calculateCartTotals(state.cart.cartItems);
          console.log("totals", totals);
          console.log("state.cart.cartItems", state.cart.cartItems);

          state.cart.totalMrpPrice = totals.totalMrp;
          state.cart.totalSellingPrice = totals.totalSelling;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;
