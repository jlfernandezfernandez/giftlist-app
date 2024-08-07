import React, { useState } from "react";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { EditGiftModal } from "../edit-gift-modal";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  ChevronRight,
  Pencil,
  Trash2,
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

  const handleBuy = () => {
    if (gift.state === "reserved") {
      window.open(gift.link || "", "_blank");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{gift.name}</h3>
          <Badge
            variant={badgeVariant(gift.state || "default")}
            className="lowercase"
          >
            {gift.state}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{gift.website}</span>
          <span className="font-medium">{priceDisplay}</span>
        </div>

        <div className="flex items-center justify-between">
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
          <button
            onClick={() => window.open(gift.link || "", "_blank")}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
          >
            View
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        {gift.description && (
          <div>
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="text-sm text-gray-500 flex items-center"
            >
              {showDescription ? (
                <ChevronUp size={16} className="mr-1" />
              ) : (
                <ChevronDown size={16} className="mr-1" />
              )}
              {showDescription ? "Hide details" : "Show details"}
            </button>
            {showDescription && (
              <p className="mt-2 text-sm text-gray-600">{gift.description}</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-200">
        {isOwner ? (
          <>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            >
              <Pencil size={16} className="mr-1" />
              Edit
            </button>
            <button
              onClick={handleRemoveGift}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Remove
            </button>
          </>
        ) : (
          <>
            <button
              onClick={isAssigned ? handleUnassignGift : handleAssignGift}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                isAssigned
                  ? "text-red-600 hover:text-red-800"
                  : "text-green-600 hover:text-green-800"
              }`}
            >
              {isAssigned ? "Leave" : "Join"}
            </button>
            <button
              onClick={handleBuy}
              disabled={gift.state !== "reserved"}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                gift.state === "reserved"
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={16} className="mr-2" />
              Buy
            </button>
          </>
        )}
      </div>

      <EditGiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gift={gift}
        onSubmit={handleEditGift}
      />
    </div>
  );
}
