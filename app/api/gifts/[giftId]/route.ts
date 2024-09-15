//app/api/gifts/[giftId]/route.ts

import { NextResponse } from "next/server";
import { deleteGift, updateGift } from "@/lib/services/gift-service";
import { updateGiftRepo } from "@/lib/repositories/gift-repository";

export async function DELETE(
  request: Request,
  { params }: { params: { giftId: string } }
) {
  const giftId = params.giftId;
  const { userId } = await request.json();

  try {
    await deleteGift(giftId, userId);
    return NextResponse.json(
      { message: "Gift deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete gift" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { giftId: string } }
) {
  const giftId = params.giftId;
  const { userId, ...updatedGift } = await request.json();

  try {
    const result = await updateGift(giftId, updatedGift, userId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gift" },
      { status: 500 }
    );
  }
}
