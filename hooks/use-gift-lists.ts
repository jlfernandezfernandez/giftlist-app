// hooks/use-gift-lists.ts

import useSWR from "swr";
import { GiftList } from "@/types/gift-list";

export const useGiftLists = (userId: string | undefined) => {
  const { data, error, mutate } = useSWR<GiftList[]>(
    userId ? `/api/gift-lists/user/${userId}` : null,
    (url: string) => fetch(url).then((res) => res.json())
  );

  return {
    giftLists: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
