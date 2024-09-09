// components/dashboard/avatar-section.tsx

import { AuthenticatedUser } from "@/types/authenticated-user";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  const displayName = user?.displayName || "Guest";
  const truncatedName = displayName.split(" ").slice(0, 3).join(" ");

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
          {truncatedName}
        </h2>
        {user?.email && (
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {user.email}
          </p>
        )}
      </div>
    </div>
  );
}
