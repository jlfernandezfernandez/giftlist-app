// app/gift-list/new/page.tsx
"use client";

import { useState } from "react";
import { GiftListForm } from "@/components/gift-list-form";
import { useCreateGiftList } from "@/hooks/use-create-gift-list";

export default function CreateGiftListPage() {
  const mutation = useCreateGiftList();
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const handleSubmit = async () => {
    await mutation.mutateAsync({
      name,
      description,
      date,
    });
  };

  return (
    <div className="flex min-h-screen w-full justify-center">
      <main className="w-full max-w-6xl py-6 px-6 md:px-2">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create a New Gift List
          </h1>
          <p className="text-gray-600">
            Fill in the details below to create a new gift list.
          </p>
        </div>
        <GiftListForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
          submitText="Create Gift List"
        />
      </main>
    </div>
  );
}
