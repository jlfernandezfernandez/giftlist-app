// components/dashboard/add-gift-card.tsx
import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SmallSpinner from "../ui/small-spinner";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { AnimatedInput } from "../ui/animated-input";
import { PriceInput } from "../ui/price-input";

interface AddGiftCardProps {
  isAddingGift: boolean;
  handleAddGift: (
    url: string,
    details: string,
    name?: string,
    price?: number,
    currency?: string
  ) => Promise<void>;
  useExtendedForm?: boolean;
}

const MAX_DESCRIPTION_LENGTH = 50;

export function AddGiftCard({
  isAddingGift,
  handleAddGift,
  useExtendedForm = false,
}: AddGiftCardProps) {
  const [formData, setFormData] = useState({
    newGiftUrl: "",
    customDetails: "",
    giftName: "",
    price: undefined as number | undefined,
    currency: "EUR",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value: string, newCurrency: string) => {
    setFormData((prev) => ({
      ...prev,
      price: Number(value) || undefined,
      currency: newCurrency,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.newGiftUrl.trim()) {
        await handleAddGift(
          formData.newGiftUrl.trim(),
          formData.customDetails.trim(),
          formData.giftName.trim(),
          formData.price,
          formData.currency
        );
        setFormData({
          newGiftUrl: "",
          customDetails: "",
          giftName: "",
          price: undefined,
          currency: "EUR",
        });
      }
    },
    [formData, handleAddGift]
  );

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
    setFormData((prev) => ({ ...prev, customDetails: newValue }));
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {useExtendedForm && (
            <div>
              <label
                htmlFor="giftName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Gift Name
              </label>
              <Input
                id="giftName"
                name="giftName"
                value={formData.giftName}
                onChange={handleInputChange}
                placeholder="Enter gift name"
                className="w-full"
                disabled={isAddingGift}
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="giftUrl"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Gift URL
            </label>
            <Input
              id="giftUrl"
              name="newGiftUrl"
              value={formData.newGiftUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/gift"
              className="w-full"
              disabled={isAddingGift}
              required
              pattern="https?://.+"
              title="Please enter a valid URL"
            />
          </div>
          {useExtendedForm && (
            <div>
              <label
                htmlFor="giftPrice"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <PriceInput
                value={formData.price?.toString() ?? ""}
                currency={formData.currency}
                onChange={handlePriceChange}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="giftDetails"
              className="mb-1 flex items-center text-sm font-medium text-gray-700"
            >
              <span>Custom details</span>
              <span className="ml-2 text-xs font-normal text-gray-500 leading-none">
                (optional)
              </span>
            </label>
            <AnimatedInput
              id="giftDetails"
              name="customDetails"
              value={formData.customDetails}
              onChange={handleDetailsChange}
              placeholders={[
                "e.g. Size: XL",
                "e.g. Capacity: 128GB",
                "e.g. Color: Space Gray",
                "e.g. Volume: 100ml",
              ]}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isAddingGift}
              variant="secondary"
              className="w-full"
              aria-live="polite"
            >
              {isAddingGift ? (
                <SmallSpinner />
              ) : (
                <PlusIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              )}
              {isAddingGift ? "Adding..." : "Add Gift"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
