// components/dashboard/gift-list.tsx
// This component displays a summary of a single gift list

import Link from "next/link";
import { ListIcon, ChevronRightIcon } from "lucide-react";
import { GiftList as GiftListType } from "@/types/gift-list"; // Asegúrate de tener este tipo definido

interface GiftListProps {
  giftList: GiftListType;
}

export function GiftList({ giftList }: GiftListProps) {
  return (
    <Link
      href={`/gift-list/${giftList.id}`}
      className="block hover:bg-muted rounded-md transition-colors"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center min-w-0 flex-grow">
          <ListIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-grow">
            <h3 className="font-medium text-sm truncate">{giftList.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {giftList.gifts?.length || 0} gift
              {giftList.gifts?.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </div>
    </Link>
  );
}
