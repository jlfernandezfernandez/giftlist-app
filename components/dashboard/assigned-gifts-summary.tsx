import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftItem } from "./gift-item";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { GiftIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AssignedGiftsSummaryProps {
  user: AuthenticatedUser;
}

export function AssignedGiftsSummary({ user }: AssignedGiftsSummaryProps) {
  const { assignedGifts } = useAssignedGifts(user.uid);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <GiftIcon className="h-4 w-4 text-primary mr-2" />
          Your Assigned Gifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assignedGifts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedGifts.map((gift) => (
                <GiftItem key={gift.id} gift={gift} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">
              You don&apos;t have any assigned gifts yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
