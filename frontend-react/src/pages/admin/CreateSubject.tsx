import { useState } from "react";
import { useTranslation } from "react-i18next";

/* ================= Helpers ================= */
function TabsLine({
  active,
  onChange,
  labels,
}: {
  active: string;
  onChange: (s: string) => void;
  labels: string[];
}) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200">
      {labels.map((lb) => (
        <button
          key={lb}
          type="button"
          onClick={() => onChange(lb)}
          className={
            "py-3 text-sm font-medium cursor-pointer transition-colors " +
            (active === lb
              ? "text-slate-900 border-b-2 border-blue-600"
              : "text-slate-600 hover:text-slate-900")
          }
        >
          {lb}
        </button>
      ))}
    </div>
  );
}
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium text-slate-700 block mb-1">
    {children}
  </label>
);
const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...p}
    className={
      "w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 " +
      (p.className || "")
    }
  />
);
const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...p}
    className={
      "w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 " +
      (p.className || "")
    }
  />
);

const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...p}
    className={
      "w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 " +
      (p.className || "")
    }
  />
);

function Dropzone({ hint }: { hint?: string }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm text-slate-600">
      <div className="text-center">
        <div className="mb-2">
          <span className="inline-block mr-2 align-middle">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <b>Drag & drop files</b>, <span className="text-blue-600">or Browse</span>
        </div>
        {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
      </div>
    </div>
  );
}

/* ================= Page ================= */
export default function CreateSubject() {
  const { t } = useTranslation();

  const tabs = [
    t("tab_details", { ns: "subject", defaultValue: "Details" }),
    t("tab_resources", { ns: "subject", defaultValue: "Resources" }),
    t("tab_seo", { ns: "subject", defaultValue: "SEO" }),
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const [title, setTitle] = useState(
    t("sample_chapter_title", { ns: "subject", defaultValue: "Chapter 1 - The Solid State" })
  );
  const [subtitle, setSubtitle] = useState(
    t("sample_chapter_subtitle", {
      ns: "subject",
      defaultValue: "Learn about the solid states with ease and get sample papers and notes too!",
    })
  );
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  );

  return (
    <div className="ml-60 min-h-screen bg-slate-50">
      {/* Header gốc của bạn */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t("create_subject", { ns: "subject" })}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
        {/* Back + title + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t("back", { ns: "subject", defaultValue: "Back" })}
              className="p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="text-base md:text-lg font-semibold text-slate-700">
              {t("breadcrumb.chapter", { ns: "subject", defaultValue: "Chapter 1 - The Solid State" })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 h-10 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 cursor-pointer">
              {t("actions.delete", { ns: "subject", defaultValue: "Delete" })}
            </button>
            <button className="px-4 h-10 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-50 cursor-pointer">
              {t("actions.move_to_draft", { ns: "subject", defaultValue: "Move to Draft" })}
            </button>
            <button className="px-4 h-10 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 cursor-pointer">
              {t("actions.add_course", { ns: "subject", defaultValue: "Add Course" })}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <TabsLine active={activeTab} onChange={setActiveTab} labels={tabs} />
        </div>

        {/* Card */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              {t("chapter_details", { ns: "subject", defaultValue: "Chapter details" })}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t("chapter_details_hint", {
                ns: "subject",
                defaultValue:
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
              })}
            </p>
          </div>

          {/* ===== Details tab (giữ nguyên) ===== */}
          {activeTab === tabs[0] && (
            <div className="space-y-4">
              <div>
                <Label>{t("field.title", { ns: "subject", defaultValue: "Title" })}</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <Label>{t("field.subtitle", { ns: "subject", defaultValue: "Subtitle" })}</Label>
                <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              </div>
              <div>
                <Label>{t("field.description", { ns: "subject", defaultValue: "Description" })}</Label>
                <Textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          )}

          {/* ===== Resources tab (thiết kế lại như ảnh chuẩn) ===== */}
          {activeTab === tabs[1] && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {t("resources.upload_notes.title", { ns: "subject", defaultValue: "Upload Notes" })}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("resources.upload_notes.lead", {
                    ns: "subject",
                    defaultValue:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  })}
                </p>
              </div>

              {/* Content Type */}
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {t("resources.fields.content_type", { ns: "subject", defaultValue: "Content Type" })}
                </div>
                {/* Bạn có thể đổi thành <Select> nếu cần danh sách cố định */}
                <Input defaultValue={t("resources.defaults.content_type", { ns: "subject", defaultValue: "Notes" })} />
              </div>

              {/* Title */}
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {t("resources.fields.title", { ns: "subject", defaultValue: "Title" })}
                </div>
                <Input defaultValue={t("resources.defaults.title", { ns: "subject", defaultValue: "Notes" })} />
              </div>

              {/* Description */}
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {t("resources.fields.description", { ns: "subject", defaultValue: "Description" })}
                </div>
                <Textarea
                  rows={5}
                  defaultValue={t("resources.defaults.description", {
                    ns: "subject",
                    defaultValue:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  })}
                />
              </div>

              {/* Upload File */}
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">
                  {t("resources.fields.upload_file", { ns: "subject", defaultValue: "Upload File" })}
                </div>
                <Dropzone
                  hint={t("resources.hints.file", {
                    ns: "subject",
                    defaultValue: "Upload files in Text, Word, PDF.",
                  })}
                />
              </div>

              {/* Upload Thumbnail */}
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">
                  {t("resources.fields.upload_thumbnail", { ns: "subject", defaultValue: "Upload Thumbnail" })}
                </div>
                <Dropzone
                  hint={t("resources.hints.thumb", {
                    ns: "subject",
                    defaultValue: "Upload Thumbnail in JPEG, PNG.",
                  })}
                />
              </div>
            </div>
          )}

          {/* ===== SEO tab (đã sửa như mock) ===== */}
          {activeTab === tabs[2] && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {t("seo.title", { ns: "subject", defaultValue: "SEO" })}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("seo.lead", {
                    ns: "subject",
                    defaultValue:
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    {t("seo.ppt_title", { ns: "subject", defaultValue: "PPT Title" })}
                  </div>
                  <Input defaultValue={t("seo.sample_title", { ns: "subject", defaultValue: "Notes" })} />
                </div>

                <div className="md:col-span-2">
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    {t("seo.description", { ns: "subject", defaultValue: "Description" })}
                  </div>
                  <Textarea
                    rows={5}
                    defaultValue={t("seo.sample_desc", {
                      ns: "subject",
                      defaultValue:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
