// app/api/assign-gift/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { listId, giftId, userId } = await req.json();

  if (!listId || !giftId || !userId) {
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 400 }
    );
  }

  // Aquí se debería actualizar el estado del regalo en la base de datos
  // Por ahora, devolvemos un mock
  return NextResponse.json({ message: "Gift assigned successfully" });
}
