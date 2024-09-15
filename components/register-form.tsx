"use client";

import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from "lucide-react"; // Asegúrate de importar estos iconos o usa los que prefieras

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
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    setPasswordStrength({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`]/.test(password),
      length: password.length >= 8,
    });
  };

  useEffect(() => {
    validatePassword(form.password);
    setPasswordsMatch(
      form.password === form.confirmation && form.password !== ""
    );
  }, [form.password, form.confirmation]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (form.password !== form.confirmation) {
      alert("Passwords don't match");
      return;
    }
    if (!Object.values(passwordStrength).every(Boolean)) {
      alert("Password does not meet all requirements");
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

      <div className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmation"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <div className="relative">
            <Input
              type={showConfirmation ? "text" : "password"}
              name="confirmation"
              id="confirmation"
              value={form.confirmation}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility("confirmation")}
            >
              {showConfirmation ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {Object.entries(passwordStrength).map(([key, value]) => (
            <div key={key} className="flex items-center">
              {value ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
              )}
              <span>{`${key.charAt(0).toUpperCase() + key.slice(1)} ${
                key === "length" ? "(min. 8 characters)" : ""
              }`}</span>
            </div>
          ))}
          <div className="flex items-center">
            {passwordsMatch ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
            )}
            <span>Passwords match</span>
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
      <Button type="submit" variant="default" size="lg" className="w-full">
        Create an account
      </Button>
    </form>
  );
}
