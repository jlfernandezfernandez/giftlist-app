// hooks/use-auth-with-redirect.ts
"use client";

import { useAuth } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useAuthWithRedirect() {
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getRedirectPath = useCallback(() => {
    return searchParams?.get("redirect") || "/gift-list/dashboard";
  }, [searchParams]);

  useEffect(() => {
    if (shouldRedirect) {
      const redirectPath = getRedirectPath();
      router.push(redirectPath);
      setShouldRedirect(false);
    }
  }, [shouldRedirect, router, getRedirectPath]);

  const redirect = useCallback(() => {
    setShouldRedirect(true);
  }, []);

  const handleRegisterWithRedirect = async (
    name: string,
    email: string,
    password: string
  ) => {
    const user = await auth.handleRegister(name, email, password);
    if (user) redirect();
  };

  const handleLoginWithRedirect = async (email: string, password: string) => {
    const user = await auth.handleLogin(email, password);
    if (user) redirect();
  };

  const handleGoogleSignInWithRedirect = async () => {
    const user = await auth.handleGoogleSignIn();
    if (user) redirect();
  };

  return {
    ...auth,
    handleRegisterWithRedirect,
    handleLoginWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  };
}
