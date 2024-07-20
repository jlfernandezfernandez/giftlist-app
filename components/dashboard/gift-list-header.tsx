// components/dashboard/gift-list-header.tsx

import { useCallback } from "react";
import { GiftList } from "@/types/gift-list";
import { Button } from "@/components/ui/button";
import { FilePenIcon, ShareIcon } from "../icons";

interface GiftListHeaderProps {
  currentList: GiftList;
  isOwner: boolean;
  handleEditList: () => void;
  handleShareList: () => void;
}

export function GiftListHeader({
  currentList,
  isOwner,
  handleEditList,
  handleShareList,
}: GiftListHeaderProps) {
  const formattedDate = useCallback(() => {
    return new Date(currentList.date).toLocaleDateString();
  }, [currentList.date]);

  return (
    <div className="p-4 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">{currentList.name}</h1>
          <p className="text-gray-500 mt-1">{currentList.description}</p>
          <div className="text-sm text-gray-400 mt-1">{formattedDate()}</div>
        </div>
        {isOwner && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleEditList}
              className="flex items-center transition-colors duration-200 hover:bg-gray-100"
            >
              <FilePenIcon className="h-4 w-4 mr-2" />
              Edit List
            </Button>
            <Button
              onClick={handleShareList}
              className="flex items-center transition-colors duration-200 hover:bg-gray-100"
            >
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
