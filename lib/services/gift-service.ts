// lib/services/gift-service.ts
import {
  createGiftRepo,
  deleteGiftRepo,
  getGiftsByListIdRepo,
} from "@/lib/repositories/gift-repository";
import { Gift } from "@/types/gift";

export async function createGift(gift: Gift): Promise<Gift> {
  return await createGiftRepo(gift);
}

export async function getGiftsByListId(listId: string): Promise<Gift[]> {
  return await getGiftsByListIdRepo(listId);
}

export async function deleteGift(giftId: string): Promise<void> {
  try {
    await deleteGiftRepo(giftId);
  } catch (error) {
    console.error("Error deleting gift:", error);
    throw new Error("Failed to delete gift");
  }
}
