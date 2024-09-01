// lib/services/gift-ai-service.ts

import { getAffiliateLink } from "@/lib/services/affiliate-service";
import { scrapeProductData } from "@/lib/services/scraper-service";
import { Gift } from "@/types/gift";
import { createGift } from "./gift-service";
import { extractWebsiteName } from "./url-utils";

export async function processGift(
  url: string,
  details: string,
  giftListId: string,
  userId: string,
  name?: string,
  price?: number,
  currency?: string
): Promise<Gift> {
  const affiliateLink = await getAffiliateLink(url);
  const websiteName = extractWebsiteName(url);
  const productData = await scrapeProductData(url);

  const newGift: Gift = {
    giftListId,
    name: name || productData.name,
    description: details,
    link: affiliateLink,
    website: websiteName,
    price: price ?? productData.price,
    currency: currency || productData.currency,
  };

  return await createGift(newGift);
}
