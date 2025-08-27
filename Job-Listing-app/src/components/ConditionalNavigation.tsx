"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navigation } from "./Navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Don't show navigation on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null;
  }

  // Don't show navigation on landing page when user is not authenticated
  if (pathname === "/" && !session && status !== "loading") {
    return null;
  }

  // Always show navigation on jobs page for authenticated users
  if (pathname === "/jobs" && session) {
    return <Navigation />;
  }

  return <Navigation />;
}
