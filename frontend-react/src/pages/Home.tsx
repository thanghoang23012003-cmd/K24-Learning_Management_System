import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          {t("title", { ns: "dashboard" })}
        </h1>
      </div>
    </div>
  );
}
