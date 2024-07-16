// lib/services/gift-ai-service.ts

import { getAffiliateLink } from "@/lib/services/affiliate-service";
import { scrapeProductData } from "@/lib/services/scraper-service";
import { addGift } from "@/lib/services/gift-service";
import { Gift } from "@/types/gift";

export async function processGift(
  url: string,
  giftListId: string,
  userId: string
): Promise<Gift> {
  const affiliateLink = await getAffiliateLink(url);
  const productData = await scrapeProductData(url);

  const newGift: Gift = {
    id: "",
    name: productData.name ?? null,
    description: productData.description ?? null,
    giftListId,
    link: affiliateLink,
    website: productData.website ?? null,
    price: productData.price ?? null,
    currency: productData.currency ?? null,
    state: "pending", // default state
    assignedUsers: [],
  };

  const createdGift = await addGift(newGift, userId);
  return createdGift;
}
