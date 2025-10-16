import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import I18nProvider from "./i18n-provider";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCTasks",
  description: "A modern task tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${instrumentSans.variable} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

{
  /*Framer motion*/
}
