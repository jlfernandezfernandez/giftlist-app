// lib/mappers/gift-list-mapper.ts
import { GiftList } from "@/types/gift-list";
import { GiftListEntity } from "@/types/gift-list-entity";
import { getUsersByGiftListId } from "@/lib/repositories/gift-list-repository";
import { fetchGiftsByList } from "../services/gift-service";

export async function mapCompleteGiftList(
  giftListEntity: GiftListEntity
): Promise<GiftList> {
  const users = await getUsersByGiftListId(giftListEntity.id);
  const gifts = await fetchGiftsByList(giftListEntity.id);
  return {
    ...giftListEntity,
    users,
    gifts,
  };
}
