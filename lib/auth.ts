// lib/auth.ts
"use client";

import { syncUserWithSupabase } from "@/lib/services/user-service";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
  registerWithEmailAndPassword,
} from "@/lib/firebase_auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    setError("");
    setIsPending(true);
    try {
      const user = await registerWithEmailAndPassword(name, email, password);
      if (user) {
        await syncUserWithSupabase(user);
        router.push("/gift-list/create");
      }
    } catch (e) {
      setError((e as Error).message);
    }
    setIsPending(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setError("");
    setIsPending(true);
    try {
      const user = await authenticateWithCredentials(email, password);
      if (user) {
        await syncUserWithSupabase(user);
        console.log("Usuario autenticado:", user.email);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        router.push("/gift-list/create");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
    setIsPending(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsPending(true);
    try {
      const user = await authenticateWithGoogle();
      if (user) {
        await syncUserWithSupabase(user);
        console.log("Usuario autenticado con Google:", user.email);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        router.push("/gift-list/create");
      } else {
        setError("Failed to sign in with Google");
      }
    } catch (error) {
      setError("Failed to sign in with Google");
    }
    setIsPending(false);
  };

  return {
    error,
    isPending,
    handleRegister,
    handleLogin,
    handleGoogleSignIn,
  };
}
