"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>
      {status === "unauthenticated" && (
        <>
          <div className="navbar-end">
            <Link href="/register" className="btn mr-1">
              Sign up
            </Link>
            <Link href="api/auth/signin" className="btn mr-1">
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
