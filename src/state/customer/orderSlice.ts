import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Address,
  CreateOrderHandlerPaymentMethodEnum,
  Order,
  OrderItem,
  PaymentDetails,
  PaymentLinkResponseDto,
} from "../../api/generated-fetch";
import { orderApi, paymentApi } from "../../services/apiClient";

interface OrderState {
  orders: Order[];
  orderItem: OrderItem | null;
  currentOrder: Order | null;
  paymentOrder: PaymentLinkResponseDto | null;
  loading: boolean;
  error: string | null;
  orderCancelled: boolean;
}

export const fetchUserOrderHistory = createAsyncThunk(
  "order/fetchUserOrderHistory",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.usersOrderHistoryHandler({
        authorization: `Bearer ${jwt}`,
      });

      return response;
    } catch (error: any) {
      console.error("fetchUserOrderHistory fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (
    { orderId, jwt }: { orderId: number; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.getOrderById({
        orderId,
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchOrderById response:", response);
      return response;
    } catch (error: any) {
      console.error("fetchOrderById fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    {
      address,
      jwt,
      paymentGateway,
    }: {
      address: Address;
      jwt: string;
      paymentGateway: CreateOrderHandlerPaymentMethodEnum;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.createOrderHandler({
        address: address,
        paymentMethod: paymentGateway,
        authorization: `Bearer ${jwt}`,
      });

      console.log("createOrder response:", response);

      if (response.paymentLinkUrl) {
        window.location.href = response.paymentLinkUrl;
      }

      return response;
    } catch (error: any) {
      console.error("createOrder fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const fetchOrderItemById = createAsyncThunk(
  "order/fetchOrderItemById",
  async (
    { orderItemId, jwt }: { orderItemId: number; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.getOrderItemById({
        orderItemId,
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchOrderItemById response:", response);
      return response;
    } catch (error: any) {
      console.error("fetchOrderItemById fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const paymentSuccess = createAsyncThunk(
  "order/paymentSuccess",
  async (
    {
      paymentId,
      jwt,
      paymentLinkId,
    }: { paymentId: string; jwt: string; paymentLinkId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await paymentApi.paymentSuccessHandler({
        paymentId,
        paymentLinkId,
        authorization: `Bearer ${jwt}`,
      });
      console.log("paymentSuccess response:", response);
      return response;
    } catch (error: any) {
      console.error("paymentSuccess fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (
    { orderId, jwt }: { orderId: number; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.cancelOrder({
        orderId,
        authorization: `Bearer ${jwt}`,
      });

      return response;
    } catch (error: any) {
      console.error("cancelOrder fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCancelled: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCancelled = false;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        // state.orderCancelled = action.payload;
        console.log("Payment success response:", action.payload);
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCancelled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.meta.arg.orderId
        );
        state.orderCancelled = true;
        state.currentOrder = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const orderReducer = orderSlice.reducer;
