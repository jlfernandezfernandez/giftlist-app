import { useMemo } from "react";
import { useGiftList } from "@/context/gift-list-context";
import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { Card, CardContent } from "@/components/ui/card";
import { AuthenticatedUser } from "@/types/authenticated-user";
import {
  GiftIcon,
  Share2Icon,
  PackageIcon,
  UserCheckIcon,
  BanknoteIcon,
  PiggyBankIcon,
} from "lucide-react";
import { useGifts } from "@/context/gifts-context";
import { currencySymbol } from "@/lib/gift-utils";

type WidgetProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

function Widget({ title, value, icon }: WidgetProps) {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardContent className="p-3 sm:p-4 flex flex-col h-full justify-between">
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            {title}
          </span>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

type DashboardWidgetsProps = {
  user: AuthenticatedUser;
};

export function DashboardWidgets({ user }: DashboardWidgetsProps) {
  const { giftLists } = useGiftList();
  const { gifts } = useGifts();
  const { assignedGifts } = useAssignedGifts(user.uid);

  const {
    ownGiftLists,
    sharedGiftLists,
    ownGifts,
    totalAssignedGiftsValue,
    totalOwnGiftsValue,
  } = useMemo(() => {
    const ownLists = giftLists?.filter((list) => list.isOwner) ?? [];
    const sharedLists = giftLists?.filter((list) => !list.isOwner) ?? [];
    const ownGifts = ownLists.flatMap((list) => gifts[list.id] || []);

    // Calculate total value for assigned gifts
    const assignedValueByCurrency = assignedGifts.reduce((acc, gift) => {
      if (gift.price && gift.currency) {
        acc[gift.currency] = (acc[gift.currency] || 0) + gift.price;
      }
      return acc;
    }, {} as Record<string, number>);

    // Calculate total value for own gifts
    const ownValueByCurrency = ownGifts.reduce((acc, gift) => {
      if (gift.price && gift.currency) {
        acc[gift.currency] = (acc[gift.currency] || 0) + gift.price;
      }
      return acc;
    }, {} as Record<string, number>);

    // Format total value strings
    const formatTotalValue = (valueByCurrency: Record<string, number>) =>
      Object.entries(valueByCurrency).length > 0
        ? Object.entries(valueByCurrency)
            .map(
              ([currency, value]) =>
                `${currencySymbol(currency)}${value.toFixed(2)}`
            )
            .join(", ")
        : "0";

    return {
      ownGiftLists: ownLists,
      sharedGiftLists: sharedLists,
      ownGifts,
      totalAssignedGiftsValue: formatTotalValue(assignedValueByCurrency),
      totalOwnGiftsValue: formatTotalValue(ownValueByCurrency),
    };
  }, [giftLists, gifts, assignedGifts]);

  const widgetData: WidgetProps[] = [
    {
      title: "Own Lists",
      value: ownGiftLists.length,
      icon: <GiftIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "My Gifts",
      value: ownGifts.length,
      icon: <PackageIcon className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Own Gifts Value",
      value: totalOwnGiftsValue,
      icon: <PiggyBankIcon className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "Shared Lists",
      value: sharedGiftLists.length,
      icon: <Share2Icon className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Assigned Gifts",
      value: assignedGifts.length,
      icon: <UserCheckIcon className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Assigned Gifts Value",
      value: totalAssignedGiftsValue,
      icon: <BanknoteIcon className="h-5 w-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-4">
      {widgetData.map((data, index) => (
        <Widget key={index} {...data} />
      ))}
    </div>
  );
}
