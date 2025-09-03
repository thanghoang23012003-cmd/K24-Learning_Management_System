import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "access_token";

const token = Cookies.get(ACCESS_TOKEN_KEY);

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: token || null,
  user: token ? jwtDecode(token) : null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BE_DOMAIN}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }

      const data = await res.json();
      Cookies.set(ACCESS_TOKEN_KEY, data.access_token, { expires: 7 }); 
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUser: (state) => {
      if (state.user) return;

      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (token) {
        try {
          state.user = jwtDecode(token);
          state.token = token;
        } catch (error) {
          state.user = null;
          state.token = null;
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove(ACCESS_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
  },
});

export const { logout, currentUser } = authSlice.actions;
export default authSlice.reducer;
