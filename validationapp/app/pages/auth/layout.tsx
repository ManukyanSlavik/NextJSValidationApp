import AuthNavbar from "@/app/components/ui-kit/authNavbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <AuthNavbar />
      </header>
      {children}
    </>
  );
}
