import { useSelector, useDispatch } from "react-redux";
import { currentUser, login, logout } from "../store/authSlice";
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
    login: (username: string, password: string) => {
      dispatch(login({ username, password }));
    },
    logout: () => {
      dispatch(logout());
    },
    isLoggedIn,
  };
};
