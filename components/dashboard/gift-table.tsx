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
import { useState, useEffect } from "react";
import SmallSpinner from "../ui/small-spinner";
import { AuthenticatedUser } from "@/types/authenticated-user";
import Modal from "@/components/ui/modal";

interface GiftTableProps {
  user: AuthenticatedUser | null;
  currentListId: string;
}

export function GiftTable({ user, currentListId }: GiftTableProps) {
  const [currentList, setCurrentList] = useState<GiftList | null>(null);
  const [newGiftUrl, setNewGiftUrl] = useState("");
  const [isAddingGift, setIsAddingGift] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchGiftList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/gift-lists/${currentListId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch gift list");
        }
        const data: GiftList = await response.json();
        setCurrentList(data);
      } catch (error) {
        console.error("Error fetching gift list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftList();
  }, [currentListId, user]);

  const handleAddGift = async (url: string) => {
    if (!currentList || !url) return;
    const response = await fetch("/api/get-gift-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const giftDetails = await response.json();

    const newGift = {
      id: currentList.gifts.length + 1,
      ...giftDetails,
    };

    setCurrentList((prevList) => {
      if (!prevList) return prevList;
      return {
        ...prevList,
        gifts: [...prevList.gifts, newGift],
      };
    });
  };

  const handleRemoveGift = (giftId: string) => {
    setCurrentList((prevList) => {
      if (!prevList) return prevList;
      return {
        ...prevList,
        gifts: prevList.gifts.filter((gift) => gift.id !== giftId),
      };
    });
  };

  const handleShareList = () => {
    console.log("Sharing gift list:", currentList?.name);
  };

  const handleAddGiftClick = async () => {
    setIsAddingGift(true);
    await handleAddGift(newGiftUrl);
    setIsAddingGift(false);
    setNewGiftUrl("");
  };

  if (isLoading || !user || !currentList) {
    return <SmallSpinner />;
  }

  const isOwner =
    currentList.users?.some(
      (listUser) => listUser.userId === user.uid && listUser.role === "owner"
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
        <div className="overflow-por-auto">
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
