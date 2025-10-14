import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import I18nProvider from "./i18n-provider";
import Header from "./components/header";

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
        <I18nProvider>
          <section className="relative isolate bg-neutral-950">
            <div className="pointer-events-none absolute left-0 top-0 z-1 h-[28vmin] w-[28vmin] bg-base-300 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>

            <div className="pointer-events-none absolute right-0 top-[360px] z-1 h-[28vmin] w-[28vmin] bg-base-300 [clip-path:polygon(100%_100%,0_100%,100%_0)]"></div>
          </section>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
