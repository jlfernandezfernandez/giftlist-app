// components/dashboard/shared-gift-list-summary.tsx
// This component displays a summary of gift lists shared with the user

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGiftList } from "@/context/gift-list-context";
import { GiftList } from "./gift-list";
import { Share2Icon, PlusIcon } from "lucide-react";

export function SharedGiftListSummary() {
  const { giftLists } = useGiftList();

  const sharedGiftLists = useMemo(() => {
    return giftLists?.filter((list) => !list.isOwner) ?? [];
  }, [giftLists]);

  return (
    <Card className="h-[400px] max-h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Share2Icon className="h-4 w-4 text-primary mr-2" />
          Shared With You
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-0">
        {sharedGiftLists.length > 0 ? (
          <div className="space-y-2">
            {sharedGiftLists.map((list) => (
              <GiftList key={list.id} giftList={list} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center text-sm">
              No gift lists have been shared with you yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
