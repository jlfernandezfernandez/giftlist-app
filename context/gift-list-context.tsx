// context/gift-list-context.tsx
"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import { GiftList } from "@/types/gift-list";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { useUser } from "./user-context";

interface GiftListContextProps {
  giftLists: GiftList[];
  isLoading: boolean;
  currentList: GiftList | null;
  setCurrentListId: (listId: string | null) => void;
  mutate: () => void;
}

const GiftListContext = createContext<GiftListContextProps | undefined>(
  undefined
);

export const GiftListProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { giftLists, isLoading, mutate } = useGiftLists(user?.uid);
  const [currentListId, setCurrentListId] = useState<string | null>(null);

  const currentList = useMemo(
    () => giftLists.find((list) => list.id === currentListId) || null,
    [giftLists, currentListId]
  );

  const value = useMemo(
    () => ({
      giftLists,
      isLoading,
      currentList,
      setCurrentListId,
      mutate,
    }),
    [giftLists, isLoading, currentList, mutate]
  );

  return (
    <GiftListContext.Provider value={value}>
      {children}
    </GiftListContext.Provider>
  );
};

export const useGiftList = () => {
  const context = useContext(GiftListContext);
  if (context === undefined) {
    throw new Error("useGiftList must be used within a GiftListProvider");
  }
  return context;
};
