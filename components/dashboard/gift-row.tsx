import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gift } from "@/types/gift";
import { TrashIcon, FilePenIcon } from "@/components/icons";

interface GiftRowProps {
  gift: Gift;
  listId: number;
  handleRemoveGift: (listId: number, giftId: number) => void;
}

export function GiftRow({ gift, listId, handleRemoveGift }: GiftRowProps) {
  const badgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Reserved":
        return "warning"; // Amarillo
      case "Purchased":
        return "success"; // Verde
      default:
        return "default";
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">
          <Link
            href={gift.url}
            target="_blank"
            className="underline"
            prefetch={false}
          >
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
        <Badge variant={badgeVariant(gift.status)}>{gift.status}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {gift.assignedTo.map((assignee) => (
            <Avatar key={assignee.uid} className="w-6 h-6">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {assignee.displayName ? assignee.displayName[0] : "U"}
              </AvatarFallback>
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
            onClick={() => handleRemoveGift(listId, gift.id)}
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
