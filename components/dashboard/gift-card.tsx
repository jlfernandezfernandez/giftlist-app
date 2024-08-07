import React, { useState } from "react";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { InitialAvatar } from "@/components/ui/initial-avatar";
import { EditGiftModal } from "../edit-gift-modal";
import { Badge } from "@/components/ui/badge";
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
  const [showProductPreview, setShowProductPreview] = useState(false);
  const isAssigned = gift.assignedUsers?.some(
    (assignedUser) => assignedUser.userId === authenticatedUser.uid
  );

  const priceDisplay =
    gift.price !== undefined && gift.currency
      ? `${currencySymbol(gift.currency)}${gift.price.toFixed(2)}`
      : "N/A";

  const handleBuy = () => {
    if (gift.state === "Reserved") {
      window.open(gift.link || "", "_blank");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {gift.name}
          </h3>
          <Badge
            variant={badgeVariant(gift.state || "default")}
            className="capitalize"
          >
            {gift.state}
          </Badge>
        </div>

        <div className="text-sm text-gray-500 flex items-center justify-between">
          <span>{gift.website}</span>
          <button
            onClick={() => setShowProductPreview(true)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <ExternalLink size={14} className="mr-1" />
            View Details
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {gift.assignedUsers?.slice(0, 3).map((user) => (
              <InitialAvatar key={user.userId} name={user.name} size="sm" />
            ))}
            {gift.assignedUsers && gift.assignedUsers.length > 3 && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-medium text-gray-500">
                +{gift.assignedUsers.length - 3}
              </div>
            )}
          </div>
          <span className="font-medium text-gray-900">{priceDisplay}</span>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-t border-gray-200">
        {isOwner ? (
          <>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Pencil size={16} className="mr-2" />
              Edit
            </button>
            <button
              onClick={handleRemoveGift}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={isAssigned ? handleUnassignGift : handleAssignGift}
              className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAssigned
                  ? "border-red-300 text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
                  : "border-green-300 text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
              }`}
            >
              {isAssigned ? (
                <>
                  <UserMinus size={16} className="mr-2" />
                  Leave
                </>
              ) : (
                <>
                  <UserPlus size={16} className="mr-2" />
                  Join
                </>
              )}
            </button>
            <button
              onClick={handleBuy}
              disabled={gift.state !== "reserved"}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                gift.state === "reserved"
                  ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={16} className="mr-2" />
              Buy
            </button>
          </>
        )}
      </div>

      {showProductPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">{gift.name}</h3>
            <p className="text-gray-600 mb-4">
              {gift.description || "No description available."}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{priceDisplay}</span>
              <button
                onClick={() => setShowProductPreview(false)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <EditGiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gift={gift}
        onSubmit={handleEditGift}
      />
    </div>
  );
}
