// pages/gift-list/[currentListId].tsx

"use client";

import { GiftTable } from "@/components/dashboard/gift-table";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useGifts } from "@/hooks/use-gifts";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

export default function GiftListPage() {
  const { user, isLoadingUser } = useUser();
  const currentListId = useCurrentGiftListId();

  const { giftLists, isLoading: isLoadingGiftLists } = useGiftLists(user?.uid);
  const { gifts, isLoading: isLoadingGifts } = useGifts(currentListId ?? "");

  const selectedList = giftLists?.find((list) => list.id === currentListId);

  if (isLoadingUser || isLoadingGiftLists || isLoadingGifts) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-6 ml-auto">
        {user && selectedList && (
          <GiftTable
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
