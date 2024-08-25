// hooks/use-associate-user-to-gift-list.ts
import { useState, useEffect, useCallback } from "react";
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
  const { mutate } = useGiftList();

  const associateUser = useCallback(async () => {
    if (!user) {
      setError("User not authenticated");
      setStatus("error");
      addToast({
        title: "Error",
        description: "User not authenticated. Please log in and try again.",
      });
      return;
    }

    setStatus("loading");
    setError(null);

    try {
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

      setStatus("success");
      addToast({
        title: "Success",
        description: "You've been successfully associated with the gift list.",
      });
      mutate(); // Reload the gift list context
      router.push(`/gift-list/${giftListId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setStatus("error");
      addToast({
        title: "Error",
        description: `Failed to associate with gift list: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      });
    }
  }, [giftListId, user, addToast, router, role, mutate]);

  useEffect(() => {
    if (giftListId && !isLoadingUser && status === "idle") {
      associateUser();
    }
  }, [giftListId, associateUser, status, isLoadingUser]);

  const retryAssociation = () => {
    setStatus("idle");
  };

  return { status, error, retryAssociation, isLoadingUser };
};
