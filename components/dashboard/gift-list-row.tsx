// components/dashboard/gift-list-row.tsx
// This component displays a summary of a single gift list as a table row with more details

import Link from "next/link";
import { GiftList as GiftListType } from "@/types/gift-list";
import { useGifts } from "@/context/gifts-context";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface GiftListRowProps {
  giftList: GiftListType;
}

export function GiftListRow({ giftList }: GiftListRowProps) {
  const { getGiftsForList } = useGifts();
  const gifts = getGiftsForList(giftList.id);

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <Link
          href={`/gift-list/${giftList.id}`}
          className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          {giftList.name}
        </Link>
      </TableCell>
      <TableCell>
        {giftList.date
          ? format(new Date(giftList.date), "MMM d, yyyy")
          : "No date set"}
      </TableCell>
      <TableCell className="text-right">
        {`${gifts.length} gift${gifts.length !== 1 ? "s" : ""}`}
      </TableCell>
    </TableRow>
  );
}
