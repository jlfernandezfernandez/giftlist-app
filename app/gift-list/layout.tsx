// app/gift-list/layout.tsx

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserProvider } from "@/context/user-context";
import { GiftListProvider } from "@/context/gift-list-context";

export default function GiftListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <UserProvider>
        <GiftListProvider>
          <Sidebar />
          <main className="flex-1 p-2 sm:p-6 overflow-y-auto">{children}</main>
        </GiftListProvider>
      </UserProvider>
    </div>
  );
}
