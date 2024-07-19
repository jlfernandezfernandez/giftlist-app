// types/gift.ts

import { User } from "./user";

export interface Gift {
  id?: string;
  giftListId: string;
  name?: string;
  description?: string;
  link: string;
  website?: string;
  price?: number;
  currency?: string;
  state?: string;
  assignedUsers?: User[];
}
