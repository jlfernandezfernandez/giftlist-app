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
  currentList: GiftList | null;
  isLoadingGiftList: boolean;
  setCurrentList: (list: GiftList) => void;
  mutate: () => void;
}

const GiftListContext = createContext<GiftListContextProps | undefined>(
  undefined
);

export const GiftListProvider = ({ children }: { children: ReactNode }) => {
  const [currentList, setCurrentList] = useState<GiftList | null>(null);
  const { user } = useUser();
  const { giftLists, isLoading, mutate } = useGiftLists(user?.uid);

  const value = useMemo(
    () => ({
      giftLists,
      currentList,
      isLoadingGiftList: isLoading,
      setCurrentList,
      mutate,
    }),
    [giftLists, currentList, isLoading, mutate]
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
