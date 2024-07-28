// components/client-register.tsx
"use client";

import { useAuthWithRedirect } from "@/hooks/use-auth-with-redirect";
import RegisterForm from "@/components/register-form";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function ClientRegister() {
  const {
    error,
    isPending,
    handleRegisterWithRedirect,
    handleGoogleSignInWithRedirect,
    getRedirectPath,
  } = useAuthWithRedirect();

  return (
    <>
      {isPending && <Spinner />}
      <RegisterForm
        onSubmit={handleRegisterWithRedirect}
        error={error}
        isPending={isPending}
      />
      <div className="text-center mt-4">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(getRedirectPath())}`}
            className="font-medium text-gray-600 hover:underline dark:text-gray-500"
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
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </>
  );
}
