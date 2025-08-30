import { useTranslation } from "react-i18next";

export default function CreateSubject() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          {t('create_subject', { ns: 'subject' })}
        </h1>
      </div>
    </div>
  );
}
