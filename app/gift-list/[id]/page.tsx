// app/gift-list/[id]/page.tsx
"use client";

import { useMemo } from "react";
import { GiftTable } from "@/components/dashboard/gift-table";
import { useUser } from "@/context/user-context";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useGifts } from "@/hooks/use-gifts";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import Spinner from "@/components/ui/spinner";

export default function GiftListPage() {
  const { user, isLoadingUser } = useUser();
  const currentListId = useCurrentGiftListId();
  const { giftLists, isLoading: isLoadingLists } = useGiftLists(user?.uid);
  const { gifts, isLoading: isLoadingGifts } = useGifts(currentListId);

  const selectedList = useMemo(
    () => giftLists?.find((list) => list.id === currentListId),
    [giftLists, currentListId]
  );

  const isLoading =
    isLoadingUser || isLoadingLists || isLoadingGifts || !user || !selectedList;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
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
