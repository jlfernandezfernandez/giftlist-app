// app/login/page.tsx
import Logo from "@/components/ui/logo";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-md shadow-md w-full">
        <LoginForm />
      </div>
    </main>
  );
}
