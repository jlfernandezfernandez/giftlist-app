// app/gift-list/[id]/shared/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAssociateUserToGiftList } from "@/hooks/use-associate-user-to-gift-list";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function SharedGiftListPage() {
  const { id } = useParams();
  const { status, error, retryAssociation, isLoadingUser } =
    useAssociateUserToGiftList(id as string);

  if (isLoadingUser || status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-4 text-lg">
          {isLoadingUser
            ? "Loading user information..."
            : "Associating you with the gift list..."}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Error: {error}</p>
        <Button onClick={retryAssociation} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Successfully associated! Redirecting...</p>
      </div>
    );
  }

  return null;
}
