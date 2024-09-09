// components/dashboard/own-gift-list-summary.tsx
// This component displays a summary of the user's own gift lists

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GiftList } from "@/components/dashboard/gift-list";
import { useGiftList } from "@/context/gift-list-context";
import { ListIcon, PlusIcon } from "lucide-react";

export function OwnGiftListSummary() {
  const { giftLists } = useGiftList();

  const ownGiftLists = useMemo(() => {
    return giftLists?.filter((list) => list.isOwner) ?? [];
  }, [giftLists]);

  return (
    <Card className="h-[400px] max-h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <ListIcon className="h-4 w-4 text-primary mr-2" />
          Your Gift Lists
        </CardTitle>
        <Link href="/gift-list/create" passHref>
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
            <PlusIcon className="h-3 w-3 mr-1" />
            New List
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-0">
        {ownGiftLists.length > 0 ? (
          <div className="space-y-2">
            {ownGiftLists.map((list) => (
              <GiftList key={list.id} giftList={list} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center text-sm">
              You haven&apos;t created any gift lists yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
