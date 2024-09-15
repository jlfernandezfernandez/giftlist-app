import React from "react";
import { Gift } from "@/types/gift";
import { Card, CardContent } from "@/components/ui/card";
import {
  GiftIcon,
  UserCheckIcon,
  ShoppingCartIcon,
  BanknoteIcon,
} from "lucide-react";
import { currencySymbol } from "@/lib/gift-utils";

interface GiftListWidgetsProps {
  gifts: Gift[];
}

export function GiftListWidgets({ gifts }: GiftListWidgetsProps) {
  const totalGifts = gifts.length;
  const reservedGifts = gifts.filter(
    (gift) => gift.assignedUsers && gift.assignedUsers.length > 0
  ).length;
  const totalAssigned = new Set(
    gifts.flatMap((gift) => gift.assignedUsers || []).map((user) => user.userId)
  ).size;

  // Group gifts by currency and calculate total value for each currency
  const totalValueByCurrency = gifts.reduce((acc, gift) => {
    if (gift.price && gift.currency) {
      acc[gift.currency] = (acc[gift.currency] || 0) + gift.price;
    }
    return acc;
  }, {} as Record<string, number>);

  // Format total value string
  const totalValueString = Object.entries(totalValueByCurrency).length > 0
    ? Object.entries(totalValueByCurrency)
        .map(([currency, value]) => `${currencySymbol(currency)}${value.toFixed(2)}`)
        .join(", ")
    : "0";

  const widgetData = [
    {
      title: "Total Gifts",
      value: totalGifts,
      icon: <GiftIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Total Value",
      value: totalValueString,
      icon: <BanknoteIcon className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Reserved",
      value: reservedGifts,
      icon: <ShoppingCartIcon className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Total Assigned",
      value: totalAssigned,
      icon: <UserCheckIcon className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      {widgetData.map((widget, index) => (
        <Card key={index} className="flex flex-col justify-between h-full">
          <CardContent className="p-3 sm:p-4 flex flex-col h-full justify-between">
            <div className="flex items-center space-x-2 mb-2">
              {widget.icon}
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {widget.title}
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold">
              {widget.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GiftListWidgets;
