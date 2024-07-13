import { useState, useEffect, useCallback } from "react";
import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useUserGiftLists = (user: AuthenticatedUser | null) => {
  const [giftLists, setGiftLists] = useState<GiftListSummary[]>([]);
  const [isLoadingGiftList, setIsLoading] = useState(false);

  const updateGiftList = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    console.log("fetching gift lists");
    try {
      const response = await fetch(`/api/gift-lists/user/${user.uid}`);
      const data: GiftListSummary[] = await response.json();
      setGiftLists(data);
    } catch (error) {
      console.error("Failed to fetch gift lists:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    updateGiftList();
  }, [updateGiftList]);

  return { giftLists, isLoadingGiftList, updateGiftList };
};
