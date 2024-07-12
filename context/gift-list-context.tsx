"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { GiftListSummary } from "@/types/gift-list-summary";
import { useUser } from "@/context/user-context";
import { useFetchGiftList } from "@/hooks/use-fetch-gift-list";

interface GiftListContextProps {
  giftLists: GiftListSummary[];
  isLoadingGiftList: boolean;
  updateGiftList: () => void;
}

const GiftListContext = createContext<GiftListContextProps>({
  giftLists: [],
  isLoadingGiftList: true,
  updateGiftList: () => undefined,
});

export const GiftListProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { giftLists, isLoadingGiftList, updateGiftList } =
    useFetchGiftList(user);

  useEffect(() => {
    if (user) {
      updateGiftList();
    }
  }, [user, updateGiftList]);

  return (
    <GiftListContext.Provider
      value={{ giftLists, isLoadingGiftList, updateGiftList }}
    >
      {children}
    </GiftListContext.Provider>
  );
};

export const useGiftList = () => useContext(GiftListContext);
