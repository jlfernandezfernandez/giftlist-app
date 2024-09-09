import React from "react";
import { Gift } from "@/types/gift";
import { Card, CardContent } from "@/components/ui/card";
import {
  GiftIcon,
  DollarSignIcon,
  UserCheckIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface GiftListWidgetsProps {
  gifts: Gift[];
}

export function GiftListWidgets({ gifts }: GiftListWidgetsProps) {
  const totalGifts = gifts.length;
  const totalValue = gifts.reduce((sum, gift) => sum + (gift.price || 0), 0);
  const reservedGifts = gifts.filter(
    (gift) => gift.assignedUsers && gift.assignedUsers.length > 0
  ).length;
  const totalAssigned = new Set(
    gifts.flatMap((gift) => gift.assignedUsers || []).map((user) => user.userId)
  ).size;

  const widgetData = [
    {
      title: "Total Gifts",
      value: totalGifts,
      icon: <GiftIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: <DollarSignIcon className="h-5 w-5 text-green-500" />,
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
