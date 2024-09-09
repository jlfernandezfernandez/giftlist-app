import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GiftList AI",
  description: "Organize and manage your gift lists.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", inter.variable)}>
      <body className="antialiased min-h-full flex flex-col bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
        <SessionProvider>
          <div className="flex-grow flex flex-col">
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </div>
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
