"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("landing");

  return (
    <body>
      <div className="z-10">
        <h1 className="text-[56px] text-primary-content text-center font-bold mt-10">
          {t("title")}
        </h1>
        <div className="w-[700px] mx-auto">
          <h2 className="text-[24px] text-secondary  font-bold text-center mt-5">
            {t("subTitle")}
          </h2>
        </div>
      </div>
    </body>
  );
}
