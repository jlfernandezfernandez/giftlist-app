// lib/repositories/gift-lists-repository.ts
import { supabase } from "@/lib/supabase.client";
import { GiftList } from "@/types/gift-list";

export async function getGiftListsByUserId(
  userId: string
): Promise<GiftList[]> {
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

  return data as GiftList[];
}

export async function createGiftList(
  giftList: GiftList,
  userId: string
): Promise<GiftList> {
  const { data: giftListData, error: giftListError } = await supabase
    .from("giftlists")
    .insert([giftList])
    .select();

  if (giftListError) {
    throw new Error(`Error creating gift list: ${giftListError.message}`);
  }

  const { error: giftListUserError } = await supabase
    .from("giftlistusers")
    .insert([{ giftListId: giftListData[0].id, userId, roleId: "owner" }]);

  if (giftListUserError) {
    throw new Error(
      `Error associating user with gift list: ${giftListUserError.message}`
    );
  }

  return giftListData[0];
}
