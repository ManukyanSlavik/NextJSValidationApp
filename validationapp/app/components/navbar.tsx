"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Home
        </Link>{" "}
        {status === "authenticated" && <p>Hi, {session?.user.name}!</p>}
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
