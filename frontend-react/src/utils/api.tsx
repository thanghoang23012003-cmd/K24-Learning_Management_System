import axios from 'axios';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { RootState } from '../store';

let store: EnhancedStore<RootState>;

export const injectStore = (_store: EnhancedStore<RootState>) => {
  store = _store;
};

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    if (store) {
        const token = store.getState().auth.token; // Assuming you have an auth slice with a token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
  return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
