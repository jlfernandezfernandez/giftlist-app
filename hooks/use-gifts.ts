// hooks/use-gifts.ts

import useSWR from "swr";
import { Gift } from "@/types/gift";
import { useGifts as useGiftsContext } from "@/context/gifts-context";
import { useToast } from "@/context/toast-context";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("An error occurred while fetching the data.");
  return res.json();
};

export const useGifts = (giftListId: string | null) => {
  const { setGiftsForList } = useGiftsContext();
  const { addToast } = useToast();

  const { data, error, mutate } = useSWR<Gift[]>(
    giftListId ? `/api/gift-lists/${giftListId}/gift` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (giftListId) setGiftsForList(giftListId, data);
      },
      onError: (err) => {
        console.error("Error fetching gifts:", err);
        addToast({
          title: "Error",
          description: "Failed to fetch gifts. Please try again later.",
        });
      },
    }
  );

  return {
    gifts: data ?? [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
