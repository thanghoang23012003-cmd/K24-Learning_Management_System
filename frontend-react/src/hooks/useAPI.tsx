import axios from "axios";
import { useAuth } from "./useAuth";
import { useTranslation } from "react-i18next";

export const useApi = () => {
  const { token } = useAuth();
  const { i18n } = useTranslation();

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BE_DOMAIN}`,
    params: { lang: i18n.language },
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  const updateProfile = (formData: FormData) => {
    return api.patch('/users/profile', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const getProfile = () => {
    return api.get('/users/profile');
  };

  return { api, updateProfile, getProfile };
};