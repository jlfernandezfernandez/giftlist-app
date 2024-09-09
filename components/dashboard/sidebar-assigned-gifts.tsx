// components/dashboard/sidebar-assigned-gifts.tsx
import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/sidebar-context";
import { useUser } from "@/context/user-context";
import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AssignedGifts() {
  const { closeSidebar } = useSidebar();
  const { user } = useUser();
  const { assignedGifts, isLoading, isError } = useAssignedGifts(
    user?.uid || ""
  );

  if (!user || isLoading) return null;
  if (isError)
    return (
      <div className="text-sm lg:text-base text-red-500">
        Error loading assigned gifts
      </div>
    );

  if (assignedGifts.length === 0) {
    return (
      <div className="text-sm lg:text-base text-muted-foreground">
        No assigned gifts
      </div>
    );
  }

  const handleGiftClick = () => {
    closeSidebar();
  };

  return (
    <div className="space-y-1">
      {assignedGifts.map((gift) => (
        <motion.div
          key={gift.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleGiftClick}
          className="cursor-pointer"
        >
          <Link
            href={`/gift-list/${gift.giftListId}#${gift.id}`}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
              "hover:bg-gray-100 ",
              "text-gray-700 "
            )}
          >
            <span className="truncate" title={gift.name}>
              {gift.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
