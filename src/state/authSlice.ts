import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "../services/apiClient";
import { RegisterRequest, User, UserRoleEnum } from "../api/generated-fetch";
import { addUserAddress } from "./customer/addressSlice";

export const sendLoginOtp = createAsyncThunk(
  "auth/sendLoginOtp",
  async (
    { email, role }: { email: string; role: UserRoleEnum },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.sendLoginOtpHandler({
        sendAuthOtpRequest: {
          email,
          role: role,
        },
      });

      console.log("login otp res:", response);
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const sendRegisterOtp = createAsyncThunk(
  "auth/sendRegisterOtp",
  async (
    { email, role }: { email: string; role: UserRoleEnum },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.sendRegisterOtpHandler({
        sendAuthOtpRequest: {
          email,
          role: role,
        },
      });

      console.log("login otp res:", response);
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      otp,
    }: {
      email: string;
      otp: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.loginHandler({
        loginDto: {
          email,
          otp,
          role: UserRoleEnum.RoleCustomer,
        },
      });

      console.log("customerLogin res:", response);
      if (response.jwt) {
        localStorage.setItem("access_token", response.jwt);
        return response.jwt;
      } else {
        console.warn("JWT token is undefined, not saving to localStorage.");
      }
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { registerRequest }: { registerRequest: RegisterRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.createUserHandler({
        registerRequest,
      });

      console.log("customerLogin res:", response);
      if (response.jwt) {
        localStorage.setItem("access_token", response.jwt);
        return response.jwt;
      } else {
        console.warn("JWT token is undefined, not saving to localStorage.");
      }
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
    if (!jwt) {
      return rejectWithValue("No JWT provided");
    }

    try {
      const response = await userApi.getUserProfileHandler({
        authorization: `Bearer ${jwt}`,
      });

      console.log("fetchUserProfile res:", response);

      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    console.log("All auth logged out successfully");
  } catch (error) {
    console.log("customerLogout error", error);
  }
});

interface AuthState {
  jwt: string | undefined;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  isSendingOTP: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  jwt: undefined,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  isSendingOTP: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.jwt = undefined;
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(sendLoginOtp.pending, (state) => {
        state.isSendingOTP = true;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.isSendingOTP = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state) => {
        state.isSendingOTP = false;
        state.otpSent = false;
      })

      .addCase(sendRegisterOtp.pending, (state) => {
        state.isSendingOTP = true;
      })
      .addCase(sendRegisterOtp.fulfilled, (state) => {
        state.isSendingOTP = false;
        state.otpSent = true;
      })
      .addCase(sendRegisterOtp.rejected, (state) => {
        state.isSendingOTP = false;
        state.otpSent = false;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.jwt = action.payload as string;
        state.user = null;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.jwt = undefined;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.jwt = action.payload as string;
        state.user = null;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
        state.jwt = undefined;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.jwt = undefined;
        state.user = null;
        state.otpSent = false;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.jwt = undefined;
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        state.loading = false;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.isLoggedIn = true;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
