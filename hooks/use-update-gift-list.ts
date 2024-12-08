// hooks/use-update-gift-list.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GiftList } from "@/types/gift-list";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";

interface UpdateGiftListParams {
  giftListId: string;
  name: string;
  description: string | null;
  date: string | null;
}

export const useUpdateGiftList = () => {
  const { user } = useUser();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<GiftList, Error, UpdateGiftListParams>({
    mutationFn: async ({ giftListId, ...params }) => {
      const res = await fetch(`/api/gift-lists/${giftListId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...params,
          userId: user?.uid,
        }),
      });

      if (!res.ok) throw new Error("Failed to update gift list");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftLists"] });
      addToast({
        description: "Gift list updated successfully",
        type: "success",
      });
    },
    onError: () => {
      addToast({ description: "Failed to update gift list", type: "error" });
    },
  });
};
