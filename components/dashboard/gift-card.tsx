// components/dashboard/gift-card.tsx

import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { EditGiftModal } from "../edit-gift-modal";
import { ConfirmBoughtModal } from "../confirm-bought-modal";
import {
  Trash2Icon,
  PencilIcon,
  UserPlusIcon,
  UserMinusIcon,
  ShoppingCartIcon,
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
  handleMarkAsBought: (gift: Gift) => void;
  isMarkingAsBought: boolean;
}

export function GiftCard({
  authenticatedUser,
  gift,
  isOwner,
  handleRemoveGift,
  handleEditGift,
  handleAssignGift,
  handleUnassignGift,
  handleMarkAsBought,
  isMarkingAsBought,
}: GiftCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmBoughtModalOpen, setIsConfirmBoughtModalOpen] =
    useState(false);
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

  const handleBuyClick = useCallback(() => {
    setIsConfirmBoughtModalOpen(true);
  }, []);

  const handleConfirmBought = useCallback(() => {
    handleMarkAsBought(gift);
    setIsConfirmBoughtModalOpen(false);
  }, [gift, handleMarkAsBought]);

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50 rounded-2xl h-[240px] sm:h-[250px] md:h-[320px] flex flex-col border border-gray-200">
        <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="capitalize px-2 sm:px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
            >
              {gift.state}
            </Badge>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 bg-white rounded-full px-2 sm:px-3 py-1 shadow-sm">
              <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{gift.assignedUsers?.length || 0}</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 line-clamp-1 mb-1 sm:mb-2">
              {gift.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-4 h-8 sm:h-10">
              {gift.description}
            </p>
            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <div
                className="flex items-center truncate max-w-[60%] text-xs sm:text-sm cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
                onClick={handleViewProduct}
              >
                <ExternalLinkIcon
                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{gift.website}</span>
              </div>
              <span className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">
                {priceDisplay}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2">
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-full text-xs sm:text-sm"
                >
                  <PencilIcon
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                    aria-hidden="true"
                  />
                  Edit
                </Button>
                <Button
                  onClick={handleRemoveGift}
                  className="text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-full text-xs sm:text-sm"
                >
                  <Trash2Icon
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                    aria-hidden="true"
                  />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={`transition-colors duration-200 rounded-full text-xs sm:text-sm ${
                    isAssigned
                      ? "text-red-600 hover:bg-red-50"
                      : "text-green-600 hover:bg-green-50"
                  }`}
                  onClick={isAssigned ? handleUnassignGift : handleAssignGift}
                >
                  {isAssigned ? (
                    <>
                      <UserMinusIcon
                        className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
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
                  onClick={handleBuyClick}
                  disabled={
                    !isAssigned || isMarkingAsBought || gift.state === "bought"
                  }
                  className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:text-gray-500 rounded-full"
                >
                  <ShoppingCartIcon
                    className="h-4 w-4 mr-1"
                    aria-hidden="true"
                  />
                  {isMarkingAsBought ? "Updating..." : "Buy"}
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
      <ConfirmBoughtModal
        isOpen={isConfirmBoughtModalOpen}
        onClose={() => setIsConfirmBoughtModalOpen(false)}
        onConfirm={handleConfirmBought}
        giftName={gift.name || ""}
        giftLink={gift.link}
      />
    </>
  );
}
