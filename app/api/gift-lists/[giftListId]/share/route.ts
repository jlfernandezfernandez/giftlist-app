// app/api/gift-lists/[giftListId]/share/route.ts

import { NextRequest, NextResponse } from "next/server";
import { associateUserToGiftList } from "@/lib/services/gift-list-service";

export async function POST(
  request: NextRequest,
  { params }: { params: { giftListId: string } }
) {
  const { giftListId } = params;
  const { role } = await request.json();

  if (!role) {
    return NextResponse.json({ error: "Missing role" }, { status: 400 });
  }

  try {
    // Obtener el usuario autenticado
    const userResponse = await fetch("/api/get-authenticated-user");
    if (!userResponse.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await userResponse.json();

    const result = await associateUserToGiftList(giftListId, user.uid, role);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error associating user to gift list:", error);
    return NextResponse.json(
      { error: "Failed to associate user" },
      { status: 500 }
    );
  }
}
