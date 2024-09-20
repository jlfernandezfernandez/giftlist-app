"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useGifts } from "@/hooks/use-gifts";
import { useDeleteGiftList } from "@/hooks/use-delete-gift-list";
import { ShareGiftListModal } from "@/components/share-gift-list-modal";
import Spinner from "@/components/ui/spinner";

export default function EditGiftListPage() {
  const router = useRouter();
  const { user } = useUser();
  const currentListId = useCurrentGiftListId();
  const { currentList, setCurrentListId } = useGiftList();
  const { updateGiftList, isLoading: isUpdating } = useUpdateGiftList();
  const { gifts } = useGifts(currentListId);
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
    }
  }, [currentList]);

  useEffect(() => {
    setCurrentListId(currentListId);
  }, [currentListId, setCurrentListId]);

  if (!user || !currentList) {
    return <Spinner />;
  }

  // Comprobar si el usuario actual es propietario de la lista
  const isOwner = currentList.users.some(
    (u) => u.userId === user.uid && u.role === "owner"
  );

  if (!isOwner) {
    router.push(`/gift-list/${currentListId}`);
    return null;
  }

  const handleSubmit = async () => {
    await updateGiftList(currentList.id, name, description, date);
  };

  const handleShareList = () => {
    setIsShareModalOpen(true);
  };

  const handleDeleteList = async () => {
    if (window.confirm("Are you sure you want to delete this gift list?")) {
      await deleteGiftList(currentList.id);
      router.push("/gift-list/dashboard");
    }
  };

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
            isLoading={isUpdating}
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
              {currentList.users
                .filter((user) => user.role === "owner")
                .map((owner) => (
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
              {currentList.users
                .filter((user) => user.role !== "owner")
                .map((member) => (
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
              {gifts.map((gift) => (
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
