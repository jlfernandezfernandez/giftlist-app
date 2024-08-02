// components/dashboard/sidebar-own-gift-list.tsx

import Link from "next/link";
import { GiftIcon } from "lucide-react";
import { GiftList } from "@/types/gift-list";
import { motion } from "framer-motion";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

interface OwnGiftListProps {
  list: GiftList;
  onClick: () => void;
}

export function OwnGiftList({ list, onClick }: OwnGiftListProps) {
  const currentListId = useCurrentGiftListId();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Link
        href={`/gift-list/${list.id}`}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
          list.id === currentListId ? "bg-muted text-foreground" : ""
        }`}
      >
        <GiftIcon className="h-4 w-4 flex-shrink-0" />
        <span className="truncate" title={list.name}>
          {list.name}
        </span>
      </Link>
    </motion.div>
  );
}
