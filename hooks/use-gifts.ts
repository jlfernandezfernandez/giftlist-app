// hooks/use-gifts.ts

import useSWR from "swr";
import { Gift } from "@/types/gift";

export const useGifts = (giftListId: string) => {
  const { data, error, mutate } = useSWR<Gift[]>(
    giftListId ? `/api/gift-lists/${giftListId}/gift` : null,
    (url: string) => fetch(url).then((res) => res.json())
  );

  return {
    gifts: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
