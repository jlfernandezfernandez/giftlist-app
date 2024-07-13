// lib/mappers/gift-list-mapper.ts
import { GiftList } from "@/types/gift-list";
import { GiftListEntity } from "@/types/gift-list-entity";

export function mapGiftListEntityToGiftList(
  entity: GiftListEntity,
  userId: string,
  userName: string,
  userEmail: string
): GiftList {
  return {
    id: entity.id!,
    name: entity.name,
    description: entity.description,
    date: entity.date,
    users: [
      {
        userId,
        role: "owner",
        displayName: userName,
        email: userEmail,
      },
    ],
    gifts: [],
  };
}
