// types/gift.ts

import { User } from "./user";

export interface Gift {
  id: number;
  url: string;
  name: string;
  prize: number;
  website: string;
  status: string;
  assignedTo: User[];
}
