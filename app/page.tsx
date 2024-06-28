import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">GiftList App</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a GiftList App
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Organiza y gestiona tus listas de regalos con facilidad. Crea,
            comparte y lleva un seguimiento de todas tus ocasiones especiales en
            un solo lugar.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg hover:bg-blue-700 transition"
            >
              Comenzar
            </Link>
            <Link
              href="/login"
              className="bg-gray-600 text-white px-4 py-2 rounded-md text-lg hover:bg-gray-700 transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-700">
            © 2024 GiftList App. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
