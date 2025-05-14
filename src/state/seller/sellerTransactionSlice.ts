import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../api/generated-fetch";
import { transactionApi } from "../../services/apiClient";

export const fetchTransactionsBySeller = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>(
  "sellerTransactions/fetchTransactionsBySeller",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTransactionBySeller({
        authorization: `Bearer ${jwt}`,
      });
      console.log("fetchTransactionsBySeller response", response);

      return response;
    } catch (error: any) {
      console.error("fetchTransactionsBySeller failed:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown network error occurred"
      );
    }
  }
);

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

const sellerTransactionSlice = createSlice({
  name: "sellerTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactionsBySeller.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.transactions = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchTransactionsBySeller.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;

          state.error = action.payload || "Failed to fetch transactions";
          state.transactions = [];
        }
      );
  },
});

export const sellerTransactionReducer = sellerTransactionSlice.reducer;
