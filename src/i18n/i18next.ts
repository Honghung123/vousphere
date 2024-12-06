import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// English
import home from "@/i18n/en/home.json";
import login from "@/i18n/en/login.json";
import register from "@/i18n/en/register.json";
const languageResources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
        },
    },
};

i18n.use(initReactI18next).init({
    lng: "en",
    debug: true,
    resources: languageResources,
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
