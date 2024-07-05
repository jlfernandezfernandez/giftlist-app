// app/api/get-gift-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Gift } from "@/types/gift";
import { randomInt } from "crypto";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: "URL is required" }, { status: 400 });
  }

  // Aquí se haría la llamada a ChatGPT o la lógica para obtener los detalles del regalo
  // De momento, devolveremos un mock
  const mockGift: Gift = {
    id: randomInt(100),
    name: "Mock Gift Name",
    prize: 99.99,
    currency: "EUR",
    website: "Amazon",
    url: url,
    status: "Pendiente",
    assignedTo: [],
  };

  return NextResponse.json(mockGift);
}
