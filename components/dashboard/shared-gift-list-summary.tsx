// components/dashboard/shared-gift-list-summary.tsx
// This component displays a summary of gift lists shared with the user

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGiftList } from "@/context/gift-list-context";
import { Share2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GiftListRow } from "./gift-list-row";

export function SharedGiftListSummary() {
  const { giftLists } = useGiftList();

  const sharedGiftLists = useMemo(() => {
    return giftLists?.filter((list) => !list.isOwner) ?? [];
  }, [giftLists]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium flex items-center">
          <Share2Icon className="h-4 w-4 text-primary mr-2" />
          Shared With You
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-0">
        {sharedGiftLists.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Gifts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sharedGiftLists.map((list) => (
                <GiftListRow key={list.id} giftList={list} />
              ))}
            </TableBody>
          </Table>
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
