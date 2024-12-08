// components/install-prompt.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  setInstallPromptDismissed,
  getInstallPromptDismissed,
} from "@/actions/cookies";

export function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    async function checkPromptVisibility() {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !(window as any).MSStream
      );
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

      if (!isStandalone && isIOS) {
        const isDismissed = await getInstallPromptDismissed();
        if (!isDismissed) {
          const timer = setTimeout(() => setIsVisible(true), 3000);
          return () => clearTimeout(timer);
        }
      }
    }

    checkPromptVisibility();
  }, [isIOS, isStandalone]);

  const handleCancel = async () => {
    setIsVisible(false);
    await setInstallPromptDismissed();
  };

  if (!isVisible || !isIOS) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4 z-[100]"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md"
      >
        <div className="px-6 pt-6 pb-9">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Add to Home Screen
            </h2>
            <Button
              variant="ios"
              size="sm"
              className="text-blue-500"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <p className="px-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
            Install this application on your home screen for quick and easy
            access.
          </p>
          <div className="space-y-4">
            <InstallStep
              icon={<UploadIcon />}
              text="Tap the Share button in your browser's toolbar."
            />
            <InstallStep icon={<PlusIcon />} text="Tap 'Add to Home Screen'." />
          </div>
        </div>
      </motion.div>
    </motion.div>
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
