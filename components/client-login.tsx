// components/client-login.tsx
"use client";

import { useAuthWithRedirect } from "@/hooks/use-auth-with-redirect";
import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function ClientLogin() {
  const {
    error,
    handleLoginWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  } = useAuthWithRedirect();

  return (
    <>
      <LoginForm
        onSubmit={handleLoginWithRedirect}
        onGoogleSignIn={handleGoogleSignInWithRedirect}
        error={error}
      />
      <p className="text-sm font-light text-gray-500">
        New to GiftList AI?{" "}
        <Link
          href={`/register?redirect=${encodeURIComponent(getRedirectPath())}`}
          className="font-medium text-gray-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
