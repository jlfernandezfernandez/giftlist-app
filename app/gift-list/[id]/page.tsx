// pages/gift-list/[id].tsx

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
    <div className="h-full px-2 py-4 sm:p-6 overflow-y-auto">
      {user && selectedList && (
        <GiftTable
          key={selectedList.id}
          authenticatedUser={user}
          currentList={selectedList}
          gifts={gifts}
          isOwner={selectedList.isOwner}
        />
      )}
    </div>
  );
}
