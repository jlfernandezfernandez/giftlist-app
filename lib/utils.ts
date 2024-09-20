import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string): string {
  return name.split(" ")[0];
}

export function formatDate(
  date: string | Date | undefined | null
): string | null {
  let formattedDate = null;
  if (date !== undefined && date !== null) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return formattedDate;
}

export function formatOwnerNames(owners: User[]): string {
  if (owners.length === 0) return "";
  if (owners.length === 1) return owners[0].name;
  if (owners.length === 2) return `${owners[0].name} and ${owners[1].name}`;

  const names = owners.map((owner) => owner.name);
  const lastOwner = names.pop();
  return `${names.join(", ")}, and ${lastOwner}`;
}
