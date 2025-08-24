import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function DetailCourse() {
  const { id } = useParams<{ id: string }>(); // lấy id từ URL
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          {t('detail', { ns: 'course', id })}
        </h1>
      </div>
    </div>
  );
}

