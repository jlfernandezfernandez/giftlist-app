// hooks/use-current-gift-list-id.ts

import { usePathname } from "next/navigation";

export const useCurrentGiftListId = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  if (!id) throw new Error("Gift list ID not found in URL");
  return id;
};
