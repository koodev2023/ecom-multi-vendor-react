import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Order,
  UpdateOrderHandlerOrderStatusEnum,
} from "../../api/generated-fetch";
import { sellerOrderApi } from "../../services/apiClient";

export const fetchSellerOrders = createAsyncThunk(
  "sellerOrders/fetchSellerOrders",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await sellerOrderApi.getAllOrdersHandler({
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchSellerOrders response", response);

      return response as Order[];
    } catch (error: any) {
      console.error("fetchSellerOrders fetch failed:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown network error occurred"
      );
    }
  }
);

export const updateSellerOrders = createAsyncThunk(
  "sellerOrders/updateSellerOrders",
  async (
    {
      orderId,
      jwt,
      orderStatus,
    }: {
      orderId: number;
      jwt: string;
      orderStatus: UpdateOrderHandlerOrderStatusEnum;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await sellerOrderApi.updateOrderHandler({
        authorization: `Bearer ${jwt}`,
        orderId: orderId,
        orderStatus: orderStatus,
      });

      console.log("updateSellerOrders response", response);

      return response as Order;
    } catch (error: any) {
      console.error("updateSellerOrders fetch failed:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown network error occurred"
      );
    }
  }
);

export const deleteSellerOrder = createAsyncThunk(
  "sellerOrders/deleteSellerOrder",
  async (
    {
      orderId,
      jwt,
    }: {
      orderId: number;
      jwt: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await sellerOrderApi.deleteOrderHandler({
        authorization: `Bearer ${jwt}`,
        orderId: orderId,
      });

      console.log("deleteSellerOrder successful for orderId:", orderId);

      return res;
    } catch (error: any) {
      console.error("deleteSellerOrder failed:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown network error occurred"
      );
    }
  }
);

interface SellerOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order.id === updatedOrder.id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
        state.error = null;
      })
      .addCase(updateSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteSellerOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSellerOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedOrderId = action.payload;
        state.orders = state.orders.filter(
          (order) => order.id !== deletedOrderId
        );
        state.error = null;
      })
      .addCase(deleteSellerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const sellerOrderReducer = sellerOrderSlice.reducer;
