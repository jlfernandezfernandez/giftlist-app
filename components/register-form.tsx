"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Asegúrate de importar estos iconos o usa los que prefieras

export interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  error: string | null;
}

export default function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (form.password !== form.confirmation) {
      alert("Passwords don't match");
      return;
    }
    await onSubmit(form.name, form.email, form.password);
  };

  const togglePasswordVisibility = (field: "password" | "confirmation") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmation(!showConfirmation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>
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
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          }
        />
      </div>
      <div>
        <label
          htmlFor="confirmation"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm password
        </label>
        <Input
          type={showConfirmation ? "text" : "password"}
          name="confirmation"
          id="confirmation"
          value={form.confirmation}
          onChange={handleChange}
          placeholder="••••••••"
          required
          labelRight={
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmation")}
            >
              {showConfirmation ? (
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
      <Button type="submit" variant="default" size="lg" className="w-full">
        Create an account
      </Button>
    </form>
  );
}
