import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerProductApi } from "../../services/apiClient";
import { CreateProductRequest, Product } from "../../api/generated-fetch";

export const fetchSellerProducts = createAsyncThunk(
  "sellerProducts/fetchSellerProducts",
  async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
    try {
      const response: Product[] = await sellerProductApi.getProductBySellerId({
        authorization: `Bearer ${jwt}`,
      });
      console.log("fetchSellerProducts", response);
      return response;
    } catch (error: any) {
      console.error("fetchSellerProducts fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "sellerProducts/createProduct",
  async (
    { createProductRequest }: { createProductRequest: CreateProductRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await sellerProductApi.createProduct({
        authorization: `Bearer ${createProductRequest.authorization}`,
        createProductRequestDto: createProductRequest.createProductRequestDto,
      });
      console.log("createProduct fetch success response", response);
      return response;
    } catch (error: any) {
      console.error("createProduct fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchSellerProducts.pending, (state) => {
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const sellerProductReducer = sellerProductSlice.reducer;
