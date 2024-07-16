// app/api/gift-lists/[giftListId]/gift/route.ts

import { NextRequest, NextResponse } from "next/server";
import { processGift } from "@/lib/services/gift-ai-service";

export async function POST(
  req: NextRequest,
  { params }: { params: { giftListId: string } }
) {
  try {
    const { url, userId } = await req.json();
    const { giftListId } = params;

    if (!url || !giftListId || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const createdGift = await processGift(url, giftListId, userId);
    return NextResponse.json(createdGift, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating gift", error },
      { status: 500 }
    );
  }
}
