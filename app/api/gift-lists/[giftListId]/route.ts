// app/api/gift-lists/[giftListId]/route.ts

import {
  deleteGiftList,
  updateGiftList,
} from "@/lib/services/gift-list-service";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { giftListId: string } }
) {
  const giftListId = params.giftListId;
  const { userId } = await request.json();

  try {
    await deleteGiftList(giftListId, userId);
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

export async function PUT(
  request: Request,
  { params }: { params: { giftListId: string } }
) {
  const giftListId = params.giftListId;
  const { name, description, date, userId } = await request.json();

  try {
    const updatedGiftList = await updateGiftList(
      giftListId,
      name,
      description,
      date,
      userId
    );
    return NextResponse.json(updatedGiftList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gift list" },
      { status: 500 }
    );
  }
}
