import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal } from "../../api/generated-fetch";
import { dealApi } from "../../services/apiClient";

export const createDeal = createAsyncThunk<
  Deal,
  { deal: Deal },
  { rejectValue: string }
>("deals/createDeal", async ({ deal }, { rejectWithValue }) => {
  try {
    const response = await dealApi.createDeals({ deal: deal });
    console.log("createDeal:", response);

    return response as Deal;
  } catch (error: any) {
    console.error("createDeal fetch failed:", error);
    return rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "An unknown network error occurred while creating the deal"
    );
  }
});

export const getAllDeals = createAsyncThunk<
  Deal[],
  void,
  { rejectValue: string }
>("deals/getAllDeals", async (_, { rejectWithValue }) => {
  try {
    const response = await dealApi.getAllDeals();
    console.log("getAllDeals:", response);

    return response as Deal[];
  } catch (error: any) {
    console.error("getAllDeals fetch failed:", error);
    return rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "An unknown network error occurred while fetching deals"
    );
  }
});

interface DealsState {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  dealCreated: boolean;
  dealUpdated: boolean;
}

const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    resetDealCreated: (state) => {
      state.dealCreated = false;
    },

    resetDealUpdated: (state) => {
      state.dealUpdated = false;
    },

    clearDealError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })
      .addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
        state.error = null;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create deal";
        state.dealCreated = false;
      })

      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDeals.fulfilled,
        (state, action: PayloadAction<Deal[]>) => {
          state.loading = false;
          state.deals = action.payload;
          state.error = null;
        }
      )
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch deals";
      });
  },
});

export const { resetDealCreated, resetDealUpdated, clearDealError } =
  dealSlice.actions;

export const adminDealReducer = dealSlice.reducer;
