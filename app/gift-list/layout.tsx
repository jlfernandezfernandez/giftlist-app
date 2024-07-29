// app/gift-list/layout.tsx

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserProvider } from "@/context/user-context";
import { GiftListProvider } from "@/context/gift-list-context";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { SidebarProvider } from "@/context/sidebar-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/context/toast-context";

export default function GiftListLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <UserProvider>
          <GiftListProvider>
            <SidebarProvider>
              <div className="flex flex-col md:flex-row min-h-screen w-full">
                <MobileHeader />
                <Sidebar />
                <main className="flex-1 p-2 sm:p-6 overflow-y-auto">
                  {children}
                </main>
              </div>
              <Toaster />
            </SidebarProvider>
          </GiftListProvider>
        </UserProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
