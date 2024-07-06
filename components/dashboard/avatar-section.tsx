import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthenticatedUser } from "@/types/authenticated-user";

interface AvatarSectionProps {
  user: AuthenticatedUser;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>
            {user.displayName ? user.displayName[0] : user.email[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.displayName}</div>
          <div className="text-sm text-muted-foreground">User Settings</div>
        </div>
      </div>
    </div>
  );
}
