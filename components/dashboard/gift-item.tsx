// components/dashboard/gift-item.tsx
// This component displays a single gift item in a list

import React from "react";
import Link from "next/link";
import { Gift } from "@/types/gift";
import { Badge } from "@/components/ui/badge";
import { GiftIcon, ExternalLinkIcon } from "lucide-react";
import { badgeVariant, currencySymbol } from "@/lib/gift-utils";

interface GiftItemProps {
  gift: Gift;
}

export function GiftItem({ gift }: GiftItemProps) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
      <div className="flex items-center min-w-0 flex-grow">
        <GiftIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
        <div className="min-w-0 flex-grow">
          <h3 className="font-medium text-sm truncate">{gift.name}</h3>
          <div className="flex items-center mt-0.5 space-x-2">
            {gift.price !== undefined && gift.currency && (
              <span className="text-xs text-muted-foreground">
                {currencySymbol(gift.currency)}
                {gift.price.toFixed(2)}
              </span>
            )}
            <Badge
              variant={badgeVariant(gift.state || "default")}
              className="capitalize px-1 py-0.5 text-xs font-semibold rounded-full"
            >
              {gift.state}
            </Badge>
          </div>
        </div>
      </div>
      {gift.link && (
        <Link
          href={gift.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex-shrink-0"
        >
          <ExternalLinkIcon className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </Link>
      )}
    </div>
  );
}
