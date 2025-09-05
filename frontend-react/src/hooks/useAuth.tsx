import { useSelector, useDispatch } from "react-redux";
import { currentUser, logout, setLogin } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(currentUser());
    setIsLoggedIn(!!auth.user);
  }, [auth.user]);

  return {
    ...auth, // { token, user }
    setLogin: async (token: string, user: any) => {
      await dispatch(setLogin({ token, user }));
    },
    logout: () => {
      dispatch(logout());
    },
    isLoggedIn,
  };
};
