"use client";

import { QueryProvider } from "./providers/query-provider";
import { AuthProvider } from "@/context/user-context";
import { GiftListProvider } from "@/context/gift-list-context";
import { GiftsProvider } from "@/context/gifts-context";
import { ToastProvider } from "@/context/toast-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          <GiftListProvider>
            <GiftsProvider>{children}</GiftsProvider>
          </GiftListProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
