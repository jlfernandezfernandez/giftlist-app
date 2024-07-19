// app/api/gift-lists/[giftListId]/gift/route.ts

import { processGift } from "@/lib/services/gift-ai-service";
import { getGiftsByListId } from "@/lib/services/gift-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { giftListId: string } }
) {
  const { giftListId } = params;

  if (!giftListId) {
    return NextResponse.json({ message: "Invalid list ID" }, { status: 400 });
  }

  try {
    const gifts = await getGiftsByListId(giftListId);
    return NextResponse.json(gifts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch gifts", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { link, giftListId, userId } = await req.json();

  if (!giftListId || !link || !userId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newGift = await processGift(link, giftListId, userId);
    return NextResponse.json(newGift, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create gift", error: error.message },
      { status: 500 }
    );
  }
}
