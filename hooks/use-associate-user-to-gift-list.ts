// hooks/use-associate-user-to-gift-list.ts
import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { useRouter } from "next/navigation";
import { useGiftList } from "@/context/gift-list-context";

export const useAssociateUserToGiftList = (
  giftListId: string,
  role: string = "guest"
) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const { user, isLoadingUser } = useUser();
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const response = await fetch(`/api/gift-lists/${giftListId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to associate user to gift list");
      }

      return response.json();
    },
    onSuccess: () => {
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["giftLists"] });
      addToast({
        description: "You've been successfully associated with the gift list.",
        type: "success",
      });
      router.push(`/gift-list/${giftListId}`);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setStatus("error");
      addToast({
        description: `Failed to associate with gift list: ${errorMessage}`,
        type: "error",
      });
    },
  });

  const associateUser = useCallback(async () => {
    if (!user || isLoadingUser) return;
    setStatus("loading");
    setError(null);
    await mutation.mutateAsync();
  }, [user, isLoadingUser, mutation]);

  const retryAssociation = () => {
    setStatus("idle");
  };

  return { status, error, retryAssociation, isLoadingUser };
};
