// lib/repositories/gift-repository.ts

import { supabase } from "@/lib/supabase.client";
import { GiftEntity } from "@/types/gift-entity";
import { GiftUserEntity } from "@/types/gift-user-entity";

export async function getGiftsByUserIdRepo(
  userId: string
): Promise<GiftEntity[]> {
  const { data: giftUsers, error: giftUsersError } = await supabase
    .from("giftusers")
    .select("gift_id")
    .eq("user_id", userId);

  if (giftUsersError) {
    throw new Error(`Error fetching gift users: ${giftUsersError.message}`);
  }

  if (!giftUsers || giftUsers.length === 0) {
    return [];
  }

  const giftIds = giftUsers.map((gu: { gift_id: string }) => gu.gift_id);

  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .in("id", giftIds);

  if (error) {
    throw new Error(`Error fetching gifts: ${error.message}`);
  }

  return data as GiftEntity[];
}

export async function getGiftsByListIdRepo(
  listId: string
): Promise<GiftEntity[]> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("giftlist_id", listId);

  if (error) {
    throw new Error(`Error fetching gifts for list: ${error.message}`);
  }

  return data as GiftEntity[];
}

export async function createGiftRepo(
  gift: Omit<GiftEntity, "id">,
  userId: string
): Promise<GiftEntity> {
  const { data: giftData, error: giftError } = await supabase
    .from("gifts")
    .insert([gift])
    .select();

  if (giftError) {
    throw new Error(`Error creating gift: ${giftError.message}`);
  }

  return giftData[0];
}

export async function createGiftUserRepo(
  giftUser: Omit<GiftUserEntity, "id">
): Promise<GiftUserEntity> {
  const { data, error } = await supabase
    .from("giftusers")
    .insert([giftUser])
    .select();

  if (error) {
    throw new Error(`Error creating gift user: ${error.message}`);
  }

  return data[0];
}

export async function updateGiftRepo(
  giftId: string,
  gift: Partial<GiftEntity>
): Promise<GiftEntity> {
  const { data, error } = await supabase
    .from("gifts")
    .update(gift)
    .eq("id", giftId)
    .select();

  if (error) {
    throw new Error(`Error updating gift: ${error.message}`);
  }

  return data[0] as GiftEntity;
}

export async function deleteGiftRepo(giftId: string): Promise<void> {
  const { error } = await supabase.from("gifts").delete().eq("id", giftId);

  if (error) {
    throw new Error(`Error deleting gift: ${error.message}`);
  }
}

export async function getGiftByIdRepo(giftId: string): Promise<GiftEntity> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", giftId)
    .single();

  if (error) {
    throw new Error(`Error fetching gift by ID: ${error.message}`);
  }

  return data as GiftEntity;
}
