import { AuthenticatedUser } from "@/types/authenticated-user";
import {
  getUserByEmail,
  createUser,
  updateUser,
} from "@/lib/repositories/user-repository";

export async function syncUserWithSupabase(user: AuthenticatedUser) {
  try {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      // Update user if necessary
      if (existingUser.name !== user.displayName) {
        const updatedUser = await updateUser(user);
        return updatedUser;
      }
      return existingUser;
    } else {
      // Create new user
      const newUser = await createUser(user);
      return newUser;
    }
  } catch (error) {
    console.error("Error syncing user with Supabase:", error);
    throw new Error("Failed to sync user with Supabase");
  }
}
