// components/install-prompt.tsx
"use client";

import React, { useState, useEffect } from "react";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOS);

    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (!isStandalone) {
      setShowPrompt(true);

      if (!isIOS) {
        const handleBeforeInstallPrompt = (e: Event) => {
          e.preventDefault();
          setDeferredPrompt(e);
        };

        window.addEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );

        return () => {
          window.removeEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
          );
        };
      }
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Install GiftList AI</h3>
      {isIOS ? (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      ) : deferredPrompt ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleInstall}
        >
          Install App
        </button>
      ) : (
        <p>You can install this app from your browser&apos;s menu.</p>
      )}
    </div>
  );
}
