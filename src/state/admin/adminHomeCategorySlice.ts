import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory } from "../../api/generated-fetch";
import { homeCategoryApi } from "../../services/apiClient";

export const updateHomeCategory = createAsyncThunk(
  "homeCategory/updateHomeCategory",
  async (
    { id, homeCategory }: { id: number; homeCategory: HomeCategory },
    { rejectWithValue }
  ) => {
    try {
      const response = await homeCategoryApi.updateHomeCategory({
        id: id,
        homeCategory: homeCategory,
      });

      console.log("updateHomeCategory res:", response);
      return response;
    } catch (error: any) {
      console.error("updateHomeCategory failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

export const fetchHomeCategories = createAsyncThunk(
  "homeCategory/fetchHomeCategories",
  async (_args, { rejectWithValue }) => {
    try {
      const response = await homeCategoryApi.getAllHomeCategories();

      console.log("fetchHomeCategories res:", response);
      return response;
    } catch (error: any) {
      console.error("fetchHomeCategories failed:", error);
      return rejectWithValue(
        error?.message || "An unknown network error occurred"
      );
    }
  }
);

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload;

        const index = state.categories.findIndex(
          (category) => category.id === updatedCategory.id
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        } else {
        }
        state.categoryUpdated = true;
        state.error = null;
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
        state.categoryUpdated = false;
      });
  },
});

export const adminHomeCategoryReducer = homeCategorySlice.reducer;
