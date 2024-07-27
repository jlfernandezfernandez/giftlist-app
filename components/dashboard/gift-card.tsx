// components/dashboard/gift-card.tsx

import { useCallback, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, useMediaQuery } from "@geist-ui/core";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import {
  TrashIcon,
  FilePenIcon,
  UserPlusIcon,
  UserMinusIcon,
  ShoppingCartIcon,
  InfoIcon,
} from "@/components/icons";
import { EditGiftModal } from "../edit-gift-modal";

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

  const isSM = useMediaQuery("sm");

  return (
    <>
      <Card className="p-3 sm:p-4 hover:shadow-sm transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:w-3/4 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center justify-between sm:w-1/3">
              <Link
                href={gift.link || "#"}
                target="_blank"
                className="font-medium hover:underline text-sm sm:text-base truncate"
                prefetch={false}
              >
                {gift.name}
              </Link>
              {gift.description && (
                <Tooltip
                  text={gift.description}
                  placement={isSM ? "top" : "left"}
                >
                  <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                </Tooltip>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:w-2/3 text-xs sm:text-sm space-x-2">
              <span>{priceDisplay}</span>
              <span className="truncate max-w-[40%]">{gift.website}</span>
              <Badge variant={badgeVariant(gift.state || "default")}>
                {gift.state}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between sm:w-1/4 sm:justify-end space-x-2 space-y-1">
            <div className="flex items-center space-x-1">
              {gift.assignedUsers?.map((user) => (
                <Tooltip key={user.userId} text={user.name}>
                  <InitialAvatar name={user.name} />
                </Tooltip>
              ))}
            </div>

            <div className="flex items-center space-x-1">
              {isOwner ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditModalOpen(true)}
                    title="Edit Gift"
                  >
                    <FilePenIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleRemoveGift}
                    title="Delete Gift"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isAssigned ? handleUnassignGift : handleAssignGift}
                    title={isAssigned ? "Unassign Gift" : "Assign Gift"}
                  >
                    {isAssigned ? (
                      <UserMinusIcon className="h-4 w-4" />
                    ) : (
                      <UserPlusIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleViewProduct}
                    title="View Product"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                  </Button>
                </>
              )}
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
