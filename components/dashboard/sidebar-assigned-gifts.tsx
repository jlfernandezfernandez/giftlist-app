// components/dashboard/sidebar-assigned-gifts.tsx
import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/sidebar-context";
import { useUser } from "@/context/user-context";
import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { motion } from "framer-motion";
import { GiftIcon } from "lucide-react";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

export function AssignedGifts() {
  const { closeSidebar } = useSidebar();
  const { user } = useUser();
  const { assignedGifts, isLoading, isError } = useAssignedGifts(
    user?.uid || ""
  );
  const currentListId = useCurrentGiftListId();

  if (!user || isLoading) return null;
  if (isError)
    return (
      <div className="text-sm text-red-500">Error loading assigned gifts</div>
    );

  if (assignedGifts.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No assigned gifts</div>
    );
  }

  const handleGiftClick = () => {
    closeSidebar();
  };

  return (
    <div className="space-y-1 mt-2">
      {assignedGifts.map((gift) => (
        <motion.div
          key={gift.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGiftClick}
          className="cursor-pointer"
        >
          <Link
            href={`/gift-list/${gift.giftListId}#${gift.id}`}
            className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
              gift.giftListId === currentListId
                ? "bg-muted text-foreground"
                : ""
            }`}
          >
            <GiftIcon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate" title={gift.name}>
              {gift.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
