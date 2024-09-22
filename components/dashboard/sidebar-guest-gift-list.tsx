// components/dashboard/sidebar-guest-gift-list.tsx
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { UserIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { useSidebar } from "@/context/sidebar-context";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GuestGiftListProps {
  lists: GiftList[];
}

export function GuestGiftList({ lists }: GuestGiftListProps) {
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
          <motion.div
            className="flex items-center px-2 py-1 text-sm lg:text-base font-medium text-gray-700 cursor-pointer"
            onClick={() => toggleOwnerExpansion(ownerNames)}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.98 }}
          >
            <UserIcon className="h-4 w-4 mr-2" />
            <span className="truncate flex-1" title={ownerNames}>
              {ownerNames}
            </span>
            {expandedOwners[ownerNames] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </motion.div>
          {expandedOwners[ownerNames] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-2"
            >
              {ownerLists.map((list) => (
                <motion.div
                  key={list.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => closeSidebar()}
                  className="cursor-pointer"
                >
                  <Link
                    href={`/gift-list/${list.id}`}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
                      "hover:bg-gray-100",
                      list.id === currentListId
                        ? "bg-gray-100 font-medium"
                        : "text-gray-700"
                    )}
                  >
                    <span className="truncate flex-1" title={list.name}>
                      {list.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
