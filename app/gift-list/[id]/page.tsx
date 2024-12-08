// app/gift-list/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftTable } from "@/components/dashboard/gift-table";
import Spinner from "@/components/ui/spinner";
import { FilterOption } from "@/hooks/use-filtered-gifts";
import { useGifts } from "@/context/gifts-context";

export default function GiftListPage() {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const { currentList, setCurrentListId } = useGiftList();
  const [filter, setFilter] = useState<FilterOption>("All");
  const { getGiftsForList } = useGifts();

  useEffect(() => {
    setCurrentListId(currentListId);
  }, [currentListId, setCurrentListId]);

  if (!user || !currentList) {
    return <Spinner />;
  }

  const isOwner = currentList.isOwner;
  const gifts = getGiftsForList(currentList.id);

  return (
    <div>
      <GiftTable
        key={currentList.id}
        authenticatedUser={user}
        currentList={currentList}
        gifts={gifts || []}
        isOwner={isOwner}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
