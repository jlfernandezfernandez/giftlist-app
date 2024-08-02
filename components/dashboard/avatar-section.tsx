// components/dashboard/avatar-section.tsx
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuthenticatedUser } from "@/types/authenticated-user";
import Link from "next/link";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={"/placeholder-user.jpeg"} />
        </Avatar>
        <div>
          <div className="font-medium">{user ? user.displayName : "Guest"}</div>
          <Link href="/user-settings">
            <div className="text-sm text-muted-foreground cursor-pointer">
              User Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
