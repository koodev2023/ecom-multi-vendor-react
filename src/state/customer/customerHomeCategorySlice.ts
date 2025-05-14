import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Home, HomeCategory } from "../../api/generated-fetch";
import { homeCategoryApi } from "../../services/apiClient";

export const createHomeCategories = createAsyncThunk(
  "home/createHomeCategories",
  async (
    { homeCategories }: { homeCategories: HomeCategory[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await homeCategoryApi.createHomeCategories({
        homeCategory: homeCategories,
      });
      console.log("createHomeCategories", response);

      return response;
    } catch (error: any) {
      console.error("createHomeCategories fetch failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

interface HomeState {
  homePageData: Home | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

const customerHomeCategorySlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.homePageData = action.payload;
        state.error = null;
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error =
            action.error.message || "Failed to create home categories";
        }
      });
  },
});

export const customerHomeCategoryReducer = customerHomeCategorySlice.reducer;
