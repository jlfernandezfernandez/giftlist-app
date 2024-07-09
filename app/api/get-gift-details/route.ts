// app/api/get-gift-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Gift } from "@/types/gift";
import { randomInt } from "crypto";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: "URL is required" }, { status: 400 });
  }

  const mockGifts: Gift[] = [
    {
      id: randomInt(100).toString(),
      name: "Running Shoes",
      description: "Size: 10, Color: Black",
      link: url,
      website: "SportStore",
      price: 59.99,
      currency: "eur",
      state: "pending",
      assignedUsers: [],
    },
    {
      id: randomInt(100).toString(),
      name: "Luxury Perfume",
      description: "Volume: 50ml, Fragrance: Floral",
      link: url,
      website: "BeautyShop",
      price: 120.0,
      currency: "eur",
      state: "pending",
      assignedUsers: [],
    },
    {
      id: randomInt(100).toString(),
      name: "Smartphone",
      description: "Brand: TechBrand, Storage: 128GB",
      link: url,
      website: "ElectroMart",
      price: 699.99,
      currency: "eur",
      state: "pending",
      assignedUsers: [],
    },
    {
      id: randomInt(100).toString(),
      name: "Designer Jacket",
      description: "Size: L, Material: Leather",
      link: url,
      website: "FashionHub",
      price: 250.0,
      currency: "eur",
      state: "pending",
      assignedUsers: [],
    },
    {
      id: randomInt(100).toString(),
      name: "Smart Watch",
      description: "Brand: WatchCo, Features: GPS, Heart-rate monitor",
      link: url,
      website: "GadgetStore",
      price: 199.99,
      currency: "eur",
      state: "pending",
      assignedUsers: [],
    },
  ];

  const selectedGift = mockGifts[randomInt(mockGifts.length)];

  return NextResponse.json(selectedGift);
}
