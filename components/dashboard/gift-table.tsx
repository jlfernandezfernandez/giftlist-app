// app/components/dashboard/gift-table.tsx

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
import { GiftList } from "@/types/gift-list";
import { AICircleIcon, FilePenIcon, ShareIcon } from "../icons";
import { GiftRow } from "./gift-row";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SmallSpinner from "../ui/small-spinner";
import { AuthenticatedUser } from "@/types/authenticated-user";

interface GiftTableProps {
  user: AuthenticatedUser;
  currentList: GiftList;
  setShowEditListModal: (show: boolean) => void;
  handleShareList: () => void;
  handleRemoveGift: (listId: string, giftId: string) => void;
  handleAddGift: (url: string) => void;
}

export function GiftTable({
  currentList,
  setShowEditListModal,
  handleShareList,
  handleRemoveGift,
  handleAddGift,
  user,
}: GiftTableProps) {
  const [newGiftUrl, setNewGiftUrl] = useState("");
  const [isAddingGift, setIsAddingGift] = useState(false);

  const handleAddGiftClick = async () => {
    setIsAddingGift(true);
    setTimeout(() => {
      handleAddGift(newGiftUrl);
      setIsAddingGift(false);
      setNewGiftUrl("");
    }, 2000);
  };

  const isOwner = currentList.users.some(
    (listUser) => listUser.userId === user.uid && listUser.role === "owner"
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{currentList?.name} Gifts</CardTitle>
            <CardDescription>{currentList?.description}</CardDescription>
            <div className="text-sm text-muted-foreground mt-1">
              {new Date(currentList.date).toLocaleDateString()}
            </div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowEditListModal(true)}>
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
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Gift</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentList?.gifts.map((gift) => (
                <GiftRow
                  user={user}
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
    </Card>
  );
}
