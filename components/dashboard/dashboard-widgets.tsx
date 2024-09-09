import { useMemo } from "react";
import { useGiftList } from "@/context/gift-list-context";
import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { Card, CardContent } from "@/components/ui/card";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { GiftIcon, Share2Icon, PackageIcon, UserCheckIcon } from "lucide-react";

type WidgetProps = {
  title: string;
  value: number;
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
  const { assignedGifts } = useAssignedGifts(user.uid);

  const { ownGiftLists, sharedGiftLists, totalGifts } = useMemo(() => {
    const ownLists = giftLists?.filter((list) => list.isOwner) ?? [];
    const sharedLists = giftLists?.filter((list) => !list.isOwner) ?? [];
    const total = ownLists.reduce(
      (sum, list) => sum + (list.gifts?.length ?? 0),
      0
    );
    return {
      ownGiftLists: ownLists,
      sharedGiftLists: sharedLists,
      totalGifts: total,
    };
  }, [giftLists]);

  const widgetData: WidgetProps[] = [
    {
      title: "Own Lists",
      value: ownGiftLists.length,
      icon: <GiftIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Shared Lists",
      value: sharedGiftLists.length,
      icon: <Share2Icon className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Gifts",
      value: totalGifts,
      icon: <PackageIcon className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Assigned Gifts",
      value: assignedGifts.length,
      icon: <UserCheckIcon className="h-5 w-5 text-orange-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      {widgetData.map((data, index) => (
        <Widget key={index} {...data} />
      ))}
    </div>
  );
}
