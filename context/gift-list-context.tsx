// context/gift-list-context.tsx

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
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

const GiftListContext = createContext<GiftListContextProps>({
  giftLists: [],
  currentList: null,
  isLoadingGiftList: true,
  setCurrentList: () => {},
  mutate: () => {},
});

export const GiftListProvider = ({ children }: { children: ReactNode }) => {
  const [currentList, setCurrentList] = useState<GiftList | null>(null);
  const { user } = useUser();
  const { giftLists, isLoading, mutate } = useGiftLists(user?.uid);

  return (
    <GiftListContext.Provider
      value={{
        giftLists,
        currentList,
        isLoadingGiftList: isLoading,
        setCurrentList,
        mutate,
      }}
    >
      {children}
    </GiftListContext.Provider>
  );
};

export const useGiftList = () => useContext(GiftListContext);
