// app/api/gift-lists/[giftListId]/route.ts

import { getGiftListById } from "@/lib/services/gift-list-service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { giftListId: string } }
) {
  const { giftListId } = params;

  if (!giftListId) {
    return NextResponse.json(
      { error: "Gift list ID is required" },
      { status: 400 }
    );
  }

  try {
    const giftList = await getGiftListById(giftListId);
    return NextResponse.json(giftList, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
