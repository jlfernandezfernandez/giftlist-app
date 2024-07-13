// app/api/gift-lists/user/[userId]/route.ts
import { getGiftListsByUser } from "@/lib/services/gift-list-service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const giftLists = await getGiftListsByUser(userId);
    return NextResponse.json(giftLists, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
