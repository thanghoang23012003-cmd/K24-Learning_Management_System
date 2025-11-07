import axios from "axios";
import { useAuth } from "./useAuth";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const useApi = () => {
  const { token } = useAuth();
  const { i18n } = useTranslation();

  const api = useMemo(() => axios.create({

    baseURL: import.meta.env.VITE_BE_DOMAIN ?? '/api',
    params: { lang: i18n.language },
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  }), [token, i18n.language]);

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

  const getAllCourses = () => {
    return api.get('/courses/all');
  };

  const getListPublishedCourses = () => {
    return api.get('/courses/published');
  };

  const getCourseById = (id: string) => {
    return api.get(`/courses/${id}`);
  };

  const createCourse = (formData: FormData) => {
    return api.post('/courses/create', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const updateCourse = (id: string, formData: FormData) => {
    return api.patch(`/courses/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const deleteCourse = (id: string) => {
    return api.delete(`/courses/${id}`);
  };

  const getTrendingCourses = () => {
    return api.get('/courses/trending');
  };

  const getTrendingCoursesByLimit = (limit: number) => {
    return api.get('/courses/trending', { params: { limit, lang: i18n.language } });
  };

  const getTopInstructors = (limit: number) => {
    return api.get('/instructors/top', { params: { limit } });
  };

  const getCourseReviews = (courseId: string) => {
    return api.get(`/reviews/course/${courseId}`);
  };

  const getMyReviews = () => {
    return api.get(`/reviews/my-reviews`);
  };

  const createReview = (courseId: string, rating: number | undefined, content: string, parentId?: string) => {
    return api.post(`/reviews/course/${courseId}`, { rating, content, parentId });
  };

  const getPendingReviews = (page?: number, limit?: number) => {
    return api.get('/reviews/pending', { params: { page, limit } });
  };

  const getAllReviews = (status?: string, page?: number, limit?: number) => {
    return api.get('/reviews/all', { params: { status, page, limit } });
  };

  const updateReviewStatus = (id: string, status: string) => {
    return api.patch(`/reviews/${id}/status`, { status });
  };

  return useMemo(() => ({
    api,
    updateProfile,
    getProfile,
    getAllCourses,
    getListPublishedCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getTrendingCourses,
    getTrendingCoursesByLimit,
    getTopInstructors,
    getCourseReviews,
    createReview,
    getMyReviews,
    getPendingReviews,
    getAllReviews,
    updateReviewStatus,
  }), [api, i18n.language]);
};