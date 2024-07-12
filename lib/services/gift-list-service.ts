// lib/services/gift-lists-service.ts
import {
  getGiftListsByUserId as getGiftListsByUserIdRepo,
  createGiftList as createGiftListRepo,
} from "@/lib/repositories/gift-lists-repository";
import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";

export async function getGiftListsByUser(
  user: AuthenticatedUser
): Promise<GiftList[]> {
  try {
    const giftLists = await getGiftListsByUserIdRepo(user.uid);
    return giftLists;
  } catch (error) {
    console.error("Error getting gift lists by user ID:", error);
    throw new Error("Failed to get gift lists");
  }
}

export async function createGiftList(
  user: AuthenticatedUser,
  giftList: GiftList
): Promise<GiftList> {
  try {
    const createdGiftList = await createGiftListRepo(giftList, user.uid);
    return createdGiftList;
  } catch (error) {
    console.error("Error creating gift list:", error);
    throw new Error("Failed to create gift list");
  }
}
