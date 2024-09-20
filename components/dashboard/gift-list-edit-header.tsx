// components/dashboard/gift-list-edit-header.tsx
// Header component for editing a gift list, with a back button on the left and action buttons on the right

import { Button } from "@/components/ui/button";
import { ShareIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface GiftListEditHeaderProps {
  onShareList: () => void;
  onDeleteList: () => void;
  listId: string;
}

export function GiftListEditHeader({
  onShareList,
  onDeleteList,
  listId,
}: GiftListEditHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <Link href={`/gift-list/${listId}`}>
        <Button
          variant="ghost"
          className="text-sm font-medium w-full sm:w-auto"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>
      </Link>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button
          onClick={onShareList}
          variant="default"
          className="text-sm font-medium w-full"
        >
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          onClick={onDeleteList}
          variant="outline"
          className="text-sm font-medium w-full text-destructive hover:text-destructive/90 hover:bg-destructive/10"
        >
          <Trash2Icon className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </header>
  );
}
