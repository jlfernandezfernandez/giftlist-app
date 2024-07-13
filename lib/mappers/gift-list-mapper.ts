// lib/mappers/gift-list-mapper.ts
import { GiftList } from "@/types/gift-list";
import { GiftListEntity } from "@/types/gift-list-entity";
import {
  getUsersByGiftListId,
  getGiftsByGiftListId,
} from "@/lib/repositories/gift-list-repository";

export async function mapCompleteGiftList(
  giftListEntity: GiftListEntity
): Promise<GiftList> {
  const users = await getUsersByGiftListId(giftListEntity.id);
  const gifts = await getGiftsByGiftListId(giftListEntity.id);
  return {
    ...giftListEntity,
    users,
    gifts,
  };
}
