// types/gift-list-summary.ts
import { User } from "./user";

export interface GiftListSummary {
  id: string;
  name: string;
  users: User[];
}
