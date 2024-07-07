// app/components/login-form.tsx
"use client";

import { useState, FormEvent } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  error: string;
  isPending: boolean;
}

export default function LoginForm({
  onSubmit,
  onGoogleSignIn,
  error,
  isPending,
}: LoginFormProps) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(form.email, form.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tu email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AtSymbolIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Contraseña
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <KeyIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="text-center mt-6">
        <Button
          type="submit"
          variant="default"
          alignment="left"
          className="w-full"
          aria-disabled={isPending}
        >
          Iniciar sesión
        </Button>
      </div>
      <div className="text-center mt-6">
        <Button
          type="button"
          variant="blue"
          className="w-full"
          onClick={onGoogleSignIn}
        >
          Iniciar sesión con Google
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
