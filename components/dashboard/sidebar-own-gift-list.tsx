// components/dashboard/sidebar-own-gift-list.tsx

import Link from "next/link";
import { GiftIcon, PlusIcon } from "lucide-react";
import { GiftList } from "@/types/gift-list";
import { motion } from "framer-motion";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";

interface OwnGiftListProps {
  lists: GiftList[];
  onListClick: (url: string) => void;
  onCreateNewList: () => void;
}

export function OwnGiftList({
  lists,
  onListClick,
  onCreateNewList,
}: OwnGiftListProps) {
  const currentListId = useCurrentGiftListId();

  return (
    <div>
      {lists.map((list) => (
        <motion.div
          key={list.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onListClick(`/gift-list/${list.id}`)}
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
      ))}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreateNewList}
        className="cursor-pointer flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-foreground"
      >
        <PlusIcon className="h-4 w-4 flex-shrink-0" />
        <span>Create New List</span>
      </motion.div>
    </div>
  );
}
