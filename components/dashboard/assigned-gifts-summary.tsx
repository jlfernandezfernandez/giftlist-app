import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftItem } from "./gift-item";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { GiftIcon } from "lucide-react";

interface AssignedGiftsSummaryProps {
  user: AuthenticatedUser;
}

export function AssignedGiftsSummary({ user }: AssignedGiftsSummaryProps) {
  const { assignedGifts } = useAssignedGifts(user.uid);

  return (
    <Card className="h-[400px] max-h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium flex items-center">
          <GiftIcon className="h-4 w-4 text-primary mr-2" />
          Your Assigned Gifts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-0">
        {assignedGifts.length > 0 ? (
          <div className="space-y-2">
            {assignedGifts.map((gift) => (
              <GiftItem key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center text-sm">
              You don&apos;t have any assigned gifts yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
