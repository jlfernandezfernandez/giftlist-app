// lib/services/gift-lists-service.ts
import {
  getGiftListsByUserIdRepo,
  getGiftListByIdRepo,
  createGiftListRepo,
  associateUserWithGiftList,
} from "@/lib/repositories/gift-list-repository";
import { GiftList } from "@/types/gift-list";
import { GiftListCreate } from "@/types/gift-list-entity";
import { mapCompleteGiftList } from "../mappers/gift-list-mapper";

export async function getGiftListsByUser(userId: string): Promise<GiftList[]> {
  try {
    const giftListEntities = await getGiftListsByUserIdRepo(userId);
    const giftLists = await Promise.all(
      giftListEntities.map((entity) => mapCompleteGiftList(entity))
    );
    return giftLists;
  } catch (error) {
    console.error("Error getting gift lists by user ID:", error);
    throw new Error("Failed to get gift lists");
  }
}

export async function createGiftList(
  userId: string,
  name: string,
  description: string,
  date: string
): Promise<GiftList> {
  const newGiftListEntity: GiftListCreate = {
    name,
    description,
    date,
  };

  try {
    const createdGiftListEntity = await createGiftListRepo(newGiftListEntity);
    await associateUserWithGiftList(createdGiftListEntity.id, userId);
    const createdGiftList = await mapCompleteGiftList(createdGiftListEntity);
    return createdGiftList;
  } catch (error) {
    console.error("Error creating gift list:", error);
    throw new Error("Failed to create gift list");
  }
}

export async function getGiftListById(giftListId: string): Promise<GiftList> {
  try {
    const giftListEntity = await getGiftListByIdRepo(giftListId);
    const giftList = await mapCompleteGiftList(giftListEntity);
    return giftList;
  } catch (error) {
    console.error("Error getting gift list by ID:", error);
    throw new Error("Failed to get gift list by ID");
  }
}
