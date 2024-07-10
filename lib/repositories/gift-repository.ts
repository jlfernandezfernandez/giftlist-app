import { supabase } from "@/lib/supabase.client";
import { Gift } from "@/types/gift";

export async function getGiftsByUserId(userId: string): Promise<Gift[]> {
  const { data: giftUsers, error: giftUsersError } = await supabase
    .from("giftusers")
    .select("giftId")
    .eq("userId", userId);

  if (giftUsersError) {
    throw new Error(`Error fetching gift users: ${giftUsersError.message}`);
  }

  if (!giftUsers || giftUsers.length === 0) {
    return [];
  }

  const giftIds = giftUsers.map((gu: { giftId: string }) => gu.giftId);

  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .in("id", giftIds);

  if (error) {
    throw new Error(`Error fetching gifts: ${error.message}`);
  }

  return data as Gift[];
}

export async function getGiftsByListId(listId: string): Promise<Gift[]> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("giftListId", listId);

  if (error) {
    throw new Error(`Error fetching gifts for list: ${error.message}`);
  }

  return data as Gift[];
}

export async function createGift(gift: Gift, userId: string): Promise<Gift> {
  const { data: giftData, error: giftError } = await supabase
    .from("gifts")
    .insert([gift])
    .select();

  if (giftError) {
    throw new Error(`Error creating gift: ${giftError.message}`);
  }

  const { error: giftUserError } = await supabase
    .from("giftusers")
    .insert([{ giftId: giftData[0].id, userId }]);

  if (giftUserError) {
    throw new Error(
      `Error associating user with gift: ${giftUserError.message}`
    );
  }

  return giftData[0];
}
