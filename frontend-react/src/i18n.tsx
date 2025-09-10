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
    fallbackLng: false,
    backend: {
      loadPath: `${import.meta.env.VITE_APP_BASE ? import.meta.env.VITE_APP_BASE : ''}locales/{{lng}}/{{ns}}.json`
    },
    ns: ["translation", "dashboard", "homepage", "login", "profile", "adminDashboard", "layout", "course", "subject", "sign_up", "createcourse"],
  });

export default i18n;