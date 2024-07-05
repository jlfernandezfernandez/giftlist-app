import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface InitialAvatarProps {
  name: string | null;
  imageUrl?: string;
}

export function InitialAvatar({ name, imageUrl }: InitialAvatarProps) {
  const initial = name ? name.charAt(0).toUpperCase() : null;

  if (initial) {
    return (
      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
        {" "}
        {initial}
      </div>
    );
  }

  return (
    <Avatar className="w-6 h-6">
      <AvatarImage src={imageUrl || "/placeholder-user.jpg"} />
    </Avatar>
  );
}
