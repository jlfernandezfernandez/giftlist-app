import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface InitialAvatarProps {
  name: string | null;
  imageUrl?: string;
}

function stringToColor(string: string): string {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

export function InitialAvatar({ name, imageUrl }: InitialAvatarProps) {
  const initials = name ? name.slice(0, 1).toUpperCase() : null;
  const backgroundColor = name ? stringToColor(name) : "gray";

  if (initials) {
    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
        style={{ backgroundColor }}
        title={name || "Anonymous User"}
      >
        {initials}
      </div>
    );
  }

  return (
    <Avatar className="w-6 h-6" title={name || "Unknown"}>
      <AvatarImage src={imageUrl || "/placeholder-user.jpeg"} />
    </Avatar>
  );
}
