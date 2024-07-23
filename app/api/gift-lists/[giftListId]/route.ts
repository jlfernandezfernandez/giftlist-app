import { deleteGiftList } from "@/lib/services/gift-list-service";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { giftListId: string } }
) {
  const giftListId = params.giftListId;

  try {
    await deleteGiftList(giftListId);
    return NextResponse.json(
      { message: "Gift list deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete gift list" },
      { status: 500 }
    );
  }
}
