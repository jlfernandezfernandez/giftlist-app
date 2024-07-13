// lib/repositories/gift-list-repository.ts
import { supabase } from "@/lib/supabase.client";
import { GiftListEntity } from "@/types/gift-list-entity";

export async function getGiftListsByUserIdRepo(
  userId: string
): Promise<GiftListEntity[]> {
  const { data: giftListUsers, error: giftListUsersError } = await supabase
    .from("giftlistusers")
    .select("giftListId")
    .eq("userId", userId);

  if (giftListUsersError) {
    throw new Error(
      `Error fetching gift list users: ${giftListUsersError.message}`
    );
  }

  if (!giftListUsers) {
    return [];
  }

  const giftListIds = giftListUsers.map((glu: any) => glu.giftListId);
  const { data, error } = await supabase
    .from("giftlists")
    .select("*")
    .in("id", giftListIds);

  if (error) {
    throw new Error(`Error fetching gift lists: ${error.message}`);
  }

  return data as GiftListEntity[];
}

export async function createGiftListRepo(
  giftList: Omit<GiftListEntity, "id">,
  userId: string
): Promise<GiftListEntity> {
  const { data: giftListData, error: giftListError } = await supabase
    .from("giftlists")
    .insert([giftList])
    .select();

  if (giftListError) {
    throw new Error(`Error creating gift list: ${giftListError.message}`);
  }

  const { error: giftListUserError } = await supabase
    .from("giftlistusers")
    .insert([{ giftlist_id: giftListData[0].id, user_id: userId, role_id: 1 }]);

  if (giftListUserError) {
    throw new Error(
      `Error associating user with gift list: ${giftListUserError.message}`
    );
  }

  return giftListData[0];
}
