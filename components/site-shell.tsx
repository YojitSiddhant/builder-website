"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader />
      <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
