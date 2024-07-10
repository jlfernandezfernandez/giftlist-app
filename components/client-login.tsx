"use client";

import { useAuth } from "@/lib/auth";
import LoginForm from "@/components/login-form";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

export default function ClientLogin() {
  const { error, isPending, handleLogin, handleGoogleSignIn } = useAuth();

  return (
    <>
      {isPending && <Spinner />}
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
    </>
  );
}
