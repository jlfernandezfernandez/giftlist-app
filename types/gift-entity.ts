// types/gift-entity.ts

export interface GiftEntity {
  id: string;
  name: string;
  description: string;
  link: string;
  website: string;
  price: number;
  currency: string;
  state_id: number;
  giftlist_id: string;
}
