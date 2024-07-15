import { AuthenticatedUser } from "@/types/authenticated-user";
import {
  getUserByEmail,
  createUser,
  updateUser,
} from "@/lib/repositories/user-repository";

export async function syncUserWithSupabase(authenticatedUser: AuthenticatedUser) {
  try {
    const existingUser = await getUserByEmail(authenticatedUser.email);
    if (existingUser) {
      // Update user if necessary
      if (existingUser.name !== authenticatedUser.displayName) {
        const updatedUser = await updateUser(authenticatedUser);
        return updatedUser;
      }
      return existingUser;
    } else {
      // Create new user
      const newUser = await createUser(authenticatedUser);
      return newUser;
    }
  } catch (error) {
    console.error("Error syncing user with Supabase:", error);
    throw new Error("Failed to sync user with Supabase");
  }
}
