// contexts/gifts-context.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Gift } from "@/types/gift";

interface GiftsContextType {
  gifts: Record<string, Gift[]>;
  addGift: (giftListId: string, gift: Gift) => void;
  updateGift: (giftListId: string, updatedGift: Gift) => void;
  removeGift: (giftListId: string, giftId: string) => void;
  setGiftsForList: (giftListId: string, gifts: Gift[]) => void;
  getAllGifts: () => Gift[];
  getGiftsForList: (giftListId: string) => Gift[];
}

const GiftsContext = createContext<GiftsContextType | undefined>(undefined);

export function GiftsProvider({ children }: { children: React.ReactNode }) {
  const [gifts, setGifts] = useState<Record<string, Gift[]>>({});

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

  const getGiftsForList = useCallback((giftListId: string) => {
    return gifts[giftListId] || [];
  }, [gifts]);

  const value = {
    gifts,
    addGift,
    updateGift,
    removeGift,
    setGiftsForList,
    getAllGifts,
    getGiftsForList,
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
