// hooks/use-gifts.ts

import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";
import { useGifts as useGiftsContext } from "@/context/gifts-context";

export const useGifts = (giftListId: string | null) => {
  const { addToast } = useToast();
  const { setGiftsForList } = useGiftsContext();

  const { data, isError, isLoading, refetch } = useQuery<Gift[]>({
    queryKey: ["gifts", giftListId],
    queryFn: async () => {
      const res = await fetch(`/api/gift-lists/${giftListId}/gift`);
      if (!res.ok) {
        addToast({
          description: "Failed to fetch gifts. Please try again later.",
          type: "error",
        });
        throw new Error("Failed to fetch gifts");
      }
      const data = await res.json();
      if (giftListId) {
        setGiftsForList(giftListId, data);
      }
      return data;
    },
    enabled: !!giftListId,
  });

  return {
    gifts: data ?? [],
    isLoading,
    isError,
    mutate: refetch,
  };
};
