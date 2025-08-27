"use client";

import type React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
