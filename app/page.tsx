// app/page.tsx
import Link from "next/link";
import ClientHome from "@/components/client-home";
import { GiftIcon, ShareIcon, UserGroupIcon } from "@/components/icons";

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
            Sign In
          </Link>
        </div>
      </header>
      <main className="relative flex-grow flex flex-col items-center justify-center text-center p-8 z-10">
        <h2 className="text-5xl font-extrabold text-white mb-6">
          Organize and share your gift lists
        </h2>
        <p className="text-xl text-white mb-12 max-w-2xl">
          Create, manage, and share gift lists for any occasion. Collaborate
          with friends and family to make every event special.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <ClientHome />
      </main>
    </div>
  );
}

const features = [
  {
    icon: <GiftIcon className="h-12 w-12 text-white" />,
    title: "Create Gift Lists",
    description:
      "Create and customize gift lists for any occasion with name, description, and event date.",
  },
  {
    icon: <ShareIcon className="h-12 w-12 text-white" />,
    title: "Share Easily",
    description: "Share your lists via a link and collaborate with others.",
  },
  {
    icon: <UserGroupIcon className="h-12 w-12 text-white" />,
    title: "Collaborative Management",
    description:
      "Assign gifts, make group purchases, and keep everyone updated.",
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
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md backdrop-blur-sm">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-80">{description}</p>
    </div>
  );
}
