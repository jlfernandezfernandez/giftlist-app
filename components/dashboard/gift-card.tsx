// components/dashboard/gift-card.tsx

import { useCallback, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SmallSpinner from "../ui/small-spinner";

interface GiftCardProps {
  authenticatedUser: AuthenticatedUser;
  gift: Gift;
  isOwner: boolean;
  handleRemoveGift: () => void;
  handleEditGift: (updatedGift: Gift) => void;
  handleAssignGift: () => void;
  handleUnassignGift: () => void;
  handleMarkAsBought: (gift: Gift) => void;
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
}: GiftCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmBoughtModalOpen, setIsConfirmBoughtModalOpen] =
    useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const router = useRouter();

  const isAssigned = gift.assignedUsers?.some(
    (assignedUser) => assignedUser.userId === authenticatedUser.uid
  );

  const priceDisplay =
    gift.price !== undefined && gift.currency
      ? `${currencySymbol(gift.currency)}${gift.price.toFixed(2)}`
      : "N/A";

  const handleViewProduct = useCallback(() => {
    if (gift.link) {
      window.open(gift.link, "_blank", "noopener,noreferrer");
    }
  }, [gift.link]);

  const handleBuyClick = useCallback(() => {
    setIsConfirmBoughtModalOpen(true);
  }, []);

  const handleConfirmBought = useCallback(() => {
    handleMarkAsBought(gift);
    setIsConfirmBoughtModalOpen(false);
  }, [gift, handleMarkAsBought]);

  const handleAssignUnassign = useCallback(async () => {
    setIsAssigning(true);
    try {
      await (isAssigned ? handleUnassignGift() : handleAssignGift());
      router.refresh();
    } catch (error) {
      console.error("Error assigning/unassigning user:", error);
    } finally {
      setIsAssigning(false);
    }
  }, [isAssigned, handleAssignGift, handleUnassignGift, router]);

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg",
          "bg-gradient-to-br from-white to-gray-50 rounded-xl h-full flex flex-col",
          "border border-gray-200"
        )}
      >
        <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="capitalize px-2 py-1 text-xs font-semibold rounded-full shadow-sm"
            >
              {gift.state}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white rounded-full px-2 py-1 shadow-sm">
              <UsersIcon className="h-4 w-4" aria-hidden="true" />
              <span>{gift.assignedUsers?.length || 0}</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-1 mb-2">
              {gift.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
              {gift.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleViewProduct}
                className={cn(
                  "flex items-center truncate max-w-[60%] text-sm",
                  "text-blue-600 hover:text-blue-900 transition-colors duration-200"
                )}
              >
                <ExternalLinkIcon
                  className="h-4 w-4 mr-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{gift.website}</span>
              </button>
              <span className="font-bold text-xl sm:text-2xl text-gray-900">
                {priceDisplay}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2 mt-5">
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-24 justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-full text-sm"
                >
                  <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  onClick={handleRemoveGift}
                  className="w-24 justify-center text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-full text-sm"
                >
                  <Trash2Icon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={cn(
                    "w-24 justify-center transition-colors duration-200 rounded-full text-sm",
                    isAssigned
                      ? "text-red-600 hover:bg-red-50"
                      : "text-green-600 hover:bg-green-50"
                  )}
                  onClick={handleAssignUnassign}
                  disabled={isAssigning}
                >
                  {isAssigning ? (
                    <>
                      <SmallSpinner />
                    </>
                  ) : isAssigned ? (
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
                  onClick={handleBuyClick}
                  disabled={!isAssigned || gift.state === "bought"}
                  className={cn(
                    "w-24 justify-center bg-blue-600 hover:bg-blue-700 transition-colors duration-200",
                    "disabled:bg-gray-300 disabled:text-gray-500 rounded-full"
                  )}
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

      {isEditModalOpen && (
        <EditGiftModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          gift={gift}
          onSubmit={handleEditGift}
        />
      )}

      {isConfirmBoughtModalOpen && (
        <ConfirmBoughtModal
          isOpen={isConfirmBoughtModalOpen}
          onClose={() => setIsConfirmBoughtModalOpen(false)}
          onConfirm={handleConfirmBought}
          giftName={gift.name || ""}
          giftLink={gift.link}
        />
      )}
    </>
  );
}
