// components/dashboard/sidebar-guest-gift-list.tsx

import React, { useMemo } from "react";
import Link from "next/link";
import { GiftIcon, UserIcon } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { useSidebar } from "@/context/sidebar-context";

interface GuestGiftListProps {
  lists: GiftList[];
  onListClick: (url: string) => void;
}

export function GuestGiftList({ lists, onListClick }: GuestGiftListProps) {
  const currentListId = useCurrentGiftListId();
  const { closeSidebar } = useSidebar();

  const formatOwnerNames = (owners: { name: string }[]) => {
    if (owners.length === 0) return "";

    const formattedNames = owners.map((owner) => {
      const nameParts = owner.name.split(" ");
      return owners.length === 1
        ? `${nameParts[0]} ${nameParts[1] || ""}`.trim()
        : nameParts[0];
    });

    if (formattedNames.length === 1) return formattedNames[0];
    if (formattedNames.length === 2) return formattedNames.join(" & ");

    return (
      formattedNames.slice(0, -1).join(", ") +
      " and " +
      formattedNames.slice(-1)
    );
  };

  const groupedLists = useMemo(() => {
    return lists.reduce((acc, list) => {
      const owners = list.users.filter((user) => user.role === "owner");
      const ownerNames = formatOwnerNames(owners);
      if (!acc[ownerNames]) {
        acc[ownerNames] = [];
      }
      acc[ownerNames].push(list);
      return acc;
    }, {} as Record<string, GiftList[]>);
  }, [lists]);

  const handleListClick = (listId: string) => {
    onListClick(`/gift-list/${listId}`);
    closeSidebar();
  };

  return (
    <>
      {Object.entries(groupedLists).map(([ownerNames, ownerLists]) => (
        <div key={ownerNames} className="mb-4">
          <div className="flex items-center font-medium text-muted-foreground mb-2">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate" title={ownerNames}>
                {ownerNames}
              </span>
            </div>
          </div>
          {ownerLists.map((list) => (
            <Link
              key={list.id}
              href={`/gift-list/${list.id}`}
              onClick={() => handleListClick(list.id)}
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
      ))}
    </>
  );
}
