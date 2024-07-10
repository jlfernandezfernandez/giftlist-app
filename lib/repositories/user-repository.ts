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

export async function createUser(user: AuthenticatedUser) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: user.uid,
      name: user.displayName,
      email: user.email,
    })
    .select();

  if (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  return data;
}

export async function updateUser(user: AuthenticatedUser) {
  const { data, error } = await supabase
    .from("users")
    .update({
      name: user.displayName,
    })
    .eq("email", user.email)
    .select();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }

  return data;
}
