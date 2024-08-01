// components/dashboard/gift-list-header.tsx

import { useCallback } from "react";
import { GiftList } from "@/types/gift-list";
import { Button } from "@/components/ui/button";
import { FilePenIcon, ShareIcon, Trash2Icon, UsersIcon } from "lucide-react";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { ExtraUsersAvatar } from "@/components/ui/extra-users-avatar";
import { Tooltip } from "@geist-ui/core";
import { getFirstName } from "@/lib/utils";

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
      return new Date(currentList.date).toLocaleDateString();
  }, [currentList.date]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{currentList.name}</h1>
          <p className="text-gray-500 mt-1">{currentList.description}</p>
          <div className="text-sm text-gray-400 mt-1">{formattedDate()}</div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button
            size="sm"
            onClick={handleEditList}
            variant="outline"
            className="flex items-center"
          >
            <FilePenIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            onClick={handleShareList}
            variant="outline"
            className="flex items-center"
          >
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDeleteList}
            className="flex items-center"
          >
            <Trash2Icon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <UsersIcon className="h-5 w-5 text-gray-400" />
        <div className="flex items-center space-x-1">
          {currentList.users.slice(0, 5).map((user) => (
            <Tooltip key={user.userId} text={getFirstName(user.name)}>
              <InitialAvatar name={user.name} />
            </Tooltip>
          ))}
          {currentList.users.length > 5 && (
            <Tooltip text={`+${currentList.users.length - 5} more users`}>
              <ExtraUsersAvatar count={currentList.users.length - 5} />
            </Tooltip>
          )}
        </div>
        <span className="text-sm text-gray-500">
          {currentList.users.length} member
          {currentList.users.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
