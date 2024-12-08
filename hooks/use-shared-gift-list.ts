// hooks/use-shared-gift-list.ts
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";

export const useSharedGiftList = (giftListId: string) => {
  const router = useRouter();
  const { user } = useUser();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { mutate: associateUser, status } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const response = await fetch(`/api/gift-lists/${giftListId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, role: "guest" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to associate user with gift list"
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftLists"] });
      router.push(`/gift-list/${giftListId}`);
    },
    onError: (err) => {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      addToast({
        description: "Failed to join gift list",
        type: "error",
      });
    },
  });

  return { status, error, associateUser };
};
