// lib/repositories/gift-repository.ts

import { supabase } from "@/lib/supabase.client";
import { Gift } from "@/types/gift";

export async function createGiftRepo(gift: Gift): Promise<Gift> {
  console.log(gift);
  const { data, error } = await supabase.rpc("create_gift", {
    p_giftlist_id: gift.giftListId,
    p_name: gift.name,
    p_description: gift.description,
    p_link: gift.link,
    p_website: gift.website,
    p_price: gift.price,
    p_currency: gift.currency,
  });

  if (error) {
    throw new Error(`Error creating gift: ${error.message}`);
  }

  const createdGift = data[0];
  return {
    id: createdGift.id,
    giftListId: createdGift.gift_list_id,
    name: createdGift.name,
    description: createdGift.description,
    link: createdGift.link,
    website: createdGift.website,
    price: createdGift.price,
    currency: createdGift.currency,
    state: createdGift.state,
    assignedUsers: [], // Lista de usuarios asignados vacía por defecto
  };
}

export async function getGiftsByListIdRepo(listId: string): Promise<Gift[]> {
  const { data, error } = await supabase.rpc("get_gifts_by_list_id", {
    list_id: listId,
  });

  if (error) {
    throw new Error(`Error fetching gifts for list: ${error.message}`);
  }

  return data.map((gift: any) => ({
    id: gift.id,
    giftListId: gift.gift_list_id,
    name: gift.name,
    description: gift.description,
    link: gift.link,
    website: gift.website,
    price: gift.price,
    currency: gift.currency,
    state: gift.state,
    assignedUsers: gift.assigned_users.map((user: any) => ({
      userId: user.user_id,
      name: user.name,
      email: user.email,
    })),
  }));
}

export async function deleteGiftRepo(giftId: string): Promise<void> {
  const { error } = await supabase.from("gifts").delete().eq("id", giftId);

  if (error) {
    throw new Error(`Error deleting gift: ${error.message}`);
  }
}
