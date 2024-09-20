import { useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface GiftListHeaderProps {
  currentList: GiftList;
  isOwner: boolean;
  handleShareList: () => void;
  handleDeleteList: () => void;
}

export function GiftListHeader({
  currentList,
  isOwner,
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

  return (
    <div className="space-y-6 border-gray-200 pb-4 lg:pb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight break-words">
            {currentList.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {currentList.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {owners.map((owner) => (
              <Badge
                key={owner.userId}
                variant="outline"
                className="flex items-center px-3 py-1 text-xs sm:text-sm"
              >
                {owner.name}
              </Badge>
            ))}
            {formattedDate && (
              <Badge
                variant="outline"
                className="flex items-center px-3 py-1 text-xs sm:text-sm"
              >
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {formattedDate}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="flex items-center px-3 py-1 text-xs sm:text-sm"
            >
              <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {members.length} member{members.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </div>
        {isOwner && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mt-6 lg:mt-0">
            <Link href={`/gift-list/${currentList.id}/edit`} passHref>
              <Button variant="outline" className="text-sm font-medium">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              onClick={handleShareList}
              variant="default"
              className="text-sm font-medium"
            >
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDeleteList}
              variant="outline"
              className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2Icon className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
