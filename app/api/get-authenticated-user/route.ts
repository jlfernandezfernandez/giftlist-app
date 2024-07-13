// app/api/get-authenticated-user/route.ts

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

    const decodedToken = tokens?.decodedToken;

    if (!decodedToken.email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }

    const dbUser = await getUserByEmail(decodedToken.email);

    const user = {
      uid: dbUser.id,
      displayName: decodedToken.name,
      email: decodedToken.email || "",
      idToken: tokens.token,
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch authenticated user" },
      { status: 500 }
    );
  }
}
