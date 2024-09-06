// app/register/page.tsx
import ClientRegister from "@/components/client-register";

export default function RegisterPage() {
  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create your GiftList AI account
          </h1>
          <ClientRegister />
        </div>
      </div>
    </main>
  );
}
