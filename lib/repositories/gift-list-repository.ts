// lib/repositories/gift-list-repository.ts
import { supabase } from "@/lib/supabase.client";
import { GiftListEntity, GiftListCreate } from "@/types/gift-list-entity";
import { Gift } from "@/types/gift";
import { User } from "@/types/user";

export async function getGiftListsByUserIdRepo(
  userId: string
): Promise<GiftListEntity[]> {
  const { data: giftListUsers, error: giftListUsersError } = await supabase
    .from("giftlistusers")
    .select("giftlist_id")
    .eq("user_id", userId);

  if (giftListUsersError) {
    throw new Error(
      `Error fetching gift list users: ${giftListUsersError.message}`
    );
  }

  if (!giftListUsers) {
    return [];
  }

  const giftListIds = giftListUsers.map((glu: any) => glu.giftlist_id);
  const { data, error } = await supabase
    .from("giftlists")
    .select("*")
    .in("id", giftListIds);

  if (error) {
    throw new Error(`Error fetching gift lists: ${error.message}`);
  }

  return data as GiftListEntity[];
}

export async function getGiftListByIdRepo(
  giftListId: string
): Promise<GiftListEntity> {
  const { data, error } = await supabase
    .from("giftlists")
    .select("*")
    .eq("id", giftListId)
    .single();

  if (error) {
    throw new Error(`Error fetching gift list: ${error.message}`);
  }

  return data as GiftListEntity;
}

export async function getUsersByGiftListId(
  giftListId: string
): Promise<User[]> {
  const { data: giftListUsers, error: giftListUsersError } = await supabase
    .from("giftlistusers")
    .select("user_id, role_id")
    .eq("giftlist_id", giftListId);

  if (giftListUsersError) {
    throw new Error(
      `Error fetching users for gift list: ${giftListUsersError.message}`
    );
  }

  if (!giftListUsers) {
    return [];
  }

  const userIds = giftListUsers.map((glu: any) => glu.user_id);
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", userIds);

  if (usersError) {
    throw new Error(`Error fetching users: ${usersError.message}`);
  }

  // Map roles to users
  const usersWithRoles = users.map((user: any) => {
    const userRole = giftListUsers.find((glu: any) => glu.user_id === user.id);

    if (!userRole) {
      throw new Error(`No role found for user with id ${user.id}`);
    }

    return {
      ...user,
      role: userRole.role_id === 1 ? "owner" : "guest",
    };
  });

  return usersWithRoles;
}

export async function getGiftsByGiftListId(
  giftListId: string
): Promise<Gift[]> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("giftlist_id", giftListId);

  if (error) {
    throw new Error(`Error fetching gifts for gift list: ${error.message}`);
  }

  return data as Gift[];
}

export async function createGiftListRepo(
  giftList: GiftListCreate
): Promise<GiftListEntity> {
  const { data, error } = await supabase
    .from("giftlists")
    .insert([giftList])
    .select();

  if (error) {
    throw new Error(`Error creating gift list: ${error.message}`);
  }

  return data[0];
}

export async function associateUserWithGiftList(
  giftListId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("giftlistusers")
    .insert([{ giftlist_id: giftListId, user_id: userId, role_id: "1" }]);

  if (error) {
    throw new Error(`Error associating user with gift list: ${error.message}`);
  }
}
