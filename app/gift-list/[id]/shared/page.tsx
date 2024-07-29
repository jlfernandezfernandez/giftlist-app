// app/gift-list/[id]/shared/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useSharedGiftList } from "@/hooks/use-shared-gift-list";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function SharedGiftListPage() {
  const { id } = useParams();
  const { status, error } = useSharedGiftList(id as string);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-4 text-lg">Associating you with the gift list...</p>
      </div>
    );
  }

  if (status === "error") {
    alert(`Error: ${error}`);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Redirecting you to the gift list...</p>
      </div>
    );
  }

  return null;
}
