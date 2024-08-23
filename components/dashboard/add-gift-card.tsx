// components/dashboard/add-gift-card.tsx
import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AICircleIcon } from "../icons";
import SmallSpinner from "../ui/small-spinner";
import { AnimatedInput } from "../ui/animated-input";
import { Input } from "../ui/input";

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
  const [showCustomDetails, setShowCustomDetails] = useState<boolean>(false);

  const handleAddGiftClick = useCallback(async () => {
    await handleAddGift(newGiftUrl, customDetails);
    setNewGiftUrl("");
    setCustomDetails("");
    setShowCustomDetails(false);
  }, [newGiftUrl, customDetails, handleAddGift]);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
    setCustomDetails(newValue);
  };

  const toggleCustomDetails = useCallback(() => {
    setShowCustomDetails((prev) => !prev);
    if (showCustomDetails) {
      setCustomDetails("");
    }
  }, [showCustomDetails]);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              value={newGiftUrl}
              onChange={(e) => setNewGiftUrl(e.target.value)}
              placeholder="Paste url to add with AI"
              className="flex-grow text-sm"
              disabled={isAddingGift}
            />
            <Button
              onClick={toggleCustomDetails}
              variant={showCustomDetails ? "destructive" : "outline"}
              size="sm"
              className="w-full sm:w-auto transition-colors duration-200"
            >
              {showCustomDetails ? "Remove details" : "Add details"}
            </Button>
          </div>
          {showCustomDetails && (
            <div className="relative">
              <AnimatedInput
                value={customDetails}
                onChange={handleDetailsChange}
                placeholders={DETAILS_PLACEHOLDERS}
                className="text-sm pr-12"
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                {customDetails.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
          )}
          <Button
            onClick={handleAddGiftClick}
            disabled={isAddingGift || (!showCustomDetails && !newGiftUrl)}
            variant="blue"
            className="w-full sm:w-auto transition-colors duration-200 text-sm"
          >
            {isAddingGift ? (
              <SmallSpinner />
            ) : (
              <AICircleIcon className="h-4 w-4 mr-2" />
            )}
            {isAddingGift ? "Adding..." : "Add Gift"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
