// components/GiftList.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GiftItem } from "./GiftItem";

interface GiftListProps {
  currentList: any;
  handleEditList: () => void;
  handleShareList: () => void;
  handleRemoveGift: (listId: number, giftId: number) => void;
  setShowAddGiftModal: (value: boolean) => void;
}

export const GiftList = ({
  currentList,
  handleEditList,
  handleShareList,
  handleRemoveGift,
  setShowAddGiftModal,
}: GiftListProps) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{currentList.name} Gifts</CardTitle>
          <CardDescription>
            View and manage your recent {currentList.name} gifts.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleEditList}>
            <FilePenIcon className="h-4 w-4 mr-2" />
            Edit List
          </Button>
          <Button variant="outline" onClick={handleShareList}>
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
          {currentList.gifts.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              currentListId={currentList.id}
              handleRemoveGift={handleRemoveGift}
            />
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Button variant="outline" onClick={() => setShowAddGiftModal(true)}>
        Add Gift
      </Button>
    </CardFooter>
  </Card>
);
