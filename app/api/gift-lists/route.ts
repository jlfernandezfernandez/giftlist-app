// app/api/gift-lists/route.ts
import { createGiftList } from "@/lib/services/gift-list-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, date, userId } = await request.json();

  if (!name || !userId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newGiftList = await createGiftList(userId, name, description, date);
    return NextResponse.json(newGiftList, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
