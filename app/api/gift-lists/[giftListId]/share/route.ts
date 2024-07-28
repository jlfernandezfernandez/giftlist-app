// app/api/gift-lists/[giftListId]/share/route.ts
import { NextRequest, NextResponse } from "next/server";
import { associateUserToGiftList } from "@/lib/services/gift-list-service";

export async function POST(
  request: NextRequest,
  { params }: { params: { giftListId: string } }
) {
  const { giftListId } = params;
  const { userId, role } = await request.json();

  if (!userId || !role) {
    return NextResponse.json(
      { error: "Missing userId or role" },
      { status: 400 }
    );
  }

  try {
    const result = await associateUserToGiftList(giftListId, userId, role);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error associating user to gift list:", error);
    return NextResponse.json(
      { error: "Failed to associate user" },
      { status: 500 }
    );
  }
}
