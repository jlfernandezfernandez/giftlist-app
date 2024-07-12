import { GiftList } from "@/types/gift-list";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, date, userId } = await request.json();

  if (!name || !description || !date || !userId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const newGiftList: GiftList = {
    id: randomUUID(),
    name,
    description,
    date,
    privacy: "private",
    users: [
      {
        userId,
        role: "owner",
        displayName: "Jordi",
        email: "jordi@example.com",
      },
    ],
    gifts: [],
  };
  return NextResponse.json(newGiftList, { status: 201 });
}
