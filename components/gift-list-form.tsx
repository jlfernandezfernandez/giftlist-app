// components/gift-list-form.tsx
import React from "react";
import { AnimatedInput } from "./ui/animated-input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/date-picker";
import { startOfDay } from "date-fns";

interface GiftListFormProps {
  name: string;
  setName: (name: string) => void;
  description: string | null;
  setDescription: (description: string | null) => void;
  date: string | null;
  setDate: (date: string | null) => void;
  onSubmit: (data: {
    name: string;
    description: string | null;
    date: string | null;
  }) => void;
  isLoading: boolean;
  submitText: string;
}

const MAX_DESCRIPTION_LENGTH = 50;

const NAME_PLACEHOLDERS = [
  "e.g. Birthday Wishlist",
  "e.g. Wedding Registry",
  "e.g. Christmas Gift Ideas",
  "e.g. Housewarming Gifts",
];

const DESCRIPTION_PLACEHOLDERS = [
  "e.g. My 30th birthday celebration",
  "e.g. Our dream wedding items",
  "e.g. Family Christmas exchange",
  "e.g. New apartment essentials",
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
    date = date === "" ? null : date;
    description = description === "" ? null : description;
    onSubmit({ name, description, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center">
          Name <span className="text-red-500 ml-1">*</span>
        </Label>
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
        <AnimatedInput
          id="description"
          value={description ?? ""}
          onChange={(e) =>
            setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
          }
          placeholders={DESCRIPTION_PLACEHOLDERS}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Event Date</Label>
        <DatePicker
          value={date ?? ""}
          onChange={(value) => setDate(value === "" ? null : value)}
          placeholder="dd/mm/yyyy"
          minDate={startOfDay(new Date())}
        />
      </div>
      <Button
        type="submit"
        variant="secondary"
        disabled={isLoading || !name}
        className="w-full mt-6"
      >
        {isLoading ? "Creating..." : submitText}
      </Button>
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-red-500">*</span> Required field
      </p>
    </form>
  );
}
