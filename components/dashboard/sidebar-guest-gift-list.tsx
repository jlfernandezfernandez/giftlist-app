// components/dashboard/sidebar-guest-gift-list.tsx
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { UserIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { useSidebar } from "@/context/sidebar-context";
import { cn } from "@/lib/utils";

interface SidebarGuestGiftListProps {
  lists: GiftList[];
}

export function SidebarGuestGiftList({ lists }: SidebarGuestGiftListProps) {
  const currentListId = useCurrentGiftListId();
  const { closeSidebar } = useSidebar();
  const [expandedOwners, setExpandedOwners] = useState<Record<string, boolean>>(
    {}
  );

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

  const toggleOwnerExpansion = (ownerName: string) => {
    setExpandedOwners((prev) => ({ ...prev, [ownerName]: !prev[ownerName] }));
  };

  if (lists.length === 0) {
    return (
      <div className="text-sm lg:text-base text-muted-foreground">
        No gift lists available yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.entries(groupedLists).map(([ownerNames, ownerLists]) => (
        <div key={ownerNames} className="space-y-1">
          <button
            className="flex w-full items-center px-2 py-1 hover:bg-muted/50 rounded-md"
            onClick={() => toggleOwnerExpansion(ownerNames)}
          >
            <UserIcon className="h-4 w-4 mr-2" />
            <span className="truncate flex-1 text-left" title={ownerNames}>
              {ownerNames}
            </span>
            {expandedOwners[ownerNames] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {expandedOwners[ownerNames] && (
            <div className="pl-2 space-y-1">
              {ownerLists.map((list) => (
                <Link
                  key={list.id}
                  href={`/gift-list/${list.id}`}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
                    "hover:bg-muted",
                    list.id === currentListId
                      ? "bg-muted font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="truncate flex-1" title={list.name}>
                    {list.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
