"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      {isAdminRoute ? null : <SiteHeader />}
      <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </main>
      {isAdminRoute ? null : <SiteFooter />}
    </div>
  );
}
