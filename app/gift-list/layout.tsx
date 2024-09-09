// app/gift-list/layout.tsx

import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { UserProvider } from "@/context/user-context";
import { GiftListProvider } from "@/context/gift-list-context";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { SidebarProvider } from "@/context/sidebar-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/context/toast-context";
import { Sidebar } from "@/components/dashboard/sidebar";
import Spinner from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "GiftList AI - Manage Your Gift Lists",
  description:
    "Create, manage, and share your gift lists with friends and family",
};

export default function GiftListLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <UserProvider>
          <GiftListProvider>
            <SidebarProvider>
              <div className="flex flex-col lg:flex-row min-h-screen bg-white">
                <MobileHeader />
                <div className="flex flex-col lg:flex-row flex-1">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto">
                    <div className="min-h-[calc(100vh-4rem)] lg:min-h-screen p-4 md:p-6 lg:p-8 pb-16 md:pb-20">
                      <Suspense fallback={<Spinner />}>{children}</Suspense>
                    </div>
                  </main>
                </div>
              </div>
              <Toaster />
            </SidebarProvider>
          </GiftListProvider>
        </UserProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
