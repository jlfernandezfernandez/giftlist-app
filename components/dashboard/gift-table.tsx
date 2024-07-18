// components/dashboard/gift-table.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AICircleIcon, FilePenIcon, ShareIcon } from "../icons";
import { GiftRow } from "./gift-row";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SmallSpinner from "../ui/small-spinner";
import { AuthenticatedUser } from "@/types/authenticated-user";
import Modal from "@/components/ui/modal";
import { useGiftList } from "@/hooks/use-gift-list";
import { useAddGift } from "@/hooks/use-add-gift";

interface GiftTableProps {
  authenticatedUser: AuthenticatedUser;
}

export function GiftTable({ authenticatedUser }: GiftTableProps) {
  const [newGiftUrl, setNewGiftUrl] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { currentList, isLoading, refreshGiftList } =
    useGiftList(authenticatedUser);
  const { isAddingGift, setIsAddingGift, handleAddGift } =
    useAddGift(authenticatedUser);

  const handleAddGiftClick = async () => {
    setIsAddingGift(true);
    await handleAddGift(newGiftUrl);
    setIsAddingGift(false);
    setNewGiftUrl("");
  };

  const handleRemoveGift = async (giftId: string) => {
    if (!currentList || !giftId) return;

    const response = await fetch(
      `/api/gift-lists/${currentList.id}/gift/${giftId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error("Failed to remove gift");
      return;
    }

    await refreshGiftList(); // Refrescar la lista después de eliminar un regalo
  };

  const handleShareList = () => {
    console.log("Sharing gift list:", currentList?.name);
  };

  if (isLoading || !authenticatedUser || !currentList) {
    return <SmallSpinner />;
  }

  const isOwner =
    currentList.users?.some(
      (listUser) =>
        listUser.userId === authenticatedUser.uid && listUser.role === "owner"
    ) || false;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{currentList?.name}</CardTitle>
            <CardDescription>{currentList?.description}</CardDescription>
            <div className="text-sm text-muted-foreground mt-1">
              {currentList && new Date(currentList.date).toLocaleDateString()}
            </div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsEditModalOpen(true)}>
                <FilePenIcon className="h-4 w-4 mr-2" />
                Edit List
              </Button>
              <Button onClick={handleShareList}>
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Gift</TableHead>
                <TableHead></TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentList.gifts?.map((gift) => (
                <GiftRow
                  authenticatedUser={authenticatedUser}
                  key={gift.id}
                  gift={gift}
                  listId={currentList.id}
                  handleRemoveGift={handleRemoveGift}
                  isOwner={isOwner}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {isOwner && (
        <CardFooter>
          <div className="flex items-center space-x-2 w-full">
            <Input
              id="new-gift-url"
              value={newGiftUrl}
              onChange={(e) => setNewGiftUrl(e.target.value)}
              placeholder="Paste url to add with AI"
              className="flex-grow"
              disabled={isAddingGift}
            />
            <Button onClick={handleAddGiftClick} disabled={isAddingGift}>
              {isAddingGift ? (
                <SmallSpinner />
              ) : (
                <AICircleIcon className="h-4 w-4 mr-2" />
              )}
              {isAddingGift ? "Adding..." : "Add Gift"}
            </Button>
          </div>
        </CardFooter>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          closeButtonActive
        >
          <h2>Edit Gift List</h2>
          {/* Aquí puedes añadir el contenido de la modal para editar la lista de regalos */}
        </Modal>
      )}
    </Card>
  );
}
