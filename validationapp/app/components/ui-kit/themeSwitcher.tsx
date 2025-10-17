"use client";

import { ThemeSwitcherIcon } from "@/public/icons";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");
  const color = theme === "dark" ? "white" : "#1E1E1E";
  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      onClick={changeTheme}
      className="cursor-pointer btn btn-ghost btn-circle btn-sm border border-base-content/20 hover:border-primary hover:bg-base-200 transition"
    >
      <ThemeSwitcherIcon fontSize={20} color={color} />
    </div>
  );
};

export default ThemeSwitcher;
