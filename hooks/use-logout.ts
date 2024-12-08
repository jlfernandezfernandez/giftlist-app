import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      // Limpiar el cache de React Query
      queryClient.clear();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      // Aún así intentamos redirigir al usuario
      router.push("/");
    }
  }, [router, queryClient]);

  return handleLogout;
};
