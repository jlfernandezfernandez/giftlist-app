// lib/services/gift-lists-service.ts
import {
  getGiftListsByUserIdRepo,
  createAndAssociateGiftListRepo,
  deleteGiftListRepo,
  updateGiftListRepo,
  associateUserToGiftListRepo,
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

export async function updateGiftList(
  giftListId: string,
  name: string,
  description: string | null,
  date: string | null,
  userId: string
): Promise<GiftList> {
  try {
    const updatedGiftList = await updateGiftListRepo(
      giftListId,
      name,
      description,
      date,
      userId
    );
    return updatedGiftList;
  } catch (error) {
    console.error("Error updating gift list:", error);
    throw new Error("Failed to update gift list");
  }
}

export async function associateUserToGiftList(
  giftListId: string,
  userId: string,
  role: string = "guest"
): Promise<{ success: boolean; message: string }> {
  try {
    await associateUserToGiftListRepo(giftListId, userId, role);
    return {
      success: true,
      message: "User successfully associated with gift list",
    };
  } catch (error: any) {
    if (error.code === "23505") {
      return {
        success: true,
        message: "User is already associated with this gift list",
      };
    }
    console.error("Error associating user to gift list:", error);
    throw new Error("Failed to associate user to gift list");
  }
}

export async function deleteGiftList(giftListId: string): Promise<void> {
  try {
    await deleteGiftListRepo(giftListId);
  } catch (error) {
    console.error("Error deleting gift list:", error);
    throw new Error("Failed to delete gift list");
  }
}
