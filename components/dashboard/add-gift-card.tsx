// components/dashboard/add-gift-card.tsx
import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SmallSpinner from "../ui/small-spinner";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { AnimatedInput } from "../ui/animated-input";

interface AddGiftCardProps {
  isAddingGift: boolean;
  handleAddGift: (url: string, details: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 30;

const DETAILS_PLACEHOLDERS = [
  "Size: XL",
  "Capacity: 128GB, Color: Space Gray",
  "Edition: Collector's, Language: Spanish",
  "Volume: 100ml",
];

export function AddGiftCard({ isAddingGift, handleAddGift }: AddGiftCardProps) {
  const [newGiftUrl, setNewGiftUrl] = useState<string>("");
  const [customDetails, setCustomDetails] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newGiftUrl.trim()) {
        await handleAddGift(newGiftUrl.trim(), customDetails.trim());
        setNewGiftUrl("");
        setCustomDetails("");
      }
    },
    [newGiftUrl, customDetails, handleAddGift]
  );

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
    setCustomDetails(newValue);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="giftUrl" className="block mb-1">
              Gift URL
            </label>
            <Input
              id="giftUrl"
              value={newGiftUrl}
              onChange={(e) => setNewGiftUrl(e.target.value)}
              placeholder="https://example.com/gift"
              className="w-full"
              disabled={isAddingGift}
              required
            />
          </div>
          <div>
            <label htmlFor="giftDetails" className="mb-1 flex items-center">
              <span>Custom details</span>
              <span className="ml-2 text-xs font-normal text-gray-500 leading-none">
                (optional)
              </span>
            </label>
            <div className="relative">
              <AnimatedInput
                id="giftDetails"
                value={customDetails}
                onChange={handleDetailsChange}
                placeholders={DETAILS_PLACEHOLDERS}
                className="w-full"
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                {customDetails.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isAddingGift}
            variant="black"
            className="w-full"
          >
            {isAddingGift ? (
              <SmallSpinner />
            ) : (
              <PlusIcon className="h-4 w-4 mr-2" />
            )}
            {isAddingGift ? "Adding..." : "Add Gift"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
