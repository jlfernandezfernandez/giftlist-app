// components/install-prompt.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    function isIOSDevice() {
      const ua = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(ua);
      const isWebkit = "WebkitAppearance" in document.documentElement.style;
      const isStandalone =
        "standalone" in window.navigator && window.navigator.standalone;

      return isIOS || (isWebkit && !isStandalone);
    }

    const iosDetected = isIOSDevice();
    setIsIOS(iosDetected);

    if (iosDetected) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Install our app",
          text: "Check out this awesome app!",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      console.log("Web Share API not supported");
    }
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
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Add to Home Screen
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={handleCancel}
            >
              Not Now
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Install this application on your home screen for quick and easy
            access when you're on the go.
          </p>
          <div className="space-y-4 mb-6">
            <InstallStep
              icon={<UploadIcon />}
              text="Tap the Share button in your browser's toolbar."
            />
            <InstallStep icon={<PlusIcon />} text="Tap 'Add to Home Screen'." />
          </div>
          <Button className="w-full" variant="ios" onClick={handleShare}>
            Open Share Menu
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InstallStep({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-blue-600 dark:text-blue-400">{icon}</span>
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
      stroke="currentColor"
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
