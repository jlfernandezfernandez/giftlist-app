import React, { useState, useCallback } from "react";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { EditGiftModal } from "../edit-gift-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Pencil,
  Trash2,
  UserPlus,
  UserMinus,
  ExternalLink,
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

  const handleBuy = useCallback(() => {
    window.open(gift.link || "", "_blank");
  }, [gift.link]);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 bg-white">
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
              {gift.name}
            </h3>
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="text-xs font-medium px-1.5 py-0.5"
            >
              {gift.state}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium text-lg">{priceDisplay}</span>
            <span className="text-sm text-gray-500 truncate">
              {gift.website}
            </span>
          </div>
        </div>

        {gift.description && (
          <p className="text-sm text-gray-500">{gift.description}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-1">
            {gift.assignedUsers?.slice(0, 3).map((user) => (
              <InitialAvatar key={user.userId} name={user.name} />
            ))}
            {gift.assignedUsers && gift.assignedUsers.length > 3 && (
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                +{gift.assignedUsers.length - 3}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isOwner ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="rounded-full"
                >
                  <Pencil className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveGift}
                  className="rounded-full"
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Remove</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant={isAssigned ? "destructive" : "outline"}
                  onClick={isAssigned ? handleUnassignGift : handleAssignGift}
                  className="rounded-full"
                >
                  {isAssigned ? (
                    <UserMinus className="h-4 w-4 sm:mr-1" />
                  ) : (
                    <UserPlus className="h-4 w-4 sm:mr-1" />
                  )}
                  <span className="hidden sm:inline">
                    {isAssigned ? "Leave" : "Join"}
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="blue"
                  onClick={handleBuy}
                  disabled={gift.state !== "reserved"}
                  className="rounded-full"
                >
                  <ShoppingBag className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Buy</span>
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => window.open(gift.link || "", "_blank")}
              className="rounded-full"
            >
              <ExternalLink className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Open</span>
            </Button>
          </div>
        </div>
      </div>

      <EditGiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gift={gift}
        onSubmit={handleEditGift}
      />
    </Card>
  );
}
