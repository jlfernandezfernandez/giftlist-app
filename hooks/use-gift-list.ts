// hooks/use-gift-list.ts
import { useState, useEffect, useCallback } from "react";
import { GiftList } from "@/types/gift-list";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useGiftList = (authenticatedUser: AuthenticatedUser | null) => {
  const [currentList, setCurrentList] = useState<GiftList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentListId = useCurrentGiftListId();

  const fetchGiftList = useCallback(async () => {
    if (!authenticatedUser || !currentListId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/gift-lists/${currentListId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gift list");
      }
      const data: GiftList = await response.json();
      setCurrentList(data);
    } catch (error) {
      console.error("Error fetching gift list:", error);
    } finally {
      setIsLoading(false);
    }
  }, [authenticatedUser, currentListId]);

  useEffect(() => {
    fetchGiftList();
  }, [fetchGiftList]);

  return { currentList, isLoading, refreshGiftList: fetchGiftList };
};
