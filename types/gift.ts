// types/gift.ts

import { User } from "./user";

export interface Gift {
  id: string | null;
  giftListId: string | null;
  name: string | null;
  description: string | null;
  link: string | null;
  website: string | null;
  price: number | null;
  currency: string | null;
  state: string | null;
  assignedUsers: User[];
}
