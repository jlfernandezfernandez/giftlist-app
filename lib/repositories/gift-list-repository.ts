// lib/repositories/gift-list-repository.ts
import { supabase } from "@/lib/supabase.client";
import { GiftList } from "@/types/gift-list";

export async function createAndAssociateGiftListRepo(
  userId: string,
  name: string,
  description: string | null,
  date: string | null
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

export async function updateGiftListRepo(
  giftListId: string,
  name: string,
  description: string | null,
  date: string | null,
  userId: string
): Promise<GiftList> {
  const { data, error } = await supabase.rpc("update_gift_list", {
    p_gift_list_id: giftListId,
    p_name: name,
    p_description: description,
    p_date: date,
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Error updating gift list: ${error.message}`);
  }

  const updatedGiftListEntity = data[0];
  return {
    id: updatedGiftListEntity.id,
    name: updatedGiftListEntity.name,
    description: updatedGiftListEntity.description,
    date: updatedGiftListEntity.date,
    isOwner: true, // Asumimos que si puede actualizar, es propietario
    users: updatedGiftListEntity.users.map((user: any) => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
    gifts: [],
  };
}

export async function associateUserToGiftListRepo(
  giftListId: string,
  userId: string,
  role: string
): Promise<any> {
  const { data, error } = await supabase.rpc("associate_user_to_gift_list", {
    p_gift_list_id: giftListId,
    p_user_id: userId,
    p_role: role,
  });

  if (error) throw error;

  return data;
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
