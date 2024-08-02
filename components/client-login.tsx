// components/client-login.tsx
"use client";

import { useAuthWithRedirect } from "@/hooks/use-auth-with-redirect";
import LoginForm from "@/components/login-form";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

export default function ClientLogin() {
  const {
    error,
    isPending,
    handleLoginWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  } = useAuthWithRedirect();

  return (
    <>
      {isPending && <Spinner />}
      <LoginForm
        onSubmit={handleLoginWithRedirect}
        onGoogleSignIn={handleGoogleSignInWithRedirect}
        error={error}
        isPending={isPending}
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
