import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./themeSwitcher";

const AuthNavbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Link href={"/"} className="btn btn-ghost text-xl">
          SCTasks
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher size={20} />
      </div>
    </div>
  );
};

export default AuthNavbar;
