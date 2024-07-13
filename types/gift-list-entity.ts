// types/gift-list-entity.ts

export interface GiftListEntity {
  id: string;
  name: string;
  description: string;
  date: string;
}

export type GiftListCreate = Omit<GiftListEntity, "id">;