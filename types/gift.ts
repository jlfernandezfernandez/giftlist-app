// types/gift.ts

import { User } from "./user";

export interface Gift {
  id: string;
  name: string;
  description: string | null;
  link: string;
  website: string;
  price: number | null;
  currency: string | null;
  state: string;
  assignedUsers: User[];
}
