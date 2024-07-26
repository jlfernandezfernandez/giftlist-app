// lib/services/gift-ai-service.ts

import { getAffiliateLink } from "@/lib/services/affiliate-service";
import { scrapeProductData } from "@/lib/services/scraper-service";
import { Gift } from "@/types/gift";
import { createGift } from "./gift-service";

export async function processGift(
  url: string,
  details: string,
  giftListId: string,
  userId: string
): Promise<Gift> {
  const affiliateLink = await getAffiliateLink(url);
  const productData = await scrapeProductData(url);

  const newGift: Gift = {
    giftListId,
    name: productData.name ?? undefined,
    description: details,
    link: affiliateLink,
    website: productData.website ?? undefined,
    price: productData.price ?? undefined,
    currency: productData.currency ?? undefined,
  };

  const createdGift = await createGift(newGift);
  return createdGift;
}
