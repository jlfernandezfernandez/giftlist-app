// app/components/dashboard/gift-row.tsx

import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift } from "@/types/gift";
import { Tooltip } from "@geist-ui/core";

import {
  TrashIcon,
  FilePenIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UserMinusIcon,
  GlobeIcon,
  InfoIcon,
} from "@/components/icons";
import { InitialAvatar } from "../ui/initial-avatar";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";

interface GiftRowProps {
  user: AuthenticatedUser;
  gift: Gift;
  listId: string;
  handleRemoveGift: (listId: string, giftId: string) => void;
  isOwner: boolean;
}

export function GiftRow({
  user,
  gift,
  listId,
  handleRemoveGift,
  isOwner,
}: GiftRowProps) {
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignGift = async () => {
    setIsAssigning(true);
    await fetch(`/api/assign-gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, giftId: gift.id, userId: user.uid }),
    });
    setIsAssigning(false);
    // Aquí deberías actualizar el estado del regalo para reflejar el cambio
  };

  const handleUnassignGift = async () => {
    setIsAssigning(true);
    await fetch(`/api/unassign-gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, giftId: gift.id, userId: user.uid }),
    });
    setIsAssigning(false);
    // Aquí deberías actualizar el estado del regalo para reflejar el cambio
  };

  const isAssigned = gift.assignedUsers.map(
    (assignedUser) => assignedUser.userId === user.uid
  );

  return (
    <TableRow className="h-12">
      <TableCell className="w-1/4 whitespace-nowrap">
        <div className="font-medium truncate">
          <Link
            href={gift.link}
            target="_blank"
            className="underline"
            prefetch={false}
          >
            {gift.name}
          </Link>
        </div>
      </TableCell>
      <TableCell className="w-1/12 whitespace-nowrap">
        {gift.description && (
          <Tooltip text={gift.description}>
            <InfoIcon className="h-4 w-4 ml-2 inline-block" />
          </Tooltip>
        )}
      </TableCell>
      <TableCell className="w-1/8 whitespace-nowrap">
        <div className="font-medium">
          {gift.currency ? currencySymbol(gift.currency) : "-"}
          {gift.price ? gift.price.toFixed(2) : "-"}
        </div>
      </TableCell>
      <TableCell className="w-1/6 whitespace-nowrap">
        <div className="font-medium truncate">{gift.website}</div>
      </TableCell>
      <TableCell className="w-1/10 whitespace-nowrap">
        <Badge variant={badgeVariant(gift.state)}>{gift.state}</Badge>
      </TableCell>
      <TableCell className="w-1/4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {gift.assignedUsers.map((assignee) => (
            <InitialAvatar key={assignee.userId} name={assignee.displayName} />
          ))}
        </div>
      </TableCell>
      <TableCell className="w-1/10 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {isOwner ? (
            <>
              <Button size="icon" title="Edit Gift">
                <FilePenIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleRemoveGift(listId, gift.id)}
                title="Delete Gift"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </>
          ) : (
            <>
              {gift.state === "bought" ? (
                <Button
                  size="icon"
                  onClick={() => window.open(gift.link, "_blank")}
                  title="View Product"
                >
                  <GlobeIcon className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
              ) : (
                <Button
                  size="icon"
                  onClick={() => window.open(gift.link, "_blank")}
                  title="Buy Gift"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span className="sr-only">Buy</span>
                </Button>
              )}
              {isAssigned ? (
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={handleUnassignGift}
                  disabled={isAssigning}
                  title="Unassign Gift"
                >
                  <UserMinusIcon className="h-4 w-4" />
                  <span className="sr-only">Unassign</span>
                </Button>
              ) : (
                <Button
                  size="icon"
                  onClick={handleAssignGift}
                  disabled={isAssigning}
                  title="Assign Gift"
                >
                  <UserPlusIcon className="h-4 w-4" />
                  <span className="sr-only">Assign</span>
                </Button>
              )}
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
