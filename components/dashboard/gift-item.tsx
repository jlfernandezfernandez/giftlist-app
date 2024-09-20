// components/dashboard/gift-item.tsx
// This component displays a single gift item as a table row

import React from "react";
import Link from "next/link";
import { Gift } from "@/types/gift";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "lucide-react";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";
import { TableCell, TableRow } from "@/components/ui/table";

interface GiftItemProps {
  gift: Gift;
}

export function GiftItem({ gift }: GiftItemProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center">
          <span className="font-medium">{gift.name}</span>
          {gift.link && (
            <Link
              href={gift.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <ExternalLinkIcon className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </Link>
          )}
        </div>
      </TableCell>
      <TableCell>{gift.description}</TableCell>
      <TableCell>
        {gift.price !== undefined && gift.currency && (
          <span className="text-muted-foreground">
            {currencySymbol(gift.currency)}
            {gift.price.toFixed(2)}
          </span>
        )}
      </TableCell>
      <TableCell>
        <Badge
          variant={badgeVariant(gift.state || "default")}
          className="capitalize"
        >
          {gift.state}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
