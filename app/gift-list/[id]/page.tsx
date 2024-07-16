// pages/gift-list/[currentListId].tsx

"use client";

import { GiftTable } from "@/components/dashboard/gift-table";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";

export default function GiftListPage() {
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-6 ml-auto">
        {user && <GiftTable authenticatedUser={user} />}
      </main>
    </div>
  );
}
