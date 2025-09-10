import { createSlice } from "@reduxjs/toolkit";
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
    setLogin : (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const { logout, currentUser, setLogin } = authSlice.actions;
export default authSlice.reducer;
