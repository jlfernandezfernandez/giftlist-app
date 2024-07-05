// components/GiftItem.tsx
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GiftItemProps {
  gift: any;
  currentListId: number;
  handleRemoveGift: (listId: number, giftId: number) => void;
}

export const GiftItem = ({
  gift,
  currentListId,
  handleRemoveGift,
}: GiftItemProps) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">
        <Link href="#" className="underline" prefetch={false}>
          {gift.name}
        </Link>
      </div>
    </TableCell>
    <TableCell>
      <div className="font-medium">${gift.prize.toFixed(2)}</div>
    </TableCell>
    <TableCell>
      <div className="font-medium">{gift.website}</div>
    </TableCell>
    <TableCell>
      <Badge
        variant={
          gift.status === "Pending"
            ? "secondary"
            : gift.status === "Reserved"
            ? "success"
            : "success"
        }
      >
        {gift.status}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        {gift.assignedTo.map((assignee) => (
          <Avatar key={assignee.id} className="w-6 h-6">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{assignee.initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          color="destructive"
          onClick={() => handleRemoveGift(currentListId, gift.id)}
        >
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </TableCell>
  </TableRow>
);
``;
