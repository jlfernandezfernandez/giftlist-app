// components/dashboard/sidebar-own-gift-list.tsx
import React from "react";
import Link from "next/link";
import { ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OwnGiftListProps {
  lists: GiftList[];
}

export function OwnGiftList({ lists }: OwnGiftListProps) {
  const currentListId = useCurrentGiftListId();

  return (
    <div className="space-y-3">
      {lists.length === 0 ? (
        <Link href="/gift-list/new">
          <Button className="w-full justify-start" variant="outline">
            <ListPlus className="mr-2 h-4 w-4" />
            Create your first list
          </Button>
        </Link>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">My Lists</h3>
            <Link href="/gift-list/new">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                title="Create new list"
              >
                <ListPlus className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          {lists.map((list) => (
            <motion.div
              key={list.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
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
        </>
      )}
    </div>
  );
}
