import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift } from "@/types/gift";
import { TrashIcon, FilePenIcon } from "@/components/icons";
import { InitialAvatar } from "../ui/initial-avatar";

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

  const currencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "";
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
        <div className="font-medium">
          {currencySymbol(gift.currency)}
          {gift.prize.toFixed(2)}
        </div>
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
            <InitialAvatar key={assignee.uid} name={assignee.displayName} />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button size="icon">
            <FilePenIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
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
