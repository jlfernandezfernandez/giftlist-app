//app/api/gifts/[giftId]/route.ts

import { NextResponse } from "next/server";
import { deleteGift, updateGift } from "@/lib/services/gift-service";

export async function DELETE(
  request: Request,
  { params }: { params: { giftId: string } }
) {
  const giftId = params.giftId;

  try {
    await deleteGift(giftId);
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
  const updatedGift = await request.json();

  try {
    const result = await updateGift(giftId, updatedGift);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gift" },
      { status: 500 }
    );
  }
}
