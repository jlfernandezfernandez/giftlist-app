"use client";

import { GiftTable } from "@/components/dashboard/gift-table";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

export default function GiftListPage() {
  const currentListId = useCurrentGiftListId();
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser || !currentListId) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-6 ml-auto">
        <GiftTable authenticatedUser={user} currentListId={currentListId} />
      </main>
    </div>
  );
}
