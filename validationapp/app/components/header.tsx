"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./ui-kit/themeSwitcher"

type Lang = "en" | "de";

const Header = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const setAndSaveLang = (lang: string) => {
    setLang(lang as Lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <header className="flex justify-between p-5">
      <h2 className="text-2xl font-semibold z-2 text-base-100">SCTasks</h2>

      <div className="flex items-center justify-between z-2">
        <div className="pr-3">
          <button
            onClick={() => {
              setAndSaveLang("en")
            }}
            className={`link link-hover ${
              lang === "en" ? `text-primary` : `text-base-300`
            } pr-1`}
          >
            ENG
          </button>
          <span className="text-primary-content">/</span>
          <button
            onClick={() => {
              setAndSaveLang("de")
            }}
            className={`link link-hover ${
              lang === "de" ? `text-primary` : `text-base-300`
            } text-base-300 pr-1`}
          >
            DE
          </button>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
