import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, useMediaQuery } from "@geist-ui/core";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { ExtraUsersAvatar } from "../ui/extra-users-avatar";
import { EditGiftModal } from "../edit-gift-modal";
import { getFirstName } from "@/lib/utils";
import {
  Trash2Icon,
  PencilIcon,
  UserPlusIcon,
  UserMinusIcon,
  ShoppingCartIcon,
  InfoIcon,
  ExternalLinkIcon,
  UsersIcon,
} from "lucide-react";

interface GiftCardProps {
  authenticatedUser: AuthenticatedUser;
  gift: Gift;
  isOwner: boolean;
  handleRemoveGift: () => void;
  handleEditGift: (updatedGift: Gift) => void;
  handleAssignGift: () => void;
  handleUnassignGift: () => void;
}

export function GiftCard({
  authenticatedUser,
  gift,
  isOwner,
  handleRemoveGift,
  handleEditGift,
  handleAssignGift,
  handleUnassignGift,
}: GiftCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isAssigned = gift.assignedUsers?.some(
    (assignedUser) => assignedUser.userId === authenticatedUser.uid
  );

  const priceDisplay =
    gift.price !== undefined && gift.currency
      ? `${currencySymbol(gift.currency)}${gift.price.toFixed(2)}`
      : "N/A";

  const handleViewProduct = useCallback(() => {
    window.open(gift.link || "", "_blank");
  }, [gift.link]);

  const isLG = useMediaQuery("lg");

  return (
    <>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {/* Mobile layout */}
        <div className="lg:hidden">
          {/* Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UsersIcon className="h-5 w-5" aria-hidden="true" />
              <span>{gift.assignedUsers?.length || 0} assigned</span>
            </div>
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="capitalize"
            >
              {gift.state}
            </Badge>
          </div>
          {/* Body */}
          <div className="p-4 space-y-2">
            <h3 className="font-medium text-lg line-clamp-1">{gift.name}</h3>
            <div className="h-10 overflow-hidden">
              <p className="text-sm text-gray-600 line-clamp-1">
                {gift.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center truncate max-w-[50%] text-sm">
                <ExternalLinkIcon
                  className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-600 truncate">{gift.website}</span>
              </div>
              <span className="font-semibold text-xl text-green-600">
                {priceDisplay}
              </span>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t bg-gray-50 p-4 flex justify-end space-x-2">
            {isOwner ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveGift}
                >
                  <Trash2Icon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant={isAssigned ? "destructive" : "outline"}
                  onClick={isAssigned ? handleUnassignGift : handleAssignGift}
                >
                  {isAssigned ? (
                    <>
                      <UserMinusIcon
                        className="h-4 w-4 mr-1"
                        aria-hidden="true"
                      />
                      Leave
                    </>
                  ) : (
                    <>
                      <UserPlusIcon
                        className="h-4 w-4 mr-1"
                        aria-hidden="true"
                      />
                      Join
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleViewProduct}
                  disabled={!isAssigned}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ShoppingCartIcon
                    className="h-4 w-4 mr-1"
                    aria-hidden="true"
                  />
                  Buy
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block p-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 flex items-center space-x-2">
              <Link
                href={gift.link || "#"}
                target="_blank"
                className="font-medium hover:underline text-lg truncate flex-grow"
                prefetch={false}
              >
                {gift.name}
              </Link>
              {gift.description && (
                <Tooltip
                  text={gift.description}
                  placement="top"
                  leaveDelay={50}
                  type="dark"
                >
                  <InfoIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Tooltip>
              )}
            </div>

            <div className="col-span-3 flex items-center justify-between">
              <span className="font-semibold text-xl text-green-600">
                {priceDisplay}
              </span>
              <span className="truncate max-w-[40%] text-gray-600 text-sm">
                {gift.website}
              </span>
              <div className="w-24 flex justify-center">
                <Badge
                  variant={badgeVariant(gift.state || "default")}
                  className="capitalize"
                >
                  {gift.state}
                </Badge>
              </div>
            </div>

            <div className="col-span-5 flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {gift.assignedUsers?.slice(0, 5).map((user) => (
                  <Tooltip
                    text={getFirstName(user.name)}
                    key={user.userId}
                    enterDelay={300}
                    leaveDelay={50}
                  >
                    <InitialAvatar name={user.name} />
                  </Tooltip>
                ))}
                {gift.assignedUsers && gift.assignedUsers.length > 5 && (
                  <Tooltip
                    text={`+${gift.assignedUsers.length - 5} more users`}
                  >
                    <ExtraUsersAvatar count={gift.assignedUsers.length - 5} />
                  </Tooltip>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {isOwner ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditModalOpen(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleRemoveGift}
                    >
                      <Trash2Icon className="h-4 w-4 mr-1" aria-hidden="true" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant={isAssigned ? "destructive" : "outline"}
                      onClick={
                        isAssigned ? handleUnassignGift : handleAssignGift
                      }
                    >
                      {isAssigned ? (
                        <>
                          <UserMinusIcon
                            className="h-4 w-4 mr-1"
                            aria-hidden="true"
                          />
                          Leave
                        </>
                      ) : (
                        <>
                          <UserPlusIcon
                            className="h-4 w-4 mr-1"
                            aria-hidden="true"
                          />
                          Join
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleViewProduct}
                      disabled={!isAssigned}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ShoppingCartIcon
                        className="h-4 w-4 mr-1"
                        aria-hidden="true"
                      />
                      Buy
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <EditGiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gift={gift}
        onSubmit={handleEditGift}
      />
    </>
  );
}
