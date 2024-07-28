// app/login/page.tsx
import { Suspense } from "react";
import ClientLogin from "@/components/client-login";
import Spinner from "@/components/ui/spinner";

export default function LoginPage() {
  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Suspense fallback={<Spinner />}>
            <ClientLogin />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
