// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import ClientHome from "@/components/client-home";
import Spinner from "@/components/ui/spinner";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-animated-gradient">
      <header className="relative bg-transparent p-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">GiftList AI</h1>
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
        <Suspense fallback={<Spinner />}>
          <ClientHome />
        </Suspense>
      </main>
      <footer className="relative bg-white shadow z-10">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-700">© 2024 GiftList AI</p>
        </div>
      </footer>
    </div>
  );
}
