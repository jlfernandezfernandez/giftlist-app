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

interface GiftTableProps {
  currentList: GiftList;
  setShowEditListModal: (show: boolean) => void;
  handleShareList: () => void;
  handleRemoveGift: (listId: number, giftId: number) => void;
  handleAddGift: (url: string) => void;
}

export function GiftTable({
  currentList,
  setShowEditListModal,
  handleShareList,
  handleRemoveGift,
  handleAddGift,
}: GiftTableProps) {
  const [newGiftUrl, setNewGiftUrl] = useState("");

  const handleAddGiftClick = () => {
    handleAddGift(newGiftUrl);
    setNewGiftUrl("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{currentList?.name} Gifts</CardTitle>
            <CardDescription>
              View and manage your recent {currentList?.name} gifts.
            </CardDescription>
          </div>
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
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gift</TableHead>
              <TableHead>Prize</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentList?.gifts.map((gift) => (
              <GiftRow
                key={gift.id}
                gift={gift}
                listId={currentList.id}
                handleRemoveGift={handleRemoveGift}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2 w-full">
          <Input
            id="new-gift-url"
            value={newGiftUrl}
            onChange={(e) => setNewGiftUrl(e.target.value)}
            placeholder="Paste url to add with AI"
            className="flex-grow"
          />
          <Button onClick={handleAddGiftClick}>
            <AICircleIcon className="h-4 w-4 mr-2" />
            Add Gift
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
