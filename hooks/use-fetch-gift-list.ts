// hooks/use-fetch-gift-list.ts

import { useState, useEffect } from "react";
import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useFetchGiftList = (user: AuthenticatedUser | null) => {
  const [giftLists, setGiftLists] = useState<GiftListSummary[]>([]);
  const [isLoadingGiftList, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchGiftList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/gift-lists/${user.uid}`);
        const data: GiftListSummary[] = await response.json();
        setGiftLists(data);
      } catch (error) {
        console.error("Failed to fetch gift lists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftList();
  }, [user]);

  return { giftLists, isLoadingGiftList };
};
