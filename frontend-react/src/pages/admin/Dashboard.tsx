import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks/useAPI";
import type { Course } from "../ListCourses";

/* ---- small UI helpers ---- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-md bg-slate-100 text-slate-700 border border-slate-200">
      {children}
    </span>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { getAllCourses } = useApi();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data);
    } catch (error) {
      setCourses([]);
      console.error("Error fetching courses:", error);
    }
  };
  
  const totalPages = Math.ceil(courses.length / pageSize);
  const pagedCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return courses.slice(start, start + pageSize);
  }, [courses, page]);

  return (
    // CHỪA CHỖ CHO SIDEBAR: ml-60 = 15rem (khớp w-60 của Sidebar)
    <div className="ml-60 px-4 md:px-6 lg:px-8 py-6 max-w-[1600px]">
      {/* Header: title + actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
          {t("title", { ns: "adminDashboard", defaultValue: "Courses" })}
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
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
          {courses.length} {t("results", { ns: "dashboard" })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pagedCourses.map((c) => (
          <article
            key={c._id}
            className="border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                {true && (
                  <Badge>
                    {t("free", { ns: "adminDashboard", defaultValue: "Free" })}
                  </Badge>
                )}
              </div>

              <h3 className="mt-3 font-semibold text-slate-900">
                {c.title}
              </h3>

              <div className="mt-4 h-px bg-slate-200" />

              {/* row 1 */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Metric
                  value={`$${c.price.toFixed(2)}`}
                  label={t("metric.price", { ns: "adminDashboard", defaultValue: "Price" })}
                />
                <Metric
                  value={c.totalChapter}
                  label={t("metric.chapters", { ns: "adminDashboard", defaultValue: "Chapters" })}
                />
                <Metric
                  value={c.totalOrder}
                  label={t("metric.orders", { ns: "adminDashboard", defaultValue: "Orders" })}
                />
              </div>

              {/* row 2 */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Metric
                  value={c.totalCertificate}
                  label={t("metric.certificates", { ns: "adminDashboard", defaultValue: "Certificates" })}
                />
                <Metric
                  value={c.totalRating}
                  label={t("metric.reviews", { ns: "adminDashboard", defaultValue: "Reviews" })}
                />
                <Metric
                  value={c.totalFavorite}
                  label={t("metric.added_to_shelf", { ns: "adminDashboard", defaultValue: "Added to Shelf" })}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ---------- Pagination ---------- */}
      <div className="mt-8 flex justify-center">
        <nav
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm divide-x divide-slate-200"
          aria-label="Pagination"
        >
          <button
            className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50 cursor-pointer"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                "px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer " +
                (p === page ? "bg-slate-700 text-white hover:bg-slate-700" : "")
              }
            >
              {p}
            </button>
          ))}
          <button
            className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50 cursor-pointer"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            ›
          </button>
        </nav>
      </div>
    </div>
  );
}
