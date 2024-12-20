import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import { InstallPrompt } from "@/components/install-prompt";
import { Providers } from "@/app/providers";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

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
  themeColor: "white",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(satoshi.variable, inter.variable)}>
      <body className="antialiased flex flex-col font-sans bg-white">
        <SessionProvider>
          <Providers>
            <div className="flex-grow flex flex-col">
              <Suspense fallback={<Spinner />}>
                {children}
                <InstallPrompt />
              </Suspense>
            </div>
          </Providers>
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
