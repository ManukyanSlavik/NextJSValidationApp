import React from "react";
import { item } from "@/public/utils/animations";
import { LayoutDashboardIcon, MonitorSmartphoneIcon, ZapIcon } from "@/public/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const FeatureBlock = ({ type }: { type: string }) => {
  const { t } = useTranslation("landing");

  return (
    <motion.div
      variants={item}
      viewport={{ once: true }}
      className="w-[1000px] h-[300px] flex justify-between items-center mx-auto "
    >
      {type === "design" && (
        <>
          <LayoutDashboardIcon
            className="text-primary drop-shadow-[0_0_24px_rgba(96,93,255,0.75)]"
            width={275}
            height={275}
          />

          <div className="w-[500px]">
            <h1 className="text-primary-content text-[42px] font-bold">
              {t("designTitle")}
            </h1>
            <h2 className="text-secondary text-[20px] font-bold">
              {t("designDesc")}
            </h2>
          </div>
        </>
      )}
      {type === "device" && (
        <>
          <div className="w-[500px]">
            <h1 className="text-primary-content text-[42px] font-bold">
              {t("deviceTitle")}
            </h1>
            <h2 className="text-secondary text-[20px] font-bold">
              {t("deviceDesc")}
            </h2>
          </div>

          <MonitorSmartphoneIcon
            className="text-accent drop-shadow-[0_0_24px_rgba(0,211,187,0.75)]"
            width={275}
            height={250}
          />
        </>
      )}
      {type === "speed" && (
        <>
          <ZapIcon
            className="text-warning drop-shadow-[0_0_24px_rgba(252,183,0,0.75)]"
            width={275}
            height={296}
          />

          <div className="w-[500px]">
            <h1 className="text-primary-content text-[42px] font-bold">
              {t("speedTitle")}
            </h1>
            <h2 className="text-secondary text-[20px] font-bold">
              {t("speedDesc")}
            </h2>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default FeatureBlock;
