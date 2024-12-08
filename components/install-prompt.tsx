// components/install-prompt.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  setInstallPromptDismissed,
  getInstallPromptDismissed,
} from "@/actions/cookies";

export function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installPlatform, setInstallPlatform] = useState<
    "ios" | "android" | null
  >(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    async function checkPromptVisibility() {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;
      const isAndroid = /Android/.test(navigator.userAgent);
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

      if (isIOS && !isStandalone) {
        setInstallPlatform("ios");
      }

      if (isAndroid) {
        setInstallPlatform("android");
      }

      if (!isStandalone && (isIOS || isAndroid)) {
        const isDismissed = await getInstallPromptDismissed();
        if (!isDismissed) {
          const timer = setTimeout(() => setIsVisible(true), 3000);
          return () => clearTimeout(timer);
        }
      }
    }

    checkPromptVisibility();

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
    }
  };

  const handleCancel = async () => {
    setIsVisible(false);
    await setInstallPromptDismissed();
  };

  if (!isVisible || !installPlatform) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-[100]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Add to Home Screen</span>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-6">
            Install this application on your home screen for quick and easy
            access.
          </p>

          {installPlatform === "ios" ? (
            <div className="space-y-4">
              <InstallStep
                icon={<UploadIcon />}
                text="Tap the Share button in your browser's toolbar."
              />
              <InstallStep
                icon={<PlusIcon />}
                text="Tap 'Add to Home Screen'."
              />
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={handleInstall}>
              Install App
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InstallStep({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-black dark:text-white flex-shrink-0">{icon}</span>
      <p className="text-sm text-gray-700 dark:text-gray-200">{text}</p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6" // Azul (Tailwind blue-500)
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
