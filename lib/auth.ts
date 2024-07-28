// lib/auth.ts
import { syncUserWithSupabase } from "@/lib/services/user-service";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
  registerWithEmailAndPassword,
} from "@/lib/firebase_auth";
import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useAuth() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleAuth = async (
    authFunction: () => Promise<AuthenticatedUser | null>
  ): Promise<AuthenticatedUser | null> => {
    setError("");
    setIsPending(true);
    try {
      const user = await authFunction();
      if (user) {
        await syncUserWithSupabase(user);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        return user;
      }
      return null;
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
