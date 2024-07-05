"use client";

import { User } from "@/types/user";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
  registerWithEmailAndPassword,
} from "./firebase_auth";
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
      await registerWithEmailAndPassword(name, email, password);
      router.push("/dashboard");
    } catch (e) {
      setError((e as Error).message);
    }
    setIsPending(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setError("");
    setIsPending(true);
    try {
      const user: User | null = await authenticateWithCredentials(
        email,
        password
      );
      if (user) {
        console.log("Usuario autenticado:", user.email);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        router.push("/dashboard");
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
      const user: User = await authenticateWithGoogle();
      if (user) {
        console.log("Usuario autenticado con Google:", user.email);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        router.push("/dashboard");
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
