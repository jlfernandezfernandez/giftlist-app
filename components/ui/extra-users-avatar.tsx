import React from "react";

interface ExtraUsersAvatarProps {
  count: number;
}

export function ExtraUsersAvatar({ count }: ExtraUsersAvatarProps) {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-gray-200 text-gray-600"
      title={`${count} more users`}
    >
      +{count}
    </div>
  );
}
