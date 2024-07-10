// lib/repositories/privacy-repository.ts
import { supabase } from "@/lib/supabase.client";

export async function getPrivacyOptions() {
  const { data, error } = await supabase.from("privacy").select("*");

  if (error) {
    throw new Error(`Error fetching privacy options: ${error.message}`);
  }

  return data;
}
