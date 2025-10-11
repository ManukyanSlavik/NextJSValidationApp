import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    resources: {
        en: {
            landing: {
                title: "Simple. Convenient. Anywhere.",
                subTitle: "A clean and modern task tracker to keep you up to date wherever you are, on any device",
                tryDemo: "Try demo",
                signUp: "Sign up",
                or: "or",
                visitGithub: "Visit project's GitHub page"
            },
            dashboard: {

            }
        },
        de: {
            landing: {
                title: "Einfach. Bequem. Überall.",
                subTitle: "Ein moderner Task-Tracker, der dich auf dem Laufenden hält.",
                tryDemo: "Demo ausprobieren",
                signUp: "Registrieren",
                or: "oder",
                visitGithub: "Besuchen Sie die GitHub-Seite des Projekts"
            },
            dashboard: {

            }
        }
    },
    fallbackLng: "en",
    detection: {
        order: ["cookie", "localStorage"],
        caches: ["cookie", "localStorage"],
        cookieMinutes: 365 * 24 * 60,
        lookupCookie: "lang",
        lookupLocalStorage: "lang"
    },
    ns: ["landing", "dashboard"],
    defaultNS: "landing"
})

export default i18n;