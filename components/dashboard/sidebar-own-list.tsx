// components/dashboard/sidebar-own-list.tsx

import Link from "next/link";
import { GiftIcon } from "lucide-react";
import { GiftListSummary } from "@/types/gift-list-summary";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { useOwnGiftLists } from "@/hooks/use-own-gift-lists";
import { useUser } from "@/context/user-context";

interface SidebarOwnListProps {
  giftLists: GiftListSummary[];
}

export function SidebarOwnList({ giftLists }: SidebarOwnListProps) {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const userGiftLists = useOwnGiftLists(giftLists, user);

  return (
    <div>
      {userGiftLists.map((list) => (
        <Link
          key={list.id}
          href={`/gift-list/${list.id}`}
          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
            list.id === currentListId ? "bg-muted text-foreground" : ""
          }`}
        >
          <GiftIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate" title={list.name}>
            {list.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
