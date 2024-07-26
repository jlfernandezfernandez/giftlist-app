// lib/services/affiliate-service.ts

export async function getAffiliateLink(url: string): Promise<string> {
  // Mocked affiliate link generation
  if (url.includes("amazon")) {
    return url + "?tag=giftlistai-21";
  }
  return "https://amazon.com";
}
