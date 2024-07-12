// app/gift-list/layout.tsx

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserProvider } from "@/context/user-context";

export default function GiftListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <UserProvider>
        <Sidebar />
        <main className="flex-1 p-6 ml-auto">{children}</main>
      </UserProvider>
    </div>
  );
}
