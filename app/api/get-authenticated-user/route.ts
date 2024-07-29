// app/api/get-authenticated-user/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/config";
import { getUserByEmail } from "@/lib/repositories/user-repository";

export async function GET() {
  try {
    const tokens = await getTokens(cookies(), {
      apiKey: clientConfig.apiKey,
      cookieName: serverConfig.cookieName,
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      serviceAccount: serverConfig.serviceAccount,
    });

    if (!tokens) {
      return NextResponse.json({ error: "No tokens found" }, { status: 401 });
    }

    const decodedToken = tokens.decodedToken;

    if (!decodedToken.email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }

    const dbUser = await getUserByEmail(decodedToken.email);

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    const user = {
      uid: dbUser.id,
      displayName: decodedToken.name,
      email: decodedToken.email || "",
      idToken: tokens.token,
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    return NextResponse.json(
      { error: "Failed to fetch authenticated user" },
      { status: 500 }
    );
  }
}
