// components/install-prompt.tsx
// A component that prompts users to install the app on their device

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  if (!isVisible || !isIOS) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center p-4 z-[100]"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add to Home Screen
            </h2>
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            This website has app functionality. Add it to your home screen to
            use it in fullscreen and while offline.
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
