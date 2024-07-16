// hooks/use-current-gift-list-id.ts

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useCurrentGiftListId = () => {
  const pathname = usePathname();
  return useMemo(() => pathname.split("/")[2] || null, [pathname]);
};
