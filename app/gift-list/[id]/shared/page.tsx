// app/gift-list/[id]/shared/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAssociateUserToGiftList } from "@/hooks/use-associate-user-to-gift-list";
import { Button } from "@/components/ui/button";

export default function SharedGiftListPage() {
  const { id } = useParams();
  const { status, error, retryAssociation } = useAssociateUserToGiftList(
    id as string
  );

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
