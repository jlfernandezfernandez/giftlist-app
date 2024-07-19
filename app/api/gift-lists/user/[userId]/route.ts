// app/api/gift-lists/user/[userId]/route.ts

import { getGiftListsByUser } from "@/lib/services/gift-list-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    const giftLists = await getGiftListsByUser(userId);
    return NextResponse.json(giftLists, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch gift lists", error: error.message },
      { status: 500 }
    );
  }
}
