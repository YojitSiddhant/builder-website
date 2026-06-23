import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Builder Website",
  description: "A simple website with navigation and placeholder pages.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full overflow-x-clip bg-white text-slate-900 antialiased">
        <div className="flex min-h-screen min-w-0 flex-col">
          <SiteHeader />
          <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
