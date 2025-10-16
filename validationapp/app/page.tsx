"use client";

import { ExternalLink } from "@/public/icons";
import { useTranslation } from "react-i18next";
import Header from "./components/header";
import { motion, stagger } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const { t } = useTranslation("landing");

  return (
    <>
      <section className="relative isolate bg-neutral-950">
        <div className="pointer-events-none absolute left-0 top-0 z-1 h-[28vmin] w-[28vmin] bg-base-300 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>

        <div className="pointer-events-none absolute right-0 top-[360px] z-1 h-[28vmin] w-[28vmin] bg-base-300 [clip-path:polygon(100%_100%,0_100%,100%_0)]"></div>
      </section>
      <Header />
      <motion.div variants={container} initial="hidden" animate="show" className="z-10">
        <div>
          <motion.h1 variants={item} className="text-[56px] text-primary-content text-center font-bold mt-10">
            {t("title")}
          </motion.h1>
          <motion.h2 variants={item} className="text-[24px] text-secondary font-bold text-center mt-5">
            {t("subTitle")}
          </motion.h2>
        </div>

        <div className="pt-20">
          <div className="w-fit mx-auto">
            <motion.div variants={item} className="flex items-center gap-4">
              <button className="btn btn-primary text-primary-content font-bold">
                {t("tryDemo")}
              </button>

              <span className="text-primary-content text-lg font-bold select-none">
                {t("or")}
              </span>

              <a href="/signin" className="btn btn-neutral text-primary-content font-bold">
                {t("signUp")}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div variants={item} className="pt-10 w-fit mx-auto">
          <a
            href="https://github.com/ManukyanSlavik/NextJSValidationApp"
            target="_blank"
            className="flex items-center link link-primary font-bold underline"
          >
            {t("visitGithub")}
            <ExternalLink fontSize={18} className="translate-y-[-3px]" />
          </a>
        </motion.div>
      </motion.div>

      <div className="w-full h-500 bg-base-200 absolute top-[555px]">

      </div>
    </>
  );
}
