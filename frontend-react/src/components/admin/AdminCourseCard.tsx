import { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import type { Course } from "../../pages/ListCourses";
import { useNavigate } from "react-router-dom";

function Metric({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-slate-900">{value}</span>
            <span className="text-xs text-slate-500">{label}</span>
        </div>
    );
}

type AdminCourseCardProps = {
    course: Course;
    onDelete?: (id: string) => void;
};

export function AdminCourseCard({ course, onDelete }: AdminCourseCardProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation("adminDashboard");
    const navigate = useNavigate();

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handler = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <article
            key={course._id}
            className="relative border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="p-4">
                <div className="flex items-center justify-between">
                {course.status && (
                    <span
                        className={
                            "inline-flex items-center rounded-full px-2 h-6 text-xs font-medium " +
                            (course.status === "public"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700")
                        }
                    >
                    {t(`status.${course.status}`, { ns: "adminDashboard" })}
                    </span>
                )}

                {/* Ba chấm */}
                <div ref={menuRef} className="relative">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>

                    {open && (
                    <div className="absolute right-0 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1">
                        <button
                            onClick={() => navigate(`/admin/course/${course._id}/edit`)}
                            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                        >
                            ✏️ {t("actions.edit", { ns: "adminDashboard" })}
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(course._id)}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100"
                        >
                            🗑 {t("actions.delete", { ns: "adminDashboard" })}
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                </div>

                <h3 className="mt-3 font-semibold text-slate-900">{course.title}</h3>

                <div className="mt-4 h-px bg-slate-200" />

                {/* row 1 */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                <Metric
                    value={`$${course.price.toFixed(2)}`}
                    label={t("metric.price", {
                        ns: "adminDashboard",
                        defaultValue: "Price",
                    })}
                />
                <Metric
                    value={course.totalChapter}
                    label={t("metric.chapters", {
                        ns: "adminDashboard", 
                        defaultValue: "Chapters",
                    })}
                />
                <Metric
                    value={course.totalOrder}
                    label={t("metric.orders", {
                        ns: "adminDashboard",
                        defaultValue: "Orders",
                    })}
                />
                </div>

                {/* row 2 */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                <Metric
                    value={course.totalCertificate}
                    label={t("metric.certificates", {
                        ns: "adminDashboard",
                        defaultValue: "Certificates",
                    })}
                />
                <Metric
                    value={course.totalRating}
                    label={t("metric.reviews", {
                        ns: "adminDashboard",
                        defaultValue: "Reviews",
                    })}
                />
                <Metric
                    value={course.totalFavorite}
                    label={t("metric.added_to_shelf", {
                        ns: "adminDashboard",
                        defaultValue: "Added to Shelf",
                    })}
                />
                </div>
            </div>
        </article>
    );
}
