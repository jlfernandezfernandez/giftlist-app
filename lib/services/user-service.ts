// lib/services/user-service.ts
import { AuthenticatedUser } from "@/types/authenticated-user";
import {
  getUserByEmail,
  createUser,
  updateUser,
} from "@/lib/repositories/user-repository";

export async function syncUserWithSupabase(
  authenticatedUser: AuthenticatedUser
) {
  try {
    const existingUser = await getUserByEmail(authenticatedUser.email);

    if (existingUser) {
      if (existingUser.name !== authenticatedUser.displayName) {
        return await updateUser(authenticatedUser);
      }
      return existingUser;
    } else {
      return await createUser(authenticatedUser);
    }
  } catch (error) {
    console.error("Error syncing user with Supabase:", error);
    throw new Error("Failed to sync user with Supabase");
  }
}
