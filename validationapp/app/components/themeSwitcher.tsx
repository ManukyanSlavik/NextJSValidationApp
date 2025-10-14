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
    <div onClick={changeTheme} className="cursor-pointer">
      <ThemeSwitcherIcon fontSize={25} color={color} />
    </div>
  );
};

export default ThemeSwitcher;
