"use client";

import { ExternalLinkIcon } from "@/public/icons";
import { useTranslation } from "react-i18next";
import Header from "./components/ui-kit/header";
import { motion } from "framer-motion";
import { container, item } from "@/public/utils/animations";
import FeatureBlock from "./components/ui-kit/featureBlock";
import TechStackCard from "./components/ui-kit/techStackCard";

export default function Home() {
  const { t } = useTranslation("landing");

  return (
    <>
      <div className="relative bg-base-100 pb-30">
        <div className="pointer-events-none absolute left-0 top-0 h-[28vmin] w-[28vmin] bg-base-300 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>

        <div className="pointer-events-none absolute right-0 top-[360px] h-[50vmin] w-[50vmin] bg-base-300 [clip-path:polygon(100%_100%,0_100%,100%_0)]"></div>
        <Header />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="z-10"
        >
          <div>
            <motion.h1
              variants={item}
              viewport={{ once: true }}
              className="text-[56px] text-primary-content text-center font-bold mt-10"
            >
              {t("title")}
            </motion.h1>
            <motion.h2
              variants={item}
              className="text-[24px] text-secondary font-bold text-center mt-5"
            >
              {t("subTitle")}
            </motion.h2>
          </div>

          <div className="pt-20">
            <div className="w-fit mx-auto">
              <motion.div variants={item} className="flex items-center gap-4">
                <a href="/register" className="btn btn-primary text-primary-content font-bold">
                  {t("signUp")}
                </a>

                <span className="text-primary-content text-lg font-bold select-none">
                  {t("or")}
                </span>

                <a
                  href="/signin"
                  className="btn btn-neutral text-primary-content font-bold"
                >
                  {t("signIn")}
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
              <ExternalLinkIcon fontSize={18} className="translate-y-[-3px]" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full h-fit py-[50px] bg-base-200 relative z-10"
      >
        <FeatureBlock type="design" />
        <FeatureBlock type="device" />
        <FeatureBlock type="speed" />
      </motion.div>

      <div className="w-full h-[500px] bg-base-100 pt-10 pb-10">
        <h1 className="text-center text-[40px] font-bold pb-10">Tools & Frameworks</h1>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once: true}} className="flex justify-between px-[150px]">
          <TechStackCard type="react"/>
          <TechStackCard type="next"/>
          <TechStackCard type="db"/>
        </motion.div>
      </div>
    </>
  );
}
