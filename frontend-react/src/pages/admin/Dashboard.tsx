import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks/useAPI";
import type { Course } from "../ListCourses";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminCourseCard } from "../../components/admin/AdminCourseCard";
import { Pagination } from "../../components/common/Pagination";

export default function Dashboard() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const pageSize = 6;
  const { getAllCourses, deleteCourse } = useApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);

  const fetchCourses = async (currentPage: number) => {
    try {
      const response = await getAllCourses(currentPage, pageSize);
      setCourses(response.data.data);
      setTotalCourses(response.data.total);
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      setCourses([]);
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    // Refetch if we are navigated back with a 'refresh' state
    if (location.state?.refresh) {
      fetchCourses(page);
      // Clear the state to prevent re-fetching on other re-renders
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handleDeleteCourse = async () => {
    if (!deleteCourseId) return;
    try {
      await deleteCourse(deleteCourseId);
      setDeleteCourseId(null);
      // Go back to page 1 if the last item on a page is deleted
      if (courses.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchCourses(page);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 max-w-[1600px]">
      {/* Header: title + actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
          {t("title", { ns: "adminDashboard", defaultValue: "Courses" })}
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/course/create")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
          >
            {t("add_course", { ns: "adminDashboard", defaultValue: "Add Course" })}
          </button>
          <button
            type="button"
            aria-label={t("more", { ns: "adminDashboard", defaultValue: "More" })}
            className="px-2 py-2 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            ⋯
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-600">
          {totalCourses} {t("results", { ns: "dashboard" })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map((c) => (
          <AdminCourseCard key={c._id} course={c} onDelete={(id) => setDeleteCourseId(id)} />
        ))}
      </div>

      {/* ---------- Pagination ---------- */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Modal confirm delete */}
      {deleteCourseId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 border border-2">
            <h2 className="text-lg font-semibold mb-4">
              {t("confirm_delete_title", { ns: "adminDashboard" })}
            </h2>
            <p className="mb-6">
              {t("confirm_delete_message", { ns: "adminDashboard" })}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteCourseId(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition cursor-pointer"
              >
                {t("cancel", { ns: "adminDashboard" })}
              </button>
              <button
                type="button"
                onClick={handleDeleteCourse}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition ml-2 cursor-pointer"
              >
                {t("confirm", { ns: "adminDashboard" })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
