import React, { useCallback, useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";


interface GiftListHeaderProps {
  currentList: GiftList;
  isOwner: boolean;
  handleEditList: () => void;
  handleShareList: () => void;
  handleDeleteList: () => void;
}

export function GiftListHeader({
  currentList,
  isOwner,
  handleEditList,
  handleShareList,
  handleDeleteList,
}: GiftListHeaderProps) {
  const formattedDate = useCallback(() => {
    if (currentList.date)
      return new Date(currentList.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  }, [currentList.date]);

  const members = useMemo(() => {
    return currentList.users.filter((user) => user.role !== "owner");
  }, [currentList.users]);

  return (
    <div className="overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {currentList.name}
            </h1>
            <p className="text-gray-600">{currentList.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{formattedDate()}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <UsersIcon className="w-4 h-4 mr-1" />
              <span>
                {members.length} member{members.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center space-x-6"></div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <Button size="sm" onClick={handleEditList} variant="outline">
                <PencilIcon className="h-4 w-4 mr-1" />
                <span className="inline">Edit</span>
              </Button>
              <Button
                size="sm"
                onClick={handleDeleteList}
                className="rounded-full"
              >
                <Trash2Icon className="h-4 w-4 mr-1" />
                <span className="inline">Delete</span>
              </Button>
              <Button
                size="sm"
                onClick={handleShareList}
                variant="black"
                className="rounded-full"
              >
                <ShareIcon className="h-4 w-4 mr-1" />
                <span className="inline">Share</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
