// lib/repositories/roles-repository.ts
import { supabase } from "@/lib/supabase.client";

export async function getRoles() {
  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    throw new Error(`Error fetching roles: ${error.message}`);
  }

  return data;
}
