// lib/services/gift-service.ts
import {
  assignUserToGiftRepo,
  createGiftRepo,
  deleteGiftRepo,
  getAssignedGiftsByUserIdRepo,
  getGiftsByListIdRepo,
  unassignUserFromGiftRepo,
  updateGiftRepo,
} from "@/lib/repositories/gift-repository";
import { Gift } from "@/types/gift";

export async function createGift(gift: Gift, userId: string): Promise<Gift> {
  return await createGiftRepo(gift, userId);
}

export async function updateGift(
  giftId: string,
  updatedGift: Partial<Gift>,
  userId: string
): Promise<Gift> {
  try {
    return await updateGiftRepo(giftId, updatedGift, userId);
  } catch (error) {
    console.error("Error updating gift:", error);
    throw new Error("Failed to update gift");
  }
}

export async function getGiftsByListId(listId: string): Promise<Gift[]> {
  return await getGiftsByListIdRepo(listId);
}

export async function deleteGift(
  giftId: string,
  userId: string
): Promise<void> {
  try {
    await deleteGiftRepo(giftId, userId);
  } catch (error) {
    console.error("Error deleting gift:", error);
    throw new Error("Failed to delete gift");
  }
}

export async function assignUserToGift(
  giftId: string,
  userId: string
): Promise<void> {
  try {
    await assignUserToGiftRepo(giftId, userId);
  } catch (error) {
    console.error("Error assigning user to gift:", error);
    throw new Error("Failed to assign user to gift");
  }
}

export async function unassignUserFromGift(
  giftId: string,
  userId: string
): Promise<void> {
  try {
    await unassignUserFromGiftRepo(giftId, userId);
  } catch (error) {
    console.error("Error unassigning user from gift:", error);
    throw new Error("Failed to unassign user from gift");
  }
}

export async function getAssignedGiftsByUserId(
  userId: string
): Promise<Gift[]> {
  try {
    return await getAssignedGiftsByUserIdRepo(userId);
  } catch (error) {
    console.error("Error fetching assigned gifts for user:", error);
    throw new Error("Failed to fetch assigned gifts for user");
  }
}
