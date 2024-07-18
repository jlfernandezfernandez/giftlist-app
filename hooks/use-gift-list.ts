// hooks/use-gift-list.ts

import useSWR from "swr";
import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useCurrentGiftListId } from "./use-current-gift-list-id";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGiftList = (authenticatedUser: AuthenticatedUser | null) => {
  const currentListId = useCurrentGiftListId();
  const { data, error, mutate } = useSWR<GiftList>(
    authenticatedUser && currentListId
      ? `/api/gift-lists/${currentListId}`
      : null,
    fetcher
  );

  const isLoading = !data && !error;
  const refreshGiftList = mutate;

  return { currentList: data, isLoading, refreshGiftList };
};
