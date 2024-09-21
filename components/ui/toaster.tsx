// components/ui/toaster.tsx
"use client";

import { useToast } from "@/context/toast-context";

const toastTypeStyles = {
  success: "border-l-4 border-green-300",
  error: "border-l-4 border-red-300",
  warning: "border-l-4 border-yellow-300",
  info: "border-l-4 border-blue-300",
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex ${
            toastTypeStyles[toast.type]
          }`}
        >
          <div className="flex-grow">
            <p>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
