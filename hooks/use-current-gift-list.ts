// hooks/use-current-gift-list.ts
import { usePathname } from "next/navigation";

export const useCurrentGiftListId = () => {
  const pathname = usePathname();
  return pathname.split("/")[2] || null;
};
