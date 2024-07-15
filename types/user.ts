// types/user.ts

export interface User {
  userId: string;
  name: string;
  email: string;
  role?: string; // Opcional, solo se usará en `GiftList`
}
