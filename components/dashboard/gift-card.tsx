import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { EditGiftModal } from "../edit-gift-modal";
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

  return (
    <>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div>
          {/* Header */}
          <div className="border-b px-6 pt-6 pb-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UsersIcon className="h-4 w-4" aria-hidden="true" />
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
          <div className="px-6 py-4 space-y-2">
            <h3 className="font-medium text-lg line-clamp-1">{gift.name}</h3>
            <div className="h-10 overflow-hidden">
              <p className="text-sm text-gray-600 line-clamp-1">
                {gift.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div
                className="flex items-center truncate max-w-[50%] text-sm cursor-pointer"
                onClick={handleViewProduct}
              >
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
          <div className="px-6 pb-6 pt-4 border-t bg-gray-50 flex justify-end space-x-2">
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  onClick={handleRemoveGift}
                  className="text-red-600 hover:text-red-500"
                >
                  <Trash2Icon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
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
