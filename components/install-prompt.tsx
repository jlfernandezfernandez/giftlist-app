// components/install-prompt.tsx
// A component that prompts users to install the app on their device

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Install App</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full mb-4">Add to Home Screen</Button>
        {isIOS && (
          <p className="text-sm text-gray-600">
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon" className="mx-1">
              ⎋
            </span>
            and then &quot;Add to Home Screen&quot;
            <span role="img" aria-label="plus icon" className="mx-1">
              ➕
            </span>
            .
          </p>
        )}
      </CardContent>
    </Card>
  );
}
