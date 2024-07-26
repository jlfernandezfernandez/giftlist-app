// components/gift-list-form.tsx
import React from "react";
import { AnimatedInput } from "./ui/animated-input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface GiftListFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  date: string;
  setDate: (date: string) => void;
  onSubmit: (data: { name: string; description: string; date: string }) => void;
  isLoading: boolean;
  submitText: string;
}

const MAX_DESCRIPTION_LENGTH = 50;

const NAME_PLACEHOLDERS = [
  "Birthday Wishlist",
  "Wedding Registry",
  "Christmas Gift Ideas",
  "Housewarming Gifts",
];

const DESCRIPTION_PLACEHOLDERS = [
  "My 30th birthday celebration",
  "Our dream wedding items",
  "Family Christmas exchange",
  "New apartment essentials",
];

export function GiftListForm({
  name,
  setName,
  description,
  setDescription,
  date,
  setDate,
  onSubmit,
  isLoading,
  submitText,
}: GiftListFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, date });
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return "Date cannot be in the past";
    return null;
  };

  const dateError = validateDate(date);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <AnimatedInput
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholders={NAME_PLACEHOLDERS}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <div className="relative">
          <AnimatedInput
            id="description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
            }
            required
            placeholders={DESCRIPTION_PLACEHOLDERS}
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="pr-16"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Event Date</Label>
        <Input
          id="date"
          type="date"
          value={parseDate(formatDate(date))}
          onChange={(e) => setDate(new Date(e.target.value).toISOString())}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        {dateError && <p className="text-xs text-red-500 mt-1">{dateError}</p>}
      </div>
      <Button
        type="submit"
        variant="blue"
        disabled={isLoading || !name || !description || !date || !!dateError}
        className="w-full mt-6"
      >
        {isLoading ? "Updating..." : submitText}
      </Button>
    </form>
  );
}
