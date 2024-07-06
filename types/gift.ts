// types/gift.ts

import { User } from "./user";

export interface Gift {
  id: string;
  name: string;
  description: string;
  link: string;
  price: number;
  currency: string;
  state: string;
  assignedUsers: User[];
}
