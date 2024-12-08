// hooks/use-create-gift-list.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GiftList } from "@/types/gift-list";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { useRouter } from "next/navigation";

interface CreateGiftListParams {
  name: string;
  description: string | null;
  date: string | null;
}

export const useCreateGiftList = () => {
  const { user } = useUser();
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<GiftList, Error, CreateGiftListParams>({
    mutationFn: async (params) => {
      const res = await fetch("/api/gift-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...params,
          userId: user?.uid,
        }),
      });

      if (!res.ok) throw new Error("Failed to create gift list");
      return res.json();
    },
    onSuccess: (giftList) => {
      queryClient.invalidateQueries({ queryKey: ["giftLists"] });
      addToast({
        description: "Gift list created successfully",
        type: "success",
      });
      router.push(`/gift-list/${giftList.id}`);
    },
    onError: () => {
      addToast({ description: "Failed to create gift list", type: "error" });
    },
  });
};
