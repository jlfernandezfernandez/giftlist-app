// components/dashboard/add-gift-card.tsx

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AICircleIcon } from "../icons";
import SmallSpinner from "../ui/small-spinner";

interface AddGiftCardProps {
  isAddingGift: boolean;
  handleAddGift: (url: string) => void;
}

const PLACEHOLDER_TEXTS = [
  "Size: XL",
  "Capacity:bvghtrfg 128GB, Color: Space Gray",
  "Edition: Collector's, Language: Spanish",
  "Volume: 100ml",
];

export function AddGiftCard({ isAddingGift, handleAddGift }: AddGiftCardProps) {
  const [newGiftUrl, setNewGiftUrl] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [showCustomDescription, setShowCustomDescription] =
    useState<boolean>(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typingPlaceholder, setTypingPlaceholder] = useState("");

  useEffect(() => {
    if (!showCustomDescription) return;

    let currentText = "";
    let isDeleting = false;
    let textIndex = 0;

    const typeEffect = setInterval(() => {
      const fullText = PLACEHOLDER_TEXTS[placeholderIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, textIndex);
        textIndex--;
      } else {
        currentText = fullText.substring(0, textIndex + 1);
        textIndex++;
      }

      setTypingPlaceholder(currentText);

      if (!isDeleting && textIndex === fullText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 500);
      } else if (isDeleting && textIndex === 0) {
        isDeleting = false;
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % PLACEHOLDER_TEXTS.length
        );
      }
    }, 100);

    return () => clearInterval(typeEffect);
  }, [showCustomDescription, placeholderIndex]);

  const handleAddGiftClick = useCallback(async () => {
    await handleAddGift(newGiftUrl); // Send details
    setNewGiftUrl("");
    setCustomDescription("");
    setShowCustomDescription(false);
  }, [newGiftUrl, customDescription, handleAddGift]);

  const toggleCustomDescription = useCallback(() => {
    setShowCustomDescription((prev) => !prev);
    if (showCustomDescription) {
      setCustomDescription("");
    }
  }, [showCustomDescription]);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-3 sm:p-4">
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
              onClick={toggleCustomDescription}
              variant={showCustomDescription ? "destructive" : "blue"}
              size="sm"
              className="w-full sm:w-auto transition-colors duration-200"
            >
              {showCustomDescription ? "Remove details" : "Add details"}
            </Button>
          </div>
          {showCustomDescription && (
            <Input
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder={typingPlaceholder}
              className="text-sm"
            />
          )}
          <Button
            onClick={handleAddGiftClick}
            disabled={isAddingGift || (!showCustomDescription && !newGiftUrl)}
            className="w-full sm:w-auto transition-colors duration-200 hover:bg-gray-100 text-sm"
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
