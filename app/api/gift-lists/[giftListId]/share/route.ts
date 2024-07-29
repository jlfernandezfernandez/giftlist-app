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
    await associateUserToGiftList(giftListId, userId, role);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    if (error.code === "23505") {
      // Usuario ya asociado, devolvemos un 409 Conflict
      return NextResponse.json(
        { error: "User already associated with this gift list" },
        { status: 409 }
      );
    }
    console.error("Error associating user to gift list:", error);
    return NextResponse.json(
      { error: "Failed to associate user" },
      { status: 500 }
    );
  }
}
