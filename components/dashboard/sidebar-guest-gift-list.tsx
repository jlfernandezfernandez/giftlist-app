// components/dashboard/sidebar-guest-gift-list.tsx
import React, { useMemo } from "react";
import Link from "next/link";
import { GiftIcon, UserIcon, ChevronRightIcon } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { useSidebar } from "@/context/sidebar-context";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="space-y-3">
      {Object.entries(groupedLists).map(([ownerNames, ownerLists]) => (
        <div key={ownerNames} className="space-y-1">
          <div className="flex items-center px-2 py-1 text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">
            <UserIcon className="h-4 w-4 mr-2" />
            <span className="truncate" title={ownerNames}>
              {ownerNames}
            </span>
          </div>
          <div className="pl-2">
            {ownerLists.map((list) => (
              <motion.div
                key={list.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleListClick(list.id)}
                className="cursor-pointer"
              >
                <Link
                  href={`/gift-list/${list.id}`}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    list.id === currentListId
                      ? "bg-gray-100 dark:bg-gray-800 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate flex-1" title={list.name}>
                    {list.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
