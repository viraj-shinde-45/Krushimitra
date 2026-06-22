import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations/en";
import { hi } from "./translations/hi";
import { mr } from "./translations/mr";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
};

let initialLang = "en";
if (typeof window !== "undefined") {
  try {
    initialLang = localStorage.getItem("km_lang") || "en";
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
