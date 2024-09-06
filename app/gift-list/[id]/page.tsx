// app/gift-list/[id]/page.tsx
"use client";

import { useMemo } from "react";
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

  const selectedList = useMemo(
    () => giftLists?.find((list) => list.id === currentListId),
    [giftLists, currentListId]
  );

  if (!user || !selectedList) {
    return null;
  }

  return (
    <div>
      <GiftTable
        key={selectedList.id}
        authenticatedUser={user}
        currentList={selectedList}
        gifts={gifts}
        isOwner={selectedList.isOwner}
      />
    </div>
  );
}
