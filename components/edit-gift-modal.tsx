// components/dashboard/edit-gift-modal.tsx
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gift } from "@/types/gift";
import { currencySymbol } from "@/lib/gift-utils";
import { Input } from "./ui/input";

const MAX_DESCRIPTION_LENGTH = 30;

interface EditGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: Gift;
  onSubmit: (updatedGift: Gift) => void;
}

export const EditGiftModal: React.FC<EditGiftModalProps> = ({
  isOpen,
  onClose,
  gift,
  onSubmit,
}) => {
  const [name, setName] = useState(gift.name || "");
  const [description, setDescription] = useState(gift.description || "");
  const [price, setPrice] = useState(gift.price?.toString() || "");

  useEffect(() => {
    setName(gift.name || "");
    setDescription(gift.description || "");
    setPrice(gift.price?.toString() || "");
  }, [gift]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGift: Gift = {
      ...gift,
      name,
      description,
      price: parseFloat(price) || undefined,
    };
    onSubmit(updatedGift);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-left">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Details</Label>
            <div className="relative">
              <Input
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
                  )
                }
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              labelRight={currencySymbol(gift.currency || "EUR")}
              step="0.01"
            />
          </div>
          <Button type="submit" variant="blue" className="w-full mt-6">
            Update Gift
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-2">
          <span className="text-red-500">*</span> Required field
        </p>
      </div>
    </Modal>
  );
};
