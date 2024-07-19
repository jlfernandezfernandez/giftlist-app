// components/dashboard/sidebar-guest-gift-list.tsx

import Link from "next/link";
import { GiftIcon, UserIcon } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";

interface GuestGiftListProps {
  list: GiftList;
}

export function GuestGiftList({ list }: GuestGiftListProps) {
  const currentListId = useCurrentGiftListId();

  const owners = list.users.filter((user) => user.role === "owner");
  let ownerNames = "";

  if (owners.length === 1) {
    ownerNames = owners[0].name.split(" ").slice(0, 2).join(" ");
  } else if (owners.length > 1) {
    ownerNames = owners
      .map((owner, index) => {
        const namePart = owner.name.split(" ")[0];
        if (index === owners.length - 2) {
          return namePart + " y";
        } else if (index < owners.length - 1) {
          return namePart + ",";
        }
        return namePart;
      })
      .join(" ");
  }

  return (
    <div>
      <div className="flex items-center font-medium text-muted-foreground">
        <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
        <span className="truncate" title={ownerNames}>
          {ownerNames}
        </span>
      </div>
      <Link
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
    </div>
  );
}
