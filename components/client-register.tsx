// components/client-register.tsx
"use client";

import { useAuthWithRedirect } from "@/hooks/use-auth-with-redirect";
import RegisterForm from "@/components/register-form";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function ClientRegister() {
  const {
    error,
    handleRegisterWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  } = useAuthWithRedirect();

  return (
    <>
      <RegisterForm
        onSubmit={handleRegisterWithRedirect}
        error={error}
      />
      <div className="text-center mt-4">
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(getRedirectPath())}`}
            className="font-medium text-gray-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
      <div className="flex justify-center mt-2">
        <Button
          type="button"
          variant="blue"
          className="w-full"
          onClick={handleGoogleSignInWithRedirect}
        >
          Sign in with Google
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
