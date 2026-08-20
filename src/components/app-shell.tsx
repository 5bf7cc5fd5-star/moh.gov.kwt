"use client";

import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const consoleMode = pathname.startsWith("/admin");

  if (consoleMode) {
    return <div className="min-h-dvh bg-page">{children}</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
