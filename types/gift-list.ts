// types/gift-list.ts

import { Gift } from "./gift";
import { User } from "./user";

export interface GiftList {
  id: string;
  name: string;
  description: string;
  date: string;
  privacy: string;
  users: User[];
  gifts: Gift[];
}
