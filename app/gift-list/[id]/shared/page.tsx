// app/gift-list/[id]/shared/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useAssociateUserToGiftList } from "@/hooks/use-associate-user-to-gift-list";

export default function SharedGiftList({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const { associateUserToGiftList, isLoading, error } =
    useAssociateUserToGiftList();
  const [associationError, setAssociationError] = useState<string | null>(null);
  const [hasAttemptedAssociation, setHasAttemptedAssociation] = useState(false);

  const handleAssociation = useCallback(async () => {
    if (!hasAttemptedAssociation) {
      setHasAttemptedAssociation(true);
      const result = await associateUserToGiftList(params.id, "guest");
      if (result) {
        router.push(`/gift-list/${params.id}`);
      } else {
        setAssociationError("Failed to join the gift list. Please try again.");
      }
    }
  }, [hasAttemptedAssociation, associateUserToGiftList, params.id, router]);

  useEffect(() => {
    if (user) {
      handleAssociation();
    }
  }, [user, handleAssociation]);

  if (isLoadingUser || isLoading) {
    return <Spinner />;
  }

  if (error || associationError) {
    return <div>{error || associationError}</div>;
  }

  return null;
}
