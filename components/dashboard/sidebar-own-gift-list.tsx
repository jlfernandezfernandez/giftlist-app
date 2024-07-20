// components/dashboard/sidebar-own-gift-list.tsx

import Link from "next/link";
import { GiftIcon } from "lucide-react";
import { GiftList } from "@/types/gift-list";

interface OwnGiftListProps {
  list: GiftList;
  onClick: () => void;
}

export function OwnGiftList({ list, onClick }: OwnGiftListProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Link
        href={`/gift-list/${list.id}`}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
      >
        <GiftIcon className="h-4 w-4 mr-1 flex-shrink-0" />
        <span className="truncate" title={list.name}>
          {list.name}
        </span>
      </Link>
    </div>
  );
}
