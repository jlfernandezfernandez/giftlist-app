// app/register/page.tsx
import ClientRegister from "@/components/client-register";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full sm:border sm:rounded-lg sm:max-w-md">
        <div className="p-4 space-y-4 sm:p-6 md:space-y-6">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create your GiftList AI account
          </h1>
          <ClientRegister />
        </div>
      </div>
    </main>
  );
}
