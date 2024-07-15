// lib/firebase_auth.ts

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { AuthenticatedUser } from "@/types/authenticated-user";

export async function authenticateWithCredentials(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const authenticatedUser = credential.user;

    return {
      uid: authenticatedUser.uid,
      displayName: authenticatedUser.displayName ?? "", // Add null check and provide a default value
      email: authenticatedUser.email ?? "",
      idToken: await authenticatedUser.getIdToken(),
    };
  } catch (error) {
    console.error("Error al iniciar sesión con correo/contraseña: ", error);
    throw new Error("Failed to sign in with credentials");
  }
}

export async function authenticateWithGoogle(): Promise<AuthenticatedUser | null> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const authenticatedUser = result.user;

    return {
      uid: authenticatedUser.uid,
      displayName: authenticatedUser.displayName ?? "",
      email: authenticatedUser.email ?? "",
      idToken: await authenticatedUser.getIdToken(),
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error);
    throw new Error("Failed to sign in with Google");
  }
}

export async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const authenticatedUser = credential.user;

    await updateProfile(authenticatedUser, {
      displayName: name,
    });

    return {
      uid: authenticatedUser.uid,
      displayName: authenticatedUser.displayName ?? "",
      email: authenticatedUser.email ?? "",
      idToken: await authenticatedUser.getIdToken(),
    };
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
    throw new Error("Failed to register user");
  }
}
