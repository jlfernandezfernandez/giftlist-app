// components/dashboard/avatar-section.tsx

import { AuthenticatedUser } from "@/types/authenticated-user";
import Link from "next/link";
import { SettingsIcon, ChevronRightIcon } from "lucide-react";

interface AvatarSectionProps {
  user: AuthenticatedUser | null;
}

export function AvatarSection({ user }: AvatarSectionProps) {
  const displayName = user?.displayName || "Guest";

  return (
    <div className="flex flex-col space-y-2">
      <Link
        href="/user-settings"
        className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
            {displayName}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
      </Link>
    </div>
  );
}
