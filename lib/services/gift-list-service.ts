// lib/services/gift-lists-service.ts
import {
  createGiftListRepo,
  getGiftListsByUserIdRepo,
} from "@/lib/repositories/gift-list-repository";
import { GiftList } from "@/types/gift-list";
import { GiftListEntity } from "@/types/gift-list-entity";
import { mapGiftListEntityToGiftList } from "@/lib/mappers/gift-list-mapper";

export async function getGiftListsByUser(userId: string): Promise<GiftList[]> {
  try {
    const giftListEntities = await getGiftListsByUserIdRepo(userId);
    const giftLists: GiftList[] = giftListEntities.map((entity) =>
      mapGiftListEntityToGiftList(
        entity,
        userId,
        "Jordi", // Estos valores deberían provenir de la autenticación del usuario
        "jordi@example.com"
      )
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
  const newGiftListEntity: GiftListEntity = {
    name,
    description,
    date,
  };

  try {
    const createdGiftListEntity = await createGiftListRepo(
      newGiftListEntity,
      userId
    );

    const createdGiftList = mapGiftListEntityToGiftList(
      createdGiftListEntity,
      userId,
      "Jordi", // Estos valores deberían provenir de la autenticación del usuario
      "jordi@example.com"
    );

    return createdGiftList;
  } catch (error) {
    console.error("Error creating gift list:", error);
    throw new Error("Failed to create gift list");
  }
}
