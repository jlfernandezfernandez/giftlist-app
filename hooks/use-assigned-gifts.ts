// hooks/use-assigned-gifts.ts

import useSWR from "swr";
import { Gift } from "@/types/gift";

export const useAssignedGifts = (userId: string) => {
  const { data, error, mutate } = useSWR<Gift[]>(
    userId ? `/api/gifts/user/${userId}` : null,
    (url: string) => fetch(url).then((res) => res.json())
  );

  return {
    assignedGifts: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
