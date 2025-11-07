import { useSelector, useDispatch } from "react-redux";
import { currentUser, logout, setLogin } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store";
import { useEffect } from "react";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return {
    ...auth, // { token, user }
    setLogin: async (token: string, user: any) => {
      await dispatch(setLogin({ token, user }));
    },
    logout: () => {
      dispatch(logout());
    },
    isLoggedIn: !!auth.user,
  };
};