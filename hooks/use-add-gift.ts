// hooks/use-add-gift.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";

interface AddGiftParams {
  listId: string;
  details: string;
  link: string;
  name?: string;
  price?: number;
  currency?: string;
}

export const useAddGift = (authenticatedUser: AuthenticatedUser | null) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<Gift, Error, AddGiftParams>({
    mutationFn: async (params) => {
      const res = await fetch(`/api/gift-lists/${params.listId}/gift`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...params,
          userId: authenticatedUser?.uid,
        }),
      });

      if (!res.ok) throw new Error("Failed to add gift");
      return res.json();
    },
    onSuccess: (_, { listId }) => {
      queryClient.invalidateQueries({ queryKey: ["gifts", listId] });
      addToast({ description: "Gift added successfully", type: "success" });
    },
    onError: () => {
      addToast({ description: "Failed to add gift", type: "error" });
    },
  });
};
