// pages/gift-list/[id].tsx

"use client";

import { GiftTable } from "@/components/dashboard/gift-table";
import { useUser } from "@/context/user-context";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useGifts } from "@/hooks/use-gifts";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/context/toast-context";

export default function GiftListPage() {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const router = useRouter();
  const { addToast } = useToast();

  const { giftLists } = useGiftLists(user?.uid);
  const { gifts } = useGifts(currentListId);

  const selectedList = giftLists?.find((list) => list.id === currentListId);

  useEffect(() => {
    if (!selectedList && giftLists) {
      addToast({
        title: "Error",
        description: "Gift list not found.",
      });
      router.push("/gift-list/create");
    }
  }, []);

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
