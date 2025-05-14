import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllProductsRequest,
  GetProductByIdRequest,
  Product,
  SearchProductRequest,
} from "../../api/generated-fetch";
import { productApi } from "../../services/apiClient";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: number, { rejectWithValue }) => {
    const req: GetProductByIdRequest = {
      productId: productId,
    };

    try {
      const response: Product = await productApi.getProductById(req);
      console.log("fetchProductById", response);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query: string, { rejectWithValue }) => {
    const req: SearchProductRequest = {
      query: query,
    };

    try {
      const response = await productApi.searchProduct(req);
      console.log("searchProduct", response);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params: GetAllProductsRequest, { rejectWithValue }) => {
    const req: GetAllProductsRequest = {
      ...params,
      pageNumber: params.pageNumber || 0,
    };

    try {
      const response = await productApi.getAllProducts(req);
      console.log("fetchAllProducts", response);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface ProductState {
  products: Product[];
  product: Product | null;
  totalPages: number;
  loading: boolean;
  error: any;
  searchResults: Product[];
}

const initialState: ProductState = {
  products: [],
  product: null,
  totalPages: 1,
  loading: false,
  error: null,
  searchResults: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload || null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.content || [];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;
