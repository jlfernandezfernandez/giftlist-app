// hooks/use-shared-gift-list.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";

export const useSharedGiftList = (giftListId: string) => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate } = useGiftList();
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const associateUser = async () => {
      if (user && status === "idle") {
        setStatus("loading");
        setError(null);

        try {
          const response = await fetch(`/api/gift-lists/${giftListId}/share`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.uid, role: "guest" }),
          });

          if (response.status === 200 || response.status === 409) {
            await mutate();
            setStatus("success");
            router.push(`/gift-list/${giftListId}`);
          } else {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Failed to associate user with gift list"
            );
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
          setStatus("error");
        }
      }
    };

    associateUser();
  }, [user, giftListId, router, mutate, status]);

  return { status, error };
};
