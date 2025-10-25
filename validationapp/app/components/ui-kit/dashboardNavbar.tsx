"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./themeSwitcher";

const DashboardNavbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          href="/pages/dashboard"
          className="btn btn-ghost text-xl text-primary-content"
        >
          SCTasks
        </Link>{" "}
      </div>
      <div className="navbar-end">
        <div className="pr-3">
          <ThemeSwitcher size={20} />
        </div>
        {status === "unauthenticated" && (
          <>
            <Link href="/pages/register" className="btn mr-1">
              Sign up
            </Link>
            <Link href="/pages/signin" className="btn mr-1">
              Sign in
            </Link>
          </>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout" className="btn mr-1">
            Sign out
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
