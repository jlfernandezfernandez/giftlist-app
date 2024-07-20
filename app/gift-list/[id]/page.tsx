// pages/gift-list/[currentListId].tsx

"use client";

import { GiftTable } from "@/components/dashboard/gift-table";
import { useUser } from "@/context/user-context";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useGifts } from "@/hooks/use-gifts";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

export default function GiftListPage() {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();

  const { giftLists } = useGiftLists(user?.uid);
  const { gifts } = useGifts(currentListId);

  const selectedList = giftLists?.find((list) => list.id === currentListId);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-2 sm:p-6">
        {user && selectedList && (
          <GiftTable
            key={selectedList.id}
            authenticatedUser={user}
            currentList={selectedList}
            gifts={gifts}
            isOwner={selectedList.isOwner}
          />
        )}
      </main>
    </div>
  );
}
