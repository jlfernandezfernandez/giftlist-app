import { supabase } from "@/lib/supabase.client";
import { AuthenticatedUser } from "@/types/authenticated-user";

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // 'PGRST116' is the 'no rows found' error
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email");
  }

  return data;
}

export async function createUser(authenticatedUser: AuthenticatedUser) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: authenticatedUser.uid,
      name: authenticatedUser.displayName,
      email: authenticatedUser.email,
    })
    .select();

  if (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  return data;
}

export async function updateUser(authenticatedUser: AuthenticatedUser) {
  const { data, error } = await supabase
    .from("users")
    .update({
      name: authenticatedUser.displayName,
    })
    .eq("email", authenticatedUser.email)
    .select();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }

  return data;
}
