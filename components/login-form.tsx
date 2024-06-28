// components/LoginForm.tsx
"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  authenticateWithCredentials,
  authenticateWithGoogle,
} from "@/app/lib/actions";
import { Button } from "./ui/button";
import { User } from "@/types/user";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const user: User | null = await authenticateWithCredentials(
        formData.get("email") as string,
        formData.get("password") as string
      );
      if (user) {
        console.log("Usuario autenticado:", user.email);
        // Aquí podrías redirigir a la página principal o realizar otra acción después de iniciar sesión
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
    setIsPending(false);
  };

  const handleGoogleSignIn = async () => {
    setIsPending(true);
    try {
      const user: User | null = await authenticateWithGoogle();
      if (user) {
        console.log("Usuario autenticado con Google:", user.email);
        // Aquí podrías redirigir a la página principal o realizar otra acción después de iniciar sesión
      }
    } catch (error) {
      setErrorMessage("Failed to sign in with Google");
    }
    setIsPending(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Inicia sesión en tu cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Correo electrónico"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <AtSymbolIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Contraseña"
                required
                minLength={6}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Mantener la sesión iniciada durante una semana
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿No recuerdas la contraseña?
              </a>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-disabled={isPending}
            >
              Iniciar sesión
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>
          <div className="text-center mt-6">
            <Button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleGoogleSignIn}
            >
              Iniciar sesión con Google
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>
          {errorMessage && (
            <div
              className="flex items-center mt-4 text-sm text-red-600"
              role="alert"
            >
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="ml-2">{errorMessage}</p>
            </div>
          )}
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Eres nuevo en GiftList?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Crea una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
