import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthenticatedUser } from "@/types/authenticated-user";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { GiftIcon } from "lucide-react";

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
                <TableRow key={gift.id}>
                  <TableCell>
                    <Link
                      href={`/gifts/${gift.id}`}
                      className="hover:underline"
                    >
                      {gift.name}
                    </Link>
                  </TableCell>
                  <TableCell>{gift.description}</TableCell>
                  <TableCell>{gift.price}</TableCell>
                  <TableCell>{gift.state}</TableCell>
                </TableRow>
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
