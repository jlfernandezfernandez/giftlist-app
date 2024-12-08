// hooks/use-gift-lists.ts

import { useQuery } from "@tanstack/react-query";
import { GiftList } from "@/types/gift-list";
import { useToast } from "@/context/toast-context";

export const useGiftLists = (userId: string | undefined) => {
  const { addToast } = useToast();

  const { data, isError, isLoading, refetch } = useQuery<GiftList[]>({
    queryKey: ["giftLists", userId],
    queryFn: async () => {
      const res = await fetch(`/api/gift-lists/user/${userId}`);
      if (!res.ok) {
        addToast({
          description: "Failed to fetch gift lists",
          type: "error",
        });
        throw new Error("Failed to fetch gift lists");
      }
      return res.json();
    },
    enabled: !!userId,
    staleTime: 30 * 1000, // 30 segundos
  });

  return {
    giftLists: data ?? [],
    isLoading,
    isError,
    mutate: refetch,
  };
};
