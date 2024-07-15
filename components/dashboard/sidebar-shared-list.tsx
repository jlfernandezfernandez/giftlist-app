// components/dashboard/sidebar-shared-list.tsx

import Link from "next/link";
import { GiftIcon, UserIcon } from "lucide-react";
import { GiftListSummary } from "@/types/gift-list-summary";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { useSharedGiftLists } from "@/hooks/use-shared-gift-lists";
import { useUser } from "@/context/user-context";

interface SidebarSharedListProps {
  giftLists: GiftListSummary[];
}

export function SidebarSharedList({ giftLists }: SidebarSharedListProps) {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const groupedInvitedLists = useSharedGiftLists(giftLists, user);

  const getDisplayName = (fullName: string) => {
    const words = fullName.split(" ");
    return words.length > 2 ? words.slice(0, 2).join(" ") : fullName;
  };

  return (
    <div>
      {Object.keys(groupedInvitedLists).map((owner) => (
        <div key={owner} className="mt-4">
          <div className="flex items-center font-medium text-muted-foreground">
            <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate" title={owner}>
              {getDisplayName(owner)}
            </span>
          </div>
          {groupedInvitedLists[owner].map((list) => (
            <Link
              key={list.id}
              href={`/gift-list/${list.id}`}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                list.id === currentListId ? "bg-muted text-foreground" : ""
              }`}
              prefetch={false}
            >
              <GiftIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate" title={list.name}>
                {list.name}
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
