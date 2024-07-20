// components/dashboard/add-gift-card.tsx

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AICircleIcon } from "../icons";
import SmallSpinner from "../ui/small-spinner";

interface AddGiftCardProps {
  isAddingGift: boolean;
  handleAddGift: (url: string) => void;
}

export function AddGiftCard({ isAddingGift, handleAddGift }: AddGiftCardProps) {
  const [newGiftUrl, setNewGiftUrl] = useState<string>("");

  const handleAddGiftClick = useCallback(async () => {
    await handleAddGift(newGiftUrl);
    setNewGiftUrl("");
  }, [newGiftUrl, handleAddGift]);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            id="new-gift-url"
            value={newGiftUrl}
            onChange={(e) => setNewGiftUrl(e.target.value)}
            placeholder="Paste url to add with AI"
            className="flex-grow text-sm"
            disabled={isAddingGift}
          />
          <Button
            onClick={handleAddGiftClick}
            disabled={isAddingGift}
            className="w-full sm:w-auto mt-2 sm:mt-0 transition-colors duration-200 hover:bg-gray-100 text-sm"
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
