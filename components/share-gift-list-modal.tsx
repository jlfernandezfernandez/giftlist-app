// components/dashboard/share-gift-list-modal.tsx
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { GiftList } from "@/types/gift-list";

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

  useEffect(() => {
    if (isOpen) {
      // Generar la URL de compartir
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/gift-list/${giftList.id}/shared`);
    }
  }, [isOpen, giftList.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-4">Share Gift List</h2>
        <p className="mb-4">
          Share this link with others to invite them to your gift list:
        </p>
        <div className="flex space-x-2">
          <Input value={shareUrl} readOnly className="flex-grow" />
          <Button onClick={handleCopyLink} variant="blue">
            Copy
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Anyone with this link can view and interact with your gift list.
        </p>
      </div>
    </Modal>
  );
};
