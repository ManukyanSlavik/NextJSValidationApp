import "../../globals.css";
import AuthProvider from "@/app/api/auth/AuthProvider";
import DashboardNavbar from "@/app/components/ui-kit/dashboardNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <AuthProvider>
          <DashboardNavbar></DashboardNavbar>
        </AuthProvider>
      </header>
      {children}
    </>
  );
}
