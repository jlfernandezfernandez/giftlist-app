// app/gift-list/create/page.tsx
"use client";

import { useState } from "react";
import { GiftListForm } from "@/components/gift-list-form";
import { useCreateGiftList } from "@/hooks/use-create-gift-list";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CreateGiftListPage() {
  const { createGiftList, isLoading } = useCreateGiftList();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (data: {
    name: string;
    description: string;
    date: string;
  }) => {
    await createGiftList(data.name, data.description, data.date);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-6 ml-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Gift List</CardTitle>
            <CardDescription>
              Fill in the details below to create a new gift list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GiftListForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              date={date}
              setDate={setDate}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              submitText="Create Gift List"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
