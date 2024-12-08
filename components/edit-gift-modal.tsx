// components/edit-gift-modal.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gift } from "@/types/gift";
import { Input } from "./ui/input";
import { PriceInput } from "./ui/price-input";
import { InputWithCounter } from "./ui/input-with-counter";

const MAX_DESCRIPTION_LENGTH = 50;

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
  const [currency, setCurrency] = useState(gift.currency || "EUR");

  useEffect(() => {
    setName(gift.name || "");
    setDescription(gift.description || "");
    setPrice(gift.price?.toString() || "");
    setCurrency(gift.currency || "EUR");
  }, [gift]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGift: Gift = {
      ...gift,
      name,
      description,
      price: parseFloat(price) || undefined,
      currency,
    };
    onSubmit(updatedGift);
    onClose();
  };

  const handlePriceChange = (newPrice: string, newCurrency: string) => {
    setPrice(newPrice);
    setCurrency(newCurrency);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 className="text-lg font-semibold mb-4">Edit Gift</h2>
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
              <InputWithCounter
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
                  )
                }
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <PriceInput
                value={price}
                currency={currency}
                onChange={handlePriceChange}
              />
            </div>
            <Button type="submit" variant="secondary" className="w-full mt-6">
              Update Gift
            </Button>
          </form>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-red-500">*</span> Required field
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
