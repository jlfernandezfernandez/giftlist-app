"use client";

import { useAuth } from "@/app/lib/auth";
import RegisterForm from "@/components/register-form";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function ClientRegister() {
  const { error, isPending, handleRegister, handleGoogleSignIn } = useAuth();

  return (
    <>
      {isPending && <Spinner />}
      <RegisterForm
        onSubmit={handleRegister}
        error={error}
        isPending={isPending}
      />
      <div className="text-center mt-4">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-gray-600 hover:underline dark:text-gray-500"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
      <div className="flex justify-center mt-2">
        <Button
          type="button"
          variant="blue"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          Iniciar sesión con Google
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </>
  );
}
