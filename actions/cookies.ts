// actions/cookies.ts
"use server";

import { cookies } from "next/headers";

export async function setInstallPromptDismissed() {
  cookies().set("installPromptDismissed", "true", {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "strict",
  });
}

export async function getInstallPromptDismissed() {
  return cookies().get("installPromptDismissed")?.value === "true";
}
