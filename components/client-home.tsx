// components/client-home.tsx
"use client";

import Link from "next/link";
import { useAuthWithRedirect } from "@/hooks/use-auth-with-redirect";

export default function ClientHome() {
  const { error, handleGoogleSignInWithRedirect, getRedirectPath } =
    useAuthWithRedirect();

  return (
    <>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        <Link
          href={`/register?redirect=${encodeURIComponent(getRedirectPath())}`}
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
        >
          Start Now
        </Link>
        <button
          onClick={handleGoogleSignInWithRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Start with Google
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}
