// lib/repositories/gift-states-repository.ts
import { supabase } from "@/lib/supabase.client";

export async function getGiftStates() {
  const { data, error } = await supabase.from("giftstates").select("*");

  if (error) {
    throw new Error(`Error fetching gift states: ${error.message}`);
  }

  return data;
}
