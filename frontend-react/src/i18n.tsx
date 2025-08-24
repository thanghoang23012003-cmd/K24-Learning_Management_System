import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en", // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    ns: ["translation", "dashboard", "login", "adminDashboard", "layout", "course"],
  });

export default i18n;