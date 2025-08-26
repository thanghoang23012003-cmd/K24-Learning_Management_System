import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/* ---------- Helpers ---------- */
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="text-yellow-500 text-sm select-none">
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
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
        className="w-full flex items-center justify-between py-4"
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Design Courses</h2>
            <p className="text-slate-500 mt-1">All Development Courses</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar filter */}
            <aside className="lg:col-span-3">
              <div className="mb-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium bg-white hover:bg-slate-50 w-full justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M6 12h12M10 20h4" />
                  </svg>
                  Filter
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 px-4">
                {/* Rating */}
                <AccordionSection title="Rating" defaultOpen borderTop={false}>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((v) => (
                      <label key={v} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300" />
                        <Stars value={v} />
                      </label>
                    ))}
                  </div>
                </AccordionSection>

                {/* Number of Chapters (có See More / See Less) */}
                <AccordionSection title="Number of Chapters" defaultOpen>
                  <div className="space-y-2 text-sm text-slate-600">
                    {[...baseChapters, ...(showMoreChapters ? extraChapters : [])].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {opt}
                      </label>
                    ))}

                    <button
                      type="button"
                      onClick={() => setShowMoreChapters((v) => !v)}
                      className="mt-2 text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      {showMoreChapters ? "See Less" : "See More"}
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-3.5 h-3.5 transition-transform ${showMoreChapters ? "rotate-180" : "rotate-0"}`}
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
                <AccordionSection title="Price" defaultOpen={false}>
                  <div className="space-y-2 text-sm text-slate-600">
                    {["Free", "<$20", "$20-$50", ">$50"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </AccordionSection>

                {/* Category */}
                <AccordionSection title="Category" defaultOpen={false}>
                  <div className="space-y-2 text-sm text-slate-600">
                    {["UI/UX", "Graphic Design", "Web", "Mobile"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </AccordionSection>
              </div>
            </aside>

            {/* Grid courses */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-600">{sortedCourses.length} results</div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600">Sort By:</label>
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSortBy(e.target.value as SortBy);
                      setPage(1);
                    }}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pagedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
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
                          <span className="text-sm text-slate-500">({c.ratingCount})</span>
                        </div>
                        <div className="text-slate-900 font-semibold">${c.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Pagination (ngoài Design Courses) ---------- */}
        <div className="mt-8 flex justify-center">
          <nav
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm divide-x divide-slate-200"
            aria-label="Pagination"
          >
            <button
              className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50"
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
                  "px-4 py-2 text-slate-700 hover:bg-slate-50 " +
                  (p === page ? "bg-slate-700 text-white hover:bg-slate-700" : "")
                }
              >
                {p}
              </button>
            ))}
            <button
              className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50"
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
            Popular Mentors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {MENTORS.map((m) => (
              <div
                key={m.id}
                className="border border-slate-200 rounded-xl bg-white p-4 flex items-center gap-4 shadow-sm"
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
                      {m.rating} · {m.reviews} reviews
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
            Featured Courses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FEATURED.map((c) => (
              <div
                key={c.id}
                className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
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
                      <span className="text-sm text-slate-500">({c.ratingCount})</span>
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
      <div>
        <footer className="w-full bg-slate-800 text-slate-200">
          <div className="mx-auto px-20 py-12 max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand + Description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/public/logos/logo.png"
                    alt="Byway Logo"
                    className="h-8 w-8"
                  />
                  <span className="text-xl font-semibold">Byway</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm max-w-md">
                  {t("footer.tagline", {
                    ns: "layout",
                    defaultValue:
                      "Empowering learners through accessible and engaging online education.",
                  })}
                </p>
                <p className="text-slate-300 leading-relaxed text-sm max-w-md mt-3">
                  {t("footer.desc", {
                    ns: "layout",
                    defaultValue:
                      "Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.",
                  })}
                </p>
              </div>

              {/* Get Help */}
              <div>
                <h4 className="text-white font-semibold mb-4">
                  {t("footer.get_help", { ns: "layout", defaultValue: "Get Help" })}
                </h4>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-white">
                      {t("footer.contact_us", {
                        ns: "layout",
                        defaultValue: "Contact Us",
                      })}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      {t("footer.latest_articles", {
                        ns: "layout",
                        defaultValue: "Latest Articles",
                      })}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      {t("footer.faq", { ns: "layout", defaultValue: "FAQ" })}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-white font-semibold mb-4">
                  {t("footer.programs", { ns: "layout", defaultValue: "Programs" })}
                </h4>
                <ul className="space-y-3 text-slate-300 text-sm">
                  {["Art & Design", "Business", "IT & Software", "Languages", "Programming"].map(
                    (label) => (
                      <li key={label}>
                        <a href="#" className="hover:text-white">
                          {label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-4">
                  {t("footer.contact_us", { ns: "layout", defaultValue: "Contact Us" })}
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>Address: 123 Main Street, Anytown, CA 12345</li>
                  <li>Tel: +(123) 456-7890</li>
                  <li>Mail: bywayedu@webkul.in</li>
                </ul>

                {/* Socials */}
                <div className="mt-4 flex items-center gap-3">
                  {[
                    "/public/image/icons/iconfb.png",
                    "/public/image/icons/icongithub.png",
                    "/public/image/icons/icongg.png",
                    "/public/image/icons/icontwitter.png",
                    "/public/image/icons/iconmicrosoft.png",
                  ].map((src, i) => (
                    <a key={i} href="#" className="inline-block">
                      <img
                        src={src}
                        alt="social"
                        className="w-8 h-8 rounded-full bg-white p-1"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
