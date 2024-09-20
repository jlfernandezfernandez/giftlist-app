// app/gift-list/[id]/page.tsx
"use client";

import { useEffect } from "react";
import { GiftTable } from "@/components/dashboard/gift-table";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { useGifts } from "@/hooks/use-gifts";

export default function GiftListPage() {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const { currentList, setCurrentListId } = useGiftList();
  const { gifts, isLoading: isLoadingGifts } = useGifts(currentListId);

  useEffect(() => {
    setCurrentListId(currentListId);
  }, [currentListId, setCurrentListId]);

  if (!user || !currentList) {
    return null;
  }

  return (
    <div>
      {isLoadingGifts ? (
        <div>Loading gifts...</div>
      ) : (
        <GiftTable
          key={currentList.id}
          authenticatedUser={user}
          currentList={currentList}
          gifts={gifts}
          isOwner={currentList.isOwner}
        />
      )}
    </div>
  );
}
