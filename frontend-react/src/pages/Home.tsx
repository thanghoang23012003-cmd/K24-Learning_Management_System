import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/layout/Footer";

/* ---------- Helpers ---------- */
/** Sao nguyên (không 1/2), luôn làm tròn lên */
function Stars({ value }: { value: number }) {
  const stars = Math.round(value); // 4.5 -> 5
  return (
    <span className="text-yellow-500 text-sm select-none">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
    </span>
  );
}

const sortOptions = ["popular", "rating", "price_low", "price_high"] as const;
type SortBy = (typeof sortOptions)[number];

/* Chevron icon */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Accordion section wrapper */
function AccordionSection({
  title,
  children,
  defaultOpen = true,
  borderTop = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  borderTop?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`${borderTop ? "border-t border-slate-200" : ""}`}>
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-slate-900">{title}</span>
        <Chevron open={open} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  /* ===== MOCK DATA ===== */
  const COURSES = Array.from({ length: 30 }).map((_, i) => ({
    id: `c-${i + 1}`,
    title: "Beginner’s Guide to Design",
    image: "public/image/ngoimaytinh.jpg",
    author: "John Doe",
    rating: 4.6 - (i % 3) * 0.2,
    ratingCount: 120 + i * 7,
    price: 14.99 + (i % 4) * 5,
  }));

  const MENTORS = Array.from({ length: 6 }).map((_, i) => ({
    id: `m-${i + 1}`,
    name: "John Doe",
    role: "UX Mentor",
    avatar: "public/image/giaovien.png",
    rating: 4.9,
    reviews: 300 + i * 10,
  }));

  const FEATURED = Array.from({ length: 6 }).map((_, i) => ({
    id: `f-${i + 1}`,
    title: "Beginner’s Guide to Design",
    image: "public/image/ngoimaytinh.jpg",
    author: "John Doe",
    rating: 4.7,
    ratingCount: 310 + i * 5,
    price: 24.99,
  }));

  /* ===== SORT + PAGINATION ===== */
  const [sortBy, setSortBy] = useState<SortBy>("popular");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const sortedCourses = useMemo(() => {
    const arr = [...COURSES];
    if (sortBy === "price_low") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") arr.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [sortBy]);

  const totalPages = Math.ceil(sortedCourses.length / pageSize);
  const pagedCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCourses.slice(start, start + pageSize);
  }, [sortedCourses, page]);

  /* ===== UI state cho "See More" ===== */
  const [showMoreChapters, setShowMoreChapters] = useState(false);
  const baseChapters = ["1-10", "10-15", "15-20", "20-25"];
  const extraChapters = ["25-30", "30-35", "35-40", "40-45", "45-50"];

  return (
    <>
      {/* ===== Header ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t("title", { ns: "dashboard" })}
          </h1>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-12">
        {/* ---------- Design Courses ---------- */}
        <section className="bg-transparent p-0">
          <header className="mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {t("design_courses", { ns: "dashboard" })}
            </h2>
            <p className="text-slate-500 mt-1">
              {t("all_development_courses", { ns: "dashboard" })}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar filter */}
            <aside className="lg:col-span-3">
              <div className="mb-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium bg-white hover:bg-slate-50 w-full justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4h18M6 12h12M10 20h4"
                    />
                  </svg>
                  {t("filter", { ns: "dashboard" })}
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 px-4">
                {/* Rating */}
                <AccordionSection
                  title={t("rating", { ns: "dashboard" })}
                  defaultOpen
                  borderTop={false}
                >
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((v) => (
                      <label
                        key={v}
                        className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"
                      >
                        <input type="checkbox" className="rounded border-slate-300" />
                        <Stars value={v} />
                      </label>
                    ))}
                  </div>
                </AccordionSection>

                {/* Number of Chapters */}
                <AccordionSection
                  title={t("number_of_chapters", { ns: "dashboard" })}
                  defaultOpen
                >
                  <div className="space-y-2 text-sm text-slate-600">
                    {[...baseChapters, ...(showMoreChapters ? extraChapters : [])].map(
                      (opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300" />
                          {opt}
                        </label>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => setShowMoreChapters((v) => !v)}
                      className="mt-2 text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {showMoreChapters
                        ? t("see_less", { ns: "dashboard" })
                        : t("see_more", { ns: "dashboard" })}
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-3.5 h-3.5 transition-transform ${
                          showMoreChapters ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </AccordionSection>

                {/* Price */}
                <AccordionSection title={t("price", { ns: "dashboard" })} defaultOpen={false}>
                  <div className="space-y-2 text-sm text-slate-600">
                    {[t("price_free", { ns: "dashboard" }), "<$20", "$20-$50", ">$50"].map(
                      (opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300" />
                          {opt}
                        </label>
                      )
                    )}
                  </div>
                </AccordionSection>

                {/* Category */}
                <AccordionSection
                  title={t("category", { ns: "dashboard" })}
                  defaultOpen={false}
                >
                  <div className="space-y-2 text-sm text-slate-600">
                    {[t("cat_ui_ux", { ns: "dashboard" }), t("cat_graphic", { ns: "dashboard" }), t("cat_web", { ns: "dashboard" }), t("cat_mobile", { ns: "dashboard" })].map(
                      (opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300" />
                          {opt}
                        </label>
                      )
                    )}
                  </div>
                </AccordionSection>
              </div>
            </aside>

            {/* Grid courses */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-600">
                  {sortedCourses.length} {t("results", { ns: "dashboard" })}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600">
                    {t("sort_by", { ns: "dashboard" })}
                  </label>
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white cursor-pointer"
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSortBy(e.target.value as SortBy);
                      setPage(1);
                    }}
                  >
                    <option value="popular">{t("sort_popular", { ns: "dashboard" })}</option>
                    <option value="rating">{t("sort_rating", { ns: "dashboard" })}</option>
                    <option value="price_low">{t("sort_price_low", { ns: "dashboard" })}</option>
                    <option value="price_high">{t("sort_price_high", { ns: "dashboard" })}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pagedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-slate-900 font-semibold leading-snug line-clamp-2">
                        {c.title}
                      </h3>
                      <p className="text-sm text-slate-500">{c.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Stars value={c.rating} />
                          <span className="text-sm text-slate-500">
                            ({c.ratingCount})
                          </span>
                        </div>
                        <div className="text-slate-900 font-semibold">
                          ${c.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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

        {/* ---------- Popular Mentors ---------- */}
        <section className="bg-transparent p-0">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
            {t("popular_mentors", { ns: "dashboard" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {MENTORS.map((m) => (
              <div
                key={m.id}
                className="border border-slate-200 rounded-xl bg-white p-4 flex items-center gap-4 shadow-sm cursor-pointer"
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{m.name}</div>
                  <div className="text-sm text-slate-500">{m.role}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars value={m.rating} />
                    <span className="text-xs text-slate-500">
                      {m.rating} · {m.reviews} {t("reviews", { ns: "dashboard" })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Featured Courses ---------- */}
        <section className="bg-transparent p-0">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
            {t("featured_courses", { ns: "dashboard" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FEATURED.map((c) => (
              <div
                key={c.id}
                className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-slate-900 font-semibold leading-snug line-clamp-2">
                    {c.title}
                  </h4>
                  <p className="text-sm text-slate-500">{c.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars value={c.rating} />
                      <span className="text-sm text-slate-500">
                        ({c.ratingCount})
                      </span>
                    </div>
                    <div className="text-slate-900 font-semibold">
                      ${c.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== Footer của bạn (giữ nguyên) ===== */}
      <Footer />
    </>
  );
}
