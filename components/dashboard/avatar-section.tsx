// components/dashboard/avatar-section.tsx

import { AuthenticatedUser } from "@/types/authenticated-user";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  const displayName = user?.displayName || "Guest";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
            {displayName}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
