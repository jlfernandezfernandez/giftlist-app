"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithEmailAndPassword } from "@/app/lib/actions";
import RegisterForm from "@/components/register-form";
import Link from "next/link";

export default function Register() {
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

  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Crea tu cuenta de GiftList
          </h1>
          <RegisterForm
            onSubmit={handleRegister}
            error={error}
            isPending={isPending}
          />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-600 hover:underline dark:text-gray-500"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
