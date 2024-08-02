// app/api/gifts/user/[userId]/route.ts

import { getAssignedGiftsByUserId } from "@/lib/services/gift-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { message: "Missing required userId" },
      { status: 400 }
    );
  }

  try {
    const assignedGifts = await getAssignedGiftsByUserId(userId);
    return NextResponse.json(assignedGifts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch assigned gifts", error: error.message },
      { status: 500 }
    );
  }
}
