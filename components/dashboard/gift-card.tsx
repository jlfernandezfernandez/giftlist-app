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
  ChevronDown,
  ChevronUp,
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
  const [showDescription, setShowDescription] = useState(false);
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

  const truncatedDescription =
    gift.description && gift.description.length > 30
      ? `${gift.description.substring(0, 30)}...`
      : gift.description;

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="p-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
        <div className="sm:col-span-4 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {gift.name}
            </h3>
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="lowercase sm:hidden"
            >
              {gift.state}
            </Badge>
          </div>
          {truncatedDescription && (
            <p className="text-sm text-gray-500 line-clamp-1">
              {truncatedDescription}
            </p>
          )}
        </div>

        <div className="sm:col-span-3 grid grid-cols-3 items-center text-sm">
          <span className="font-medium">{priceDisplay}</span>
          <span className="text-gray-500 truncate justify-self-center">
            {gift.website}
          </span>
          <Badge
            variant={badgeVariant(gift.state || "default")}
            className="lowercase hidden sm:inline-flex justify-self-end"
          >
            {gift.state}
          </Badge>
        </div>

        <div className="sm:col-span-5 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {gift.assignedUsers?.slice(0, 3).map((user) => (
              <InitialAvatar key={user.userId} name={user.name} />
            ))}
            {gift.assignedUsers && gift.assignedUsers.length > 3 && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-medium text-gray-500">
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
                >
                  <Pencil className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveGift}
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
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {gift.description && gift.description.length > 30 && (
        <div className="px-4 pb-3">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="text-sm text-gray-500 flex items-center"
          >
            {showDescription ? (
              <ChevronUp size={16} className="mr-1" />
            ) : (
              <ChevronDown size={16} className="mr-1" />
            )}
            {showDescription
              ? "Hide full description"
              : "Show full description"}
          </button>
          {showDescription && (
            <p className="mt-2 text-sm text-gray-600">{gift.description}</p>
          )}
        </div>
      )}

      <EditGiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gift={gift}
        onSubmit={handleEditGift}
      />
    </Card>
  );
}
