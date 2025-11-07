import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "access_token";

const getValidUserFromToken = (token: string | undefined): any => {
  if (!token) return null;
  try {
    const decoded = jwtDecode<any>(token);
    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      return decoded;
    }
    // Token is expired, remove it
    Cookies.remove(ACCESS_TOKEN_KEY);
    return null;
  } catch (error) {
    // Token is invalid, remove it
    Cookies.remove(ACCESS_TOKEN_KEY);
    return null;
  }
};

const token = Cookies.get(ACCESS_TOKEN_KEY);
const user = getValidUserFromToken(token);

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: user ? token : null,
  user,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUser: (state) => {
      const currentToken = Cookies.get(ACCESS_TOKEN_KEY);
      const validUser = getValidUserFromToken(currentToken);
      state.user = validUser;
      state.token = validUser ? currentToken : null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove(ACCESS_TOKEN_KEY);
    },
    setLogin: (state, action) => {
      const { token } = action.payload;
      const validUser = getValidUserFromToken(token);
      if (validUser) {
        state.user = validUser;
        state.token = token;
        Cookies.set(ACCESS_TOKEN_KEY, token);
      } else {
        state.user = null;
        state.token = null;
        Cookies.remove(ACCESS_TOKEN_KEY);
      }
    },
  },
});

export const { logout, currentUser, setLogin } = authSlice.actions;
export default authSlice.reducer;