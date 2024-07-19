// lib/services/gift-lists-service.ts
import {
  getGiftListsByUserIdRepo,
  createAndAssociateGiftListRepo,
} from "@/lib/repositories/gift-list-repository";
import { GiftList } from "@/types/gift-list";

export async function getGiftListsByUser(userId: string): Promise<GiftList[]> {
  try {
    return await getGiftListsByUserIdRepo(userId);
  } catch (error) {
    console.error("Error getting basic gift lists by user ID:", error);
    throw new Error("Failed to get basic gift lists");
  }
}

export async function createGiftList(
  userId: string,
  name: string,
  description: string,
  date: string
): Promise<GiftList> {
  try {
    const createdGiftList = await createAndAssociateGiftListRepo(
      userId,
      name,
      description,
      date
    );
    return createdGiftList;
  } catch (error) {
    console.error("Error creating gift list:", error);
    throw new Error("Failed to create gift list");
  }
}
