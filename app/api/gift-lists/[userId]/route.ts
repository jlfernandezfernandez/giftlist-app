// app/api/gift-lists/[userId]/route.ts
import { NextResponse } from "next/server";
import { giftListsMock, replaceUserIdInGiftList } from "../gift-list-mock";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log(`GET gift lists for user ${userId}`);
  return NextResponse.json(replaceUserIdInGiftList(giftListsMock, userId));
}
