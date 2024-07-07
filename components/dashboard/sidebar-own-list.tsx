// components/dashboard/SidebarOwnList.tsx
import Link from "next/link";
import { GiftIcon } from "lucide-react";
import { GiftList } from "@/types/gift-list";

interface SidebarOwnListProps {
  giftLists: GiftList[];
  currentListId: string | null;
  handleEditList: (listId: string) => void;
}

export function SidebarOwnList({
  giftLists,
  currentListId,
  handleEditList,
}: SidebarOwnListProps) {
  return (
    <div>
      {giftLists.map((list) => (
        <Link
          key={list.id}
          href="#"
          onClick={() => handleEditList(list.id)}
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
  );
}
