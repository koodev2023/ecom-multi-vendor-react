import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wishlistApi } from "../../services/apiClient";
import { Wishlist } from "../../api/generated-fetch";

export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
    try {
      const response = await wishlistApi.getUserWishlist({
        authorization: `Bearer ${jwt}`,
      });
      console.log("getUserWishlist", response);
      return response;
    } catch (error: any) {
      console.error("getUserWishlist fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (
    { productId, jwt }: { productId: number; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await wishlistApi.addProductToWishlist({
        authorization: `Bearer ${jwt}`,
        productId: productId,
      });
      console.log("addProductToWishlist", response);
      return response;
    } catch (error: any) {
      console.error("addProductToWishlist fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

type WishlistState = {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
