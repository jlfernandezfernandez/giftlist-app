import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthenticatedUser } from "@/types/authenticated-user";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          {user ? (
            <div>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {user.displayName ? user.displayName[0] : user.email[0]}
              </AvatarFallback>
            </div>
          ) : (
            <div>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </div>
          )}
        </Avatar>
        <div>
          <div className="font-medium">{user ? user.displayName : "Guest"}</div>
          <div className="text-sm text-muted-foreground">User Settings</div>
        </div>
      </div>
    </div>
  );
}
