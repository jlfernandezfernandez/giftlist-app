// lib/repositories/gift-repository.ts

import { supabase } from "@/lib/supabase.client";
import { Gift } from "@/types/gift";

function mapGiftData(giftData: any): Gift {
  if (!giftData || typeof giftData !== "object") {
    console.error("Invalid gift data:", giftData);
    throw new Error("Invalid gift data");
  }

  return {
    id: giftData.id,
    giftListId: giftData.giftlist_id,
    name: giftData.name,
    description: giftData.description,
    link: giftData.link,
    website: giftData.website,
    price: giftData.price,
    currency: giftData.currency,
    state: giftData.state,
    assignedUsers: Array.isArray(giftData.assigned_users)
      ? giftData.assigned_users.map((user: any) => ({
          userId: user.user_id,
          name: user.name,
          email: user.email,
        }))
      : [],
  };
}

export async function createGiftRepo(
  gift: Gift,
  userId: string
): Promise<Gift> {
  const { data, error } = await supabase.rpc("create_gift", {
    p_giftlist_id: gift.giftListId,
    p_name: gift.name,
    p_description: gift.description,
    p_link: gift.link,
    p_website: gift.website,
    p_price: gift.price,
    p_currency: gift.currency,
    p_user_id: userId,
  });

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Error creating gift: ${error.message}`);
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Unexpected data structure:", data);
    throw new Error("Failed to create gift: No data returned");
  }

  const createdGift = data[0];
  console.log("Created gift data:", createdGift);

  return mapGiftData(createdGift);
}

export async function updateGiftRepo(
  giftId: string,
  updatedGift: Partial<Gift>,
  userId: string
): Promise<Gift> {
  const { data, error } = await supabase.rpc("update_gift", {
    p_gift_id: giftId,
    p_name: updatedGift.name,
    p_description: updatedGift.description,
    p_link: updatedGift.link,
    p_website: updatedGift.website,
    p_price: updatedGift.price,
    p_currency: updatedGift.currency,
    p_state: updatedGift.state,
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error updating gift: ${error.message}`);
  }

  return mapGiftData(data[0]);
}

export async function getGiftsByListIdRepo(listId: string): Promise<Gift[]> {
  const { data, error } = await supabase.rpc("get_gifts_by_list_id", {
    list_id: listId,
  });

  if (error) {
    throw new Error(`Error fetching gifts for list: ${error.message}`);
  }

  return data.map(mapGiftData);
}

export async function deleteGiftRepo(
  giftId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase.rpc("delete_gift", {
    p_gift_id: giftId,
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error deleting gift: ${error.message}`);
  }
}

export async function assignUserToGiftRepo(
  giftId: string,
  userId: string
): Promise<Gift> {
  const { data, error } = await supabase.rpc("assign_user_to_gift", {
    p_gift_id: giftId,
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error assigning user to gift: ${error.message}`);
  }

  return mapGiftData(data[0]);
}

export async function unassignUserFromGiftRepo(
  giftId: string,
  userId: string
): Promise<Gift> {
  const { data, error } = await supabase.rpc("unassign_user_from_gift", {
    p_gift_id: giftId,
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error unassigning user from gift: ${error.message}`);
  }

  return mapGiftData(data[0]);
}

export async function getAssignedGiftsByUserIdRepo(
  userId: string
): Promise<Gift[]> {
  const { data, error } = await supabase.rpc("get_assigned_gifts_by_user_id", {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error fetching assigned gifts for user: ${error.message}`);
  }

  return data.map(mapGiftData);
}
