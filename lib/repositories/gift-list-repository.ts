// lib/repositories/gift-list-repository.ts
import { supabase } from "@/lib/supabase.client";
import { GiftList } from "@/types/gift-list";

export async function createAndAssociateGiftListRepo(
  userId: string,
  name: string,
  description: string,
  date: string
): Promise<GiftList> {
  const { data, error } = await supabase.rpc("create_and_associate_gift_list", {
    p_user_id: userId,
    p_list_name: name,
    p_list_description: description,
    p_list_date: date,
  });

  if (error) {
    throw new Error(
      `Error creating and associating gift list: ${error.message}`
    );
  }

  const createdGiftListEntity = data[0];
  return {
    id: createdGiftListEntity.id,
    name: createdGiftListEntity.name,
    description: createdGiftListEntity.description,
    date: createdGiftListEntity.date,
    isOwner: true,
    users: createdGiftListEntity.users.map((user: any) => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
    gifts: [], // Lista de regalos vacía
  };
}

export async function getGiftListsByUserIdRepo(
  userId: string
): Promise<GiftList[]> {
  const { data, error } = await supabase.rpc("get_gift_lists_from_user", {
    userid: userId,
  });

  if (error) {
    throw new Error(`Error fetching gift lists: ${error.message}`);
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    date: item.date,
    users: item.users.map((user: any) => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
    gifts: [], // Lista de regalos vacía
    isOwner: item.is_owner,
  }));
}

export async function deleteGiftListRepo(giftListId: string): Promise<void> {
  const { error } = await supabase
    .from("giftlists")
    .delete()
    .eq("id", giftListId);

  if (error) {
    throw new Error(`Error deleting gift list: ${error.message}`);
  }
}
