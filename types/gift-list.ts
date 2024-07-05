
// types/gift-list.ts

import { Gift } from "./gift";

export interface GiftList {
  id: number;
  name: string;
  description: string;
  date: string;
  owner: string;
  gifts: Gift[];
}
