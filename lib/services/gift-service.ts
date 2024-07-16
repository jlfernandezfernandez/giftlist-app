// lib/services/gift-service.ts

import {
  getGiftsByUserIdRepo,
  getGiftsByListIdRepo,
  createGiftRepo,
  updateGiftRepo,
  deleteGiftRepo,
  getGiftByIdRepo,
  createGiftUserRepo,
} from "@/lib/repositories/gift-repository";
import { Gift } from "@/types/gift";
import { GiftEntity } from "@/types/gift-entity";
import { GiftUserEntity } from "@/types/gift-user-entity";

// Mapa para convertir entre estado string e integer
const stateMap: { [key: string]: number } = {
  pending: 1,
  reserved: 2,
  bought: 3,
};

const reverseStateMap: { [key: number]: string } = {
  1: "pending",
  2: "reserved",
  3: "bought",
};

export async function fetchGiftsByUser(userId: string): Promise<Gift[]> {
  try {
    const giftEntities = await getGiftsByUserIdRepo(userId);
    return giftEntities.map(mapGiftEntityToGift);
  } catch (error) {
    console.error("Error fetching gifts by user ID:", error);
    throw new Error("Failed to fetch gifts for the user");
  }
}

export async function fetchGiftsByList(listId: string): Promise<Gift[]> {
  try {
    const giftEntities = await getGiftsByListIdRepo(listId);
    return giftEntities.map(mapGiftEntityToGift);
  } catch (error) {
    console.error("Error fetching gifts by list ID:", error);
    throw new Error("Failed to fetch gifts for the list");
  }
}

export async function addGift(gift: Gift, userId: string): Promise<Gift> {
  try {
    const giftEntity: Omit<GiftEntity, "id"> = mapGiftToGiftEntity(gift);
    const createdGiftEntity = await createGiftRepo(giftEntity, userId);
    const giftUserEntity: Omit<GiftUserEntity, "id"> = {
      user_id: userId,
      gift_id: createdGiftEntity.id,
    };
    await createGiftUserRepo(giftUserEntity);
    return mapGiftEntityToGift(createdGiftEntity);
  } catch (error) {
    console.error("Error adding gift:", error);
    throw new Error("Failed to add the gift");
  }
}

export async function getGiftById(giftId: string): Promise<Gift> {
  try {
    const giftEntity = await getGiftByIdRepo(giftId);
    return mapGiftEntityToGift(giftEntity);
  } catch (error) {
    console.error("Error fetching gift by ID:", error);
    throw new Error("Failed to fetch gift by ID");
  }
}

export async function updateGift(
  giftId: string,
  gift: Partial<Gift>
): Promise<Gift> {
  try {
    const giftEntity: Partial<GiftEntity> = mapPartialGiftToGiftEntity(gift);
    const updatedGiftEntity = await updateGiftRepo(giftId, giftEntity);
    return mapGiftEntityToGift(updatedGiftEntity);
  } catch (error) {
    console.error("Error updating gift:", error);
    throw new Error("Failed to update gift");
  }
}

export async function deleteGift(giftId: string): Promise<void> {
  try {
    await deleteGiftRepo(giftId);
  } catch (error) {
    console.error("Error deleting gift:", error);
    throw new Error("Failed to delete gift");
  }
}

function mapGiftEntityToGift(entity: GiftEntity): Gift {
  return {
    id: entity.id,
    giftListId: entity.giftlist_id,
    name: entity.name,
    description: entity.description,
    link: entity.link,
    website: entity.website,
    price: entity.price,
    currency: entity.currency,
    state: reverseStateMap[entity.state_id],
    assignedUsers: [], // This should be fetched and populated accordingly
  };
}

function mapGiftToGiftEntity(gift: Gift): Omit<GiftEntity, "id"> {
  return {
    giftlist_id: gift.giftListId!,
    name: gift.name!,
    description: gift.description!,
    link: gift.link!,
    website: gift.website!,
    price: gift.price!,
    currency: gift.currency!,
    state_id: stateMap[gift.state!],
  };
}

function mapPartialGiftToGiftEntity(gift: Partial<Gift>): Partial<GiftEntity> {
  return {
    giftlist_id: gift.giftListId || undefined,
    name: gift.name || undefined,
    description: gift.description || undefined,
    link: gift.link || undefined,
    website: gift.website || undefined,
    price: gift.price || undefined,
    currency: gift.currency || undefined,
    state_id: gift.state ? stateMap[gift.state] : undefined,
  };
}
