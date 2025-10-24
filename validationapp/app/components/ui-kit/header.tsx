"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./themeSwitcher";

const Header = () => {
  const { i18n } = useTranslation();

  return (
    <header className="flex justify-between p-5">
      <h2 className="text-2xl font-semibold z-2 text-base-100">SCTasks</h2>

      <div className="flex items-center justify-between z-2">
        <div className="pr-3">
          <button
            onClick={() => {
              i18n.changeLanguage("en");
            }}
            className={`link link-hover ${
              i18n.resolvedLanguage === "en" ? `text-primary` : `text-base-300`
            } pr-1`}
          >
            ENG
          </button>
          <span className="text-primary-content">/</span>
          <button
            onClick={() => {
              i18n.changeLanguage("de");
            }}
            className={`link link-hover ${
              i18n.resolvedLanguage === "de" ? `text-primary` : `text-base-300`
            } text-base-300 pr-1`}
          >
            DE
          </button>
        </div>

        <ThemeSwitcher size={20}/>
      </div>
    </header>
  );
};

export default Header;
