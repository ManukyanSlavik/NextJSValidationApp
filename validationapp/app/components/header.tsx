"use client";

import { ThemeSwitcherIcon } from "@/public/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./themeSwitcher";

const Header = () => {
  const { i18n } = useTranslation();

  const lang = i18n.resolvedLanguage || i18n.language || "en";
  const isEng = lang.startsWith("en");
  const isDeu = lang.startsWith("de");

  return (
    <header className="flex justify-between p-5">
      <h2 className="text-2xl font-semibold z-2 text-base-100">SCTasks</h2>

      <div className="flex justify-between z-2">
        <div className="pr-3">
          <button
            onClick={() => {
              i18n.changeLanguage("en");
              console.log(document.documentElement.lang);
            }}
            className={`link link-hover ${
              isEng ? `text-primary` : `text-base-300`
            } pr-1`}
          >
            ENG
          </button>
          <span className="text-primary-content">/</span>
          <button
            onClick={() => {
              i18n.changeLanguage("de");
              console.log(document.documentElement.lang);
            }}
            className={`link link-hover ${
              isDeu ? `text-primary` : `text-base-300`
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
