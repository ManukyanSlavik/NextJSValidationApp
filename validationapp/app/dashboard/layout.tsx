import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import AuthProvider from "../api/auth/AuthProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <AuthProvider>
          <Navbar></Navbar>
        </AuthProvider>
      </header>
      {children}
    </>
  );
}
