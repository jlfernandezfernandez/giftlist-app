// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
} from "@/app/lib/actions";
import { User } from "@/types/user";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

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
      const user: User | null = await authenticateWithGoogle();
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Inicia sesión en tu cuenta
          </h1>
          <LoginForm
            onSubmit={handleLogin}
            onGoogleSignIn={handleGoogleSignIn}
            error={error}
            isPending={isPending}
          />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            ¿Eres nuevo en GiftList?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-600 hover:underline dark:text-gray-500"
            >
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
