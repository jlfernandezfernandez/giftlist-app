// app/gift-list/[id]/shared/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAssociateUserToGiftList } from "@/hooks/use-associate-user-to-gift-list";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function SharedGiftListPage() {
  const { id } = useParams();
  const { status, error, retryAssociation, isLoadingUser } =
    useAssociateUserToGiftList(id as string);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center p-6 border-2 border-gray-200 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Gift List Association</h1>

        {(status === "loading" || isLoadingUser) && (
          <p className="text-gray-600">Associating...</p>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-2" />
            <p className="text-red-600 mb-4">
              Failed to associate user to gift list
            </p>
            <Button onClick={retryAssociation} variant="outline">
              Try Again
            </Button>
          </>
        )}

        {status === "success" && (
          <p className="text-green-600">Successfully associated!</p>
        )}
      </div>
    </div>
  );
}
