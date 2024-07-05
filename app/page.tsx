"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticateWithGoogle } from "@/app/lib/actions";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setError("");
    setIsPending(true);
    try {
      const user = await authenticateWithGoogle();
      if (user) {
        console.log("Usuario autenticado con Google:", user.email);
        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Failed to sign in with Google");
    }
    setIsPending(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-animated-gradient">
      <header className="relative bg-transparent p-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">GiftList AI</h1>
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded-full text-base hover:bg-gray-800 transition"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>
      <main className="relative flex-grow flex flex-col items-center justify-center text-center p-8 z-10">
        <h2 className="text-5xl font-extrabold text-white mb-6">
          Crea tus listas de regalos con IA
        </h2>
        <p className="text-xl text-white mb-8">
          Organiza y gestiona tus listas de regalos con facilidad. Crea,
          comparte y lleva un seguimiento de todas tus ocasiones especiales en
          un solo lugar.
        </p>
        <div className="space-x-4">
          <Link
            href="/register"
            className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
          >
            Empezar Ahora
          </Link>
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? "Cargando..." : "Empezar con Google"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
      <footer className="relative bg-white shadow z-10">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-700">© 2024 GiftList AI</p>
        </div>
      </footer>
    </div>
  );
}
