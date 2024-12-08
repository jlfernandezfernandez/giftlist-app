"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftListForm } from "@/components/gift-list-form";
import { useUpdateGiftList } from "@/hooks/use-update-gift-list";
import { GiftListEditHeader } from "@/components/dashboard/gift-list-edit-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGifts } from "@/context/gifts-context";
import { useDeleteGiftList } from "@/hooks/use-delete-gift-list";
import { ShareGiftListModal } from "@/components/share-gift-list-modal";
import Spinner from "@/components/ui/spinner";
import { User } from "@/types/user";
import Link from "next/link";

export default function EditGiftListPage() {
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const { currentList, setCurrentListId } = useGiftList();
  const mutation = useUpdateGiftList();
  const { gifts, getGiftsForList } = useGifts();
  const { deleteGiftList } = useDeleteGiftList(user);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (currentList) {
      setName(currentList.name);
      setDescription(currentList.description);
      setDate(currentList.date);
      getGiftsForList(currentList.id);
    }
  }, [currentList, getGiftsForList]);

  useEffect(() => {
    setCurrentListId(currentListId);
  }, [currentListId, setCurrentListId]);

  const [owners, members] = useMemo<[Array<User>, Array<User>]>(() => {
    if (!currentList?.users) return [[], []];
    return currentList.users.reduce<[Array<User>, Array<User>]>(
      (acc, user) => {
        if (user.role === "owner") {
          acc[0].push(user);
        } else {
          acc[1].push(user);
        }
        return acc;
      },
      [[], []]
    );
  }, [currentList]);

  const currentGifts = useMemo(
    () => gifts[currentList?.id || ""] || [],
    [gifts, currentList]
  );

  if (!user || !currentList) {
    return <Spinner />;
  }

  if (!currentList.isOwner) {
    return <Link href={`/gift-list/${currentListId}`} />;
  }

  const handleSubmit = async (data: {
    name: string;
    description: string | null;
    date: string | null;
  }) => {
    await mutation.mutateAsync({
      giftListId: currentList.id,
      ...data,
    });
  };

  const handleShareList = () => {
    setIsShareModalOpen(true);
  };

  const handleDeleteList = async () => {
    if (window.confirm("Are you sure you want to delete this gift list?")) {
      await deleteGiftList(currentList.id);
      return <Link href="/gift-list/dashboard" />;
    }
  };

  if (!currentListId) {
    return <div>Gift list not found</div>;
  }

  return (
    <div className="container mx-auto space-y-8">
      <GiftListEditHeader
        onShareList={handleShareList}
        onDeleteList={handleDeleteList}
        listId={currentListId}
      />

      <Card>
        <CardHeader>
          <CardTitle>Edit Gift List</CardTitle>
        </CardHeader>
        <CardContent>
          <GiftListForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
            submitText="Update Gift List"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Owners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.userId}>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.userId}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gifts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentGifts.map((gift) => (
                <TableRow key={gift.id}>
                  <TableCell>{gift.name}</TableCell>
                  <TableCell>{gift.description}</TableCell>
                  <TableCell>
                    {gift.price} {gift.currency}
                  </TableCell>
                  <TableCell>{gift.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ShareGiftListModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        giftList={currentList}
      />
    </div>
  );
}
