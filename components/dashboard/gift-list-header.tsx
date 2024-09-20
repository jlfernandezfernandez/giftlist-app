import { useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { Gift } from "@/types/gift";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
  UsersIcon,
  HeartIcon,
} from "lucide-react";
import { formatDate, formatOwnerNames } from "@/lib/utils";

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
  const formattedDate = useMemo(
    () => formatDate(currentList.date),
    [currentList.date]
  );

  const { members, owners } = useMemo(
    () => ({
      members: currentList.users.filter((user) => user.role !== "owner"),
      owners: currentList.users.filter((user) => user.role === "owner"),
    }),
    [currentList.users]
  );

  const formattedOwnerNames = useMemo(() => formatOwnerNames(owners), [owners]);

  return (
    <div className="overflow-hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {currentList.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {currentList.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {formattedDate && (
              <Badge variant="secondary" className="flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {formattedDate}
              </Badge>
            )}
            <Badge variant="secondary" className="flex items-center">
              <HeartIcon className="w-3 h-3 mr-1" />
              {formattedOwnerNames}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <UsersIcon className="w-3 h-3 mr-1" />
              {members.length} member{members.length !== 1 ? "s" : ""}
            </Badge>
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
  );
}
