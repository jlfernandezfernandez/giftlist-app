// components/dashboard/avatar-section.tsx

import { AuthenticatedUser } from "@/types/authenticated-user";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  const displayName = user?.displayName || "Guest";
  const truncatedName = displayName.split(" ").slice(0, 3).join(" ");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {truncatedName}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
