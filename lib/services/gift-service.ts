// lib/services/gift-service.ts
import {
  createGiftRepo,
  getGiftsByListIdRepo,
} from "@/lib/repositories/gift-repository";
import { Gift } from "@/types/gift";

export async function createGift(gift: Gift): Promise<Gift> {
  return await createGiftRepo(gift);
}

export async function getGiftsByListId(listId: string): Promise<Gift[]> {
  return await getGiftsByListIdRepo(listId);
}
