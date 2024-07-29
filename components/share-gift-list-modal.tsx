// components/dashboard/share-gift-list-modal.tsx

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiftList } from "@/types/gift-list";
import { Send } from "lucide-react";

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

  useEffect(() => {
    if (isOpen) {
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/gift-list/${giftList.id}/shared`);
    }
  }, [isOpen, giftList.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `Check out this gift list: ${shareUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-4">Share Gift List</h2>
        <p className="mb-4">
          Share this link with others to invite them to your gift list:
        </p>
        <div className="flex space-x-2 mb-4">
          <Input value={shareUrl} readOnly className="flex-grow" />
          <Button onClick={handleCopyLink} variant="blue">
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Button
          onClick={handleShareWhatsApp}
          variant="green"
          className="w-full flex items-center justify-center gap-2 mt-4"
        >
          <Send className="h-5 w-5" />
          Share on WhatsApp
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Anyone with this link can view and interact with your gift list.
        </p>
      </div>
    </Modal>
  );
};
