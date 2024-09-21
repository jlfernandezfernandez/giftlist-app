// app/api/gifts/[giftId]/user/[userId]/route.ts

import {
  assignUserToGift,
  unassignUserFromGift,
} from "@/lib/services/gift-service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { giftId: string; userId: string } }
) {
  const { giftId, userId } = params;

  if (!giftId || !userId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedGift = await assignUserToGift(giftId, userId);
    return NextResponse.json(updatedGift, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to assign user to gift", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { giftId: string; userId: string } }
) {
  const { giftId, userId } = params;

  if (!giftId || !userId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedGift = await unassignUserFromGift(giftId, userId);
    return NextResponse.json(updatedGift, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to unassign user from gift", error: error.message },
      { status: 500 }
    );
  }
}
