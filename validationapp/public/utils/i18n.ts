import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      landing: {
        title: "Simple. Convenient. Anywhere.",
        subTitle:
          "A clean and modern task tracker to keep you up to date wherever you are, on any device",
        tryDemo: "Try demo",
        signUp: "Sign up",
        signIn: "Sign in",
        or: "or",
        visitGithub: "Visit project's GitHub page",

        designTitle: "Minimalistic design",
        designDesc:
          "A slick and intuitive design with no distractions and redundant features.\n Focus on what's important.",

        deviceTitle: "Multi-device access",
        deviceDesc:
          "Your tasks are stored securely in the cloud,\nso you stay in sync across all your devices.",

        speedTitle: "Fast & Lightweight",
        speedDesc:
          "Optimized for speed with a lightweight architecture.\nEnjoy instant loading and snappy interactions.",
      },
      dashboard: {},
    },
    de: {
      landing: {
        title: "Einfach. Bequem. Überall.",
        subTitle: "Ein moderner Task-Tracker, der dich auf dem Laufenden hält.",
        tryDemo: "Demo ausprobieren",
        signUp: "Registrieren",
        signIn: "Einloggen",
        or: "oder",
        visitGithub: "GitHub-Seite des Projekts besuchen",

        designTitle: "Minimalistic design",
        designDesc:
          "Ein schlankes und intuitives Design ohne Ablenkungen oder überflüssige Funktionen.\nKonzentriere dich auf das Wesentliche.",

        deviceTitle: "Multi-device access",
        deviceDesc:
          "Deine Aufgaben werden sicher in der Cloud gespeichert,\nsodass du auf all deinen Geräten stets synchron bleibst.",

        speedTitle: "Fast & Lightweight",
        speedDesc:
          "Für Geschwindigkeit optimiert - mit einer schlanken Architektur.\nGenieße kurze Ladezeiten und flüssige Interaktionen.",
      },
      dashboard: {},
    },
  },
  fallbackLng: "en",
  ns: ["landing", "dashboard"],
  defaultNS: "landing",
});

export default i18n;
