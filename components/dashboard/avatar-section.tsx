// components/dashboard/avatar-section.tsx

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuthenticatedUser } from "@/types/authenticated-user";
import Link from "next/link";
import { SettingsIcon } from "lucide-react"; // Importa el ícono de configuraciones

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={"/placeholder-user.jpeg"} />
        </Avatar>
        <div>
          <div className="text-sm font-semibold text-gray-800">
            {user ? user.displayName : "Guest"}
          </div>
          <Link href="/user-settings">
            <div className="flex items-center text-sm text-muted-foreground hover:underline cursor-pointer">
              <SettingsIcon className="h-4 w-4 mr-1" />
              User Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
