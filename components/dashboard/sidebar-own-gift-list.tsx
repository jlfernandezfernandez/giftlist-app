// components/dashboard/sidebar-own-gift-list.tsx

import Link from "next/link";
import { PlusIcon, ChevronRightIcon } from "lucide-react";
import { GiftList } from "@/types/gift-list";
import { motion } from "framer-motion";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-1">
      {lists.map((list) => (
        <motion.div
          key={list.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onListClick(`/gift-list/${list.id}`)}
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
            <span className="truncate" title={list.name}>
              {list.name}
            </span>
          </Link>
        </motion.div>
      ))}

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="cursor-pointer mt-2"
      >
        <Button
          onClick={onCreateNewList}
          variant="black"
          className="w-full justify-start text-sm lg:text-base"
          aria-live="polite"
        >
          <PlusIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          Create New List
        </Button>
      </motion.div>
    </div>
  );
}
