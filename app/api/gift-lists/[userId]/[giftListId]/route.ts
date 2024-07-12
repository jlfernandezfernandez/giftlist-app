// app/api/gift-lists/[userId]/[giftListId]/route.ts
import { NextResponse } from "next/server";
import {
  giftListsMock,
  replaceUserIdInGiftList,
  replaceUserIdInGift,
} from "../../gift-list-mock";

export async function GET(
  request: Request,
  { params }: { params: { userId: string; giftListId: string } }
) {
  const { giftListId, userId } = params;
  console.log(`GET gift list ${giftListId} for user ${userId}`);

  // Replace the placeholder user ID with the actual user ID.
  const giftListsMockWithUserId = replaceUserIdInGiftList(
    giftListsMock,
    userId
  );

  const giftList = giftListsMockWithUserId.find(
    (list: { id: string }) => list.id === giftListId
  );

  if (!giftList) {
    return NextResponse.json({ error: "Gift list not found" }, { status: 404 });
  }

  const userHasAccess = giftList.users.some(
    (user: { userId: string }) => user.userId === userId
  );

  if (!userHasAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json(replaceUserIdInGift(giftList, userId));
}
