// app/page.tsx

import Link from "next/link";
import { GiftIcon, ShareIcon, UsersIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col">
        <header className="p-6">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-white">GiftList AI</h1>
            <Link
              href="/login"
              className="bg-white text-purple-800 px-6 py-2 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Sign in
            </Link>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Organize and share your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
                Gift Lists
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-white mb-12 max-w-3xl mx-auto">
              Create, manage, and share intelligent gift lists for any occasion.
              Find the perfect presents for your loved ones with ease.
            </p>
          </div>

          <div>
            <Link
              href="/register"
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-pink-600 hover:to-yellow-600 transition-all"
            >
              Get Started for Free
            </Link>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <p className="mt-16 text-base text-yellow-300 text-center">
            Coming soon: Advanced AI-powered integration!
          </p>
        </main>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <GiftIcon className="h-16 w-16 text-pink-400" />,
    title: "Gift Management",
    description: "Add gifts to your list and track their status.",
  },
  {
    icon: <ShareIcon className="h-16 w-16 text-yellow-400" />,
    title: "Seamless Sharing",
    description: "Collaborate with friends and family in real-time.",
  },
  {
    icon: <UsersIcon className="h-16 w-16 text-green-400" />,
    title: "Group Gifting",
    description: "Organize group purchases and split costs effortlessly.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white border-opacity-20 transition-transform duration-300 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-80 text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}
