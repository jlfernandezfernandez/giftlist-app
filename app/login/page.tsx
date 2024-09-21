// app/login/page.tsx
import ClientLogin from "@/components/client-login";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full sm:border sm:rounded-lg sm:max-w-md">
        <div className="p-4 space-y-4 sm:p-6 md:space-y-6">
          <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 sm:text-xl md:text-2xl">
            Sign in to your account
          </h1>
          <ClientLogin />
        </div>
      </div>
    </main>
  );
}
