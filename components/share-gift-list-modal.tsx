// components/dashboard/share-gift-list-modal.tsx

import React, { useState, useEffect, useMemo } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { GiftList } from "@/types/gift-list";
import { Send, Share2 } from "lucide-react";

interface ShareGiftListModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftList: GiftList;
}

export const ShareGiftListModal: React.FC<ShareGiftListModalProps> = ({
  isOpen,
  onClose,
  giftList,
}) => {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const owners = useMemo(
    () => giftList.users.filter((user) => user.role === "owner"),
    [giftList.users]
  );

  const ownerNames = useMemo(() => {
    return owners.map((owner) => owner.name).join(" and ");
  }, [owners]);

  useEffect(() => {
    if (isOpen) {
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/gift-list/${giftList.id}/shared`);
    }
  }, [isOpen, giftList.id]);

  const getShareMessagePreview = () => {
    return `🎁 You're invited to join a gift list!

"${giftList.name}" by ${ownerNames}

Click here to join: ${shareUrl}`;
  };

  const getShareMessageForSharing = () => {
    return `🎁 You're invited to join a gift list!

"${giftList.name}" by ${ownerNames}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${ownerNames}'s Gift List`,
          text: getShareMessageForSharing(),
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for devices that don't support Web Share API
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareMessagePreview()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-4">Share Gift List</h2>
        <p className="mb-4">
          Share this message with others to invite them to your gift list:
        </p>
        <div className="bg-gray-100 p-3 rounded-md mb-4">
          <p className="text-sm whitespace-pre-line">
            {getShareMessagePreview()}
          </p>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleShare}
            variant="green"
            className="w-full flex items-center justify-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </div>
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="w-full mt-2"
        >
          {copied ? "Copied!" : "Copy Message"}
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Anyone with this link can view and interact with your gift list.
        </p>
      </div>
    </Modal>
  );
};
