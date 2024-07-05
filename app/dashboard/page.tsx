import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/config";
import { Dashboard } from "@/components/dashboard";
import { DecodedIdToken } from "next-firebase-auth-edge/lib/auth/token-verifier";

export default async function DashboardPage() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    notFound();
  }

  const decodedToken: DecodedIdToken = tokens?.decodedToken;

  const user = {
    uid: decodedToken.uid,
    displayName: decodedToken.name,
    email: decodedToken.email || "",
    idToken: tokens.token,
  };

  return (
    <div>
      <Dashboard user={user} />
    </div>
  );
}
