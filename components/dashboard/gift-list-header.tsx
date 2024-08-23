import React, { useCallback, useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { Button } from "@/components/ui/button";
import { PencilIcon, ShareIcon, Trash2Icon, UsersIcon } from "lucide-react";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { ExtraUsersAvatar } from "@/components/ui/extra-users-avatar";
import { Tooltip } from "@geist-ui/core";
import { getFirstName } from "@/lib/utils";
import { User } from "@/types/user";
import { Card } from "../ui/card";

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
    <Card className="p-6 overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              {currentList.name}
            </h1>
            <p className="text-base text-gray-500">{currentList.description}</p>
            <div className="text-sm text-gray-400">{formattedDate()}</div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <Button
                size="sm"
                onClick={handleEditList}
                variant="outline"
                className="text-blue-600 hover:text-blue-700"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                <span className="inline">Edit</span>
              </Button>
              <Button
                size="sm"
                onClick={handleShareList}
                variant="outline"
                className="rounded-full"
              >
                <ShareIcon className="h-4 w-4 mr-1" />
                <span className="inline">Share</span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDeleteList}
                className="rounded-full"
              >
                <Trash2Icon className="h-4 w-4 mr-1" />
                <span className="inline">Delete</span>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            {members.slice(0, 5).map((user: User) => (
              <Tooltip
                key={user.userId}
                text={getFirstName(user.name)}
                enterDelay={300}
                leaveDelay={50}
              >
                <InitialAvatar name={user.name} />
              </Tooltip>
            ))}
            {members.length > 5 && (
              <Tooltip text={`+${members.length - 5} more members`}>
                <ExtraUsersAvatar count={members.length - 5} />
              </Tooltip>
            )}
          </div>
          <span className="text-sm text-gray-500 flex items-center">
            <UsersIcon className="h-4 w-4 mr-1 text-gray-400" />
            {members.length} member{members.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Card>
  );
}
