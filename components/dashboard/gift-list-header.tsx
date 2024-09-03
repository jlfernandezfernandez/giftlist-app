import { useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { Gift } from "@/types/gift";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
  UsersIcon,
  GiftIcon,
} from "lucide-react";

interface GiftListHeaderProps {
  currentList: GiftList;
  isOwner: boolean;
  handleEditList: () => void;
  handleShareList: () => void;
  handleDeleteList: () => void;
  gifts: Gift[];
}

export function GiftListHeader({
  currentList,
  isOwner,
  handleEditList,
  handleShareList,
  handleDeleteList,
  gifts,
}: GiftListHeaderProps) {
  const formattedDate = useMemo(() => {
    if (currentList.date) {
      return new Date(currentList.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return null;
  }, [currentList.date]);

  const members = useMemo(() => {
    return currentList.users.filter((user) => user.role !== "owner");
  }, [currentList.users]);

  const totalGifts = gifts.length;

  return (
    <div className="overflow-hidden">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {currentList.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {currentList.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
              {formattedDate && (
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{formattedDate}</span>
                </div>
              )}
              <div className="flex items-center mt-1 sm:mt-0">
                <UsersIcon className="w-4 h-4 mr-1" />
                <span>
                  {members.length} member{members.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center mt-1 sm:mt-0">
                <GiftIcon className="w-4 h-4 mr-1" />
                <span>
                  {totalGifts} gift{totalGifts !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
              <Button
                onClick={handleEditList}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleDeleteList}
                variant="destructive"
                className="w-full sm:w-auto"
              >
                <Trash2Icon className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={handleShareList}
                variant="default"
                className="w-full sm:w-auto"
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
