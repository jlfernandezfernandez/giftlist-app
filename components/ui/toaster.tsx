// components/ui/toaster.tsx
"use client";

import { useToast } from "@/context/toast-context";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4"
        >
          {toast.title && <h4 className="font-semibold">{toast.title}</h4>}
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
}
