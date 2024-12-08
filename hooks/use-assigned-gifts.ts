// hooks/use-assigned-gifts.ts

import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/types/gift";

export const useAssignedGifts = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery<Gift[]>({
    queryKey: ["assignedGifts", userId],
    queryFn: () =>
      fetch(`/api/gifts/user/${userId}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assigned gifts");
        return res.json();
      }),
    enabled: !!userId,
  });

  return {
    assignedGifts: data ?? [],
    isLoading,
    isError,
    mutate: refetch,
  };
};
