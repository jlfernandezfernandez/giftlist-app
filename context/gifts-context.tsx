// contexts/gifts-context.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Gift } from "@/types/gift";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useUser } from "./user-context";
import { useToast } from "@/context/toast-context";

interface GiftsContextType {
  gifts: Record<string, Gift[]>;
  addGift: (giftListId: string, gift: Gift) => void;
  updateGift: (giftListId: string, updatedGift: Gift) => void;
  removeGift: (giftListId: string, giftId: string) => void;
  setGiftsForList: (giftListId: string, gifts: Gift[]) => void;
  getAllGifts: () => Gift[];
  getGiftsForList: (giftListId: string) => Gift[];
  isLoading: boolean;
}

const GiftsContext = createContext<GiftsContextType | undefined>(undefined);

export function GiftsProvider({ children }: { children: React.ReactNode }) {
  const [gifts, setGifts] = useState<Record<string, Gift[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { giftLists } = useGiftLists(user?.uid);
  const { addToast } = useToast();

  useEffect(() => {
    if (giftLists.length === 0) return;
    const loadAllGifts = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          giftLists.map(async (list) => {
            const response = await fetch(`/api/gift-lists/${list.id}/gift`);
            if (!response.ok) throw new Error("Failed to fetch gifts");
            const gifts = await response.json();
            return { listId: list.id, gifts };
          })
        );
        setGifts(
          results.reduce((acc, { listId, gifts }) => {
            acc[listId] = gifts;
            return acc;
          }, {} as Record<string, Gift[]>)
        );
      } catch (error) {
        addToast({
          title: "Error",
          description: "Failed to fetch gifts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAllGifts();
  }, [giftLists, addToast]);

  const addGift = useCallback((giftListId: string, gift: Gift) => {
    setGifts((prev) => ({
      ...prev,
      [giftListId]: [...(prev[giftListId] || []), gift],
    }));
  }, []);

  const updateGift = useCallback((giftListId: string, updatedGift: Gift) => {
    setGifts((prev) => ({
      ...prev,
      [giftListId]:
        prev[giftListId]?.map((gift) =>
          gift.id === updatedGift.id ? updatedGift : gift
        ) || [],
    }));
  }, []);

  const removeGift = useCallback((giftListId: string, giftId: string) => {
    setGifts((prev) => ({
      ...prev,
      [giftListId]:
        prev[giftListId]?.filter((gift) => gift.id !== giftId) || [],
    }));
  }, []);

  const setGiftsForList = useCallback((giftListId: string, gifts: Gift[]) => {
    setGifts((prev) => ({
      ...prev,
      [giftListId]: gifts,
    }));
  }, []);

  const getAllGifts = useCallback(() => {
    return Object.values(gifts).flat();
  }, [gifts]);

  const getGiftsForList = useCallback(
    (giftListId: string) => {
      return gifts[giftListId] || [];
    },
    [gifts]
  );

  const value = {
    gifts,
    addGift,
    updateGift,
    removeGift,
    setGiftsForList,
    getAllGifts,
    getGiftsForList,
    isLoading,
  };

  return (
    <GiftsContext.Provider value={value}>{children}</GiftsContext.Provider>
  );
}

export function useGifts() {
  const context = useContext(GiftsContext);
  if (context === undefined) {
    throw new Error("useGifts must be used within a GiftsProvider");
  }
  return context;
}
