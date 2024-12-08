// hooks/use-auth-with-redirect.ts
"use client";

import { useAuth } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useAuthWithRedirect() {
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const getRedirectPath = useCallback(() => {
    return searchParams?.get("redirect") || "/gift-list/dashboard";
  }, [searchParams]);

  const redirect = useCallback(() => {
    setIsRedirecting(true);
    router.push(getRedirectPath());
  }, [router, getRedirectPath]);

  const handleAuthAction = useCallback(
    async (authFn: () => Promise<unknown>): Promise<void> => {
      try {
        const result = await authFn();
        if (result) redirect();
      } finally {
        setIsRedirecting(false);
      }
    },
    [redirect]
  );

  const handleRegisterWithRedirect = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      await handleAuthAction(() => auth.handleRegister(name, email, password));
    },
    [auth, handleAuthAction]
  );

  const handleLoginWithRedirect = useCallback(
    async (email: string, password: string): Promise<void> => {
      await handleAuthAction(() => auth.handleLogin(email, password));
    },
    [auth, handleAuthAction]
  );

  const handleGoogleSignInWithRedirect =
    useCallback(async (): Promise<void> => {
      await handleAuthAction(() => auth.handleGoogleSignIn());
    }, [auth, handleAuthAction]);

  return {
    ...auth,
    isRedirecting,
    handleRegisterWithRedirect,
    handleLoginWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  };
}
