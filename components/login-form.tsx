// app/components/login-form.tsx
"use client";

import { useState, FormEvent } from "react";
import { AtSign, EyeIcon, EyeOffIcon, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  error: string | null;
}

export default function LoginForm({
  onSubmit,
  onGoogleSignIn,
  error,
}: LoginFormProps) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(form.email, form.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@company.com"
          required
          labelRight={<AtSign className="h-4 w-4" />}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          labelRight={
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          }
        />
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
        <Button type="submit" variant="default" size="lg" className="w-full">
          Sign in
        </Button>
      </div>
      <div className="text-center mt-6">
        <Button
          type="button"
          variant="blue"
          size="lg"
          className="w-full"
          onClick={onGoogleSignIn}
        >
          Sign in with Google
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
