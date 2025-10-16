"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          SCTasks
        </Link>{" "}
      </div>
      {status === "unauthenticated" && (
        <>
          <div className="navbar-end">
            <Link href="/pages/register" className="btn mr-1">
              Sign up
            </Link>
            <Link href="/pages/signin" className="btn mr-1">
              Sign in
            </Link>
          </div>
        </>
      )}
      {status === "authenticated" && (
        <>
          <div className="navbar-end">
            <Link href="/api/auth/signout" className="btn mr-1">
              Sign out
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
