// lib/services/gift-service.ts
import {
  createGiftRepo,
  deleteGiftRepo,
  getGiftsByListIdRepo,
  updateGiftRepo,
} from "@/lib/repositories/gift-repository";
import { Gift } from "@/types/gift";

export async function createGift(gift: Gift): Promise<Gift> {
  return await createGiftRepo(gift);
}

export async function updateGift(giftId: string, updatedGift: Partial<Gift>): Promise<Gift> {
  try {
    return await updateGiftRepo(giftId, updatedGift);
  } catch (error) {
    console.error("Error updating gift:", error);
    throw new Error("Failed to update gift");
  }
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
