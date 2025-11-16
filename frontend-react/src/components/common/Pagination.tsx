import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t } = useTranslation();

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  // A more advanced pagination would show a limited number of page buttons,
  // but for now, we'll keep it simple as it was in the original code.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <nav
        className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm divide-x divide-slate-200"
        aria-label="Pagination"
      >
        <button
          className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50 cursor-pointer rounded-l-xl"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <span className="sr-only">{t("pagination.previous", { defaultValue: "Previous" })}</span>
          &lsaquo;
        </button>
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={
              "px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer " +
              (p === currentPage ? "bg-slate-700 text-white hover:bg-slate-700" : "")
            }
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button
          className="px-4 py-2 text-slate-600 disabled:text-slate-300 hover:bg-slate-50 cursor-pointer rounded-r-xl"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">{t("pagination.next", { defaultValue: "Next" })}</span>
          &rsaquo;
        </button>
      </nav>
    </div>
  );
}
