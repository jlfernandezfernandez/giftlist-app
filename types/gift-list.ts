// types/gift-list.ts

import { Gift } from "./gift";
import { User } from "./user";

export interface GiftList {
  id: string;
  name: string;
  description: string;
  date: string;
  isOwner: boolean;
  users: User[];
  gifts: Gift[];
}
