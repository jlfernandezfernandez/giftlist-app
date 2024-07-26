// app/gift-list/create/page.tsx
"use client";

import { useState } from "react";
import { GiftListForm } from "@/components/gift-list-form";
import { useCreateGiftList } from "@/hooks/use-create-gift-list";

export default function CreateGiftListPage() {
  const { createGiftList, isLoading } = useCreateGiftList();
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const handleSubmit = async (data: {
    name: string;
    description: string | null;
    date: string | null;
  }) => {
    await createGiftList(data.name, data.description, data.date);
  };

  return (
    <div className="flex min-h-screen w-full justify-center">
      <main className="w-full max-w-6xl py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Create a New Gift List</h1>
          <p className="text-gray-600">
            Fill in the details below to create a new gift list.
          </p>
        </div>
        <GiftListForm
          name={name}
          setName={setName}
          description={description}
          setDescription={(value) => setDescription(value)}
          date={date || ""}
          setDate={(value) => setDate(value)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="Create Gift List"
        />
      </main>
    </div>
  );
}
