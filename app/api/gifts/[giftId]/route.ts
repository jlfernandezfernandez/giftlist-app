import { NextResponse } from "next/server";
import { deleteGift } from "@/lib/services/gift-service";

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
