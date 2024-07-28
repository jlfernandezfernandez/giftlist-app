// lib/auth.ts
"use client";

import { syncUserWithSupabase } from "@/lib/services/user-service";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
  registerWithEmailAndPassword,
} from "@/lib/firebase_auth";
import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleAuth = async (
    authFunction: () => Promise<AuthenticatedUser>
  ): Promise<AuthenticatedUser | null> => {
    setError(null);
    setIsPending(true);
    try {
      const user = await authFunction();
      await syncUserWithSupabase(user);
      return user;
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
      return null;
    } finally {
      setIsPending(false);
    }
  };

  const handleRegister = (name: string, email: string, password: string) =>
    handleAuth(() => registerWithEmailAndPassword(name, email, password));

  const handleLogin = (email: string, password: string) =>
    handleAuth(() => authenticateWithCredentials(email, password));

  const handleGoogleSignIn = () => handleAuth(authenticateWithGoogle);

  return {
    error,
    isPending,
    handleRegister,
    handleLogin,
    handleGoogleSignIn,
  };
}
